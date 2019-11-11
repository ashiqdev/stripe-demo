const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Stripe = require('stripe');
const { prisma } = require('../../generated/prisma-client');

const { createHash, loginChecker } = require('../common/Permission');
const { tokenOption } = require('../../config');

const { APP_SECRET } = process.env;

const mutations = {
  async signup(parent, args, ctx) {
    const lowerCaseEmail = args.email.toLowerCase();

    const userExists = await ctx.prisma.$exists.user({ email: lowerCaseEmail });

    if (userExists) {
      throw new Error('User already exists with this email');
    }

    if (args.password.length < 8) {
      throw new Error('Password length should be 8 or more');
    }
    const password = await bcrypt.hash(args.password, 10);

    const user = await ctx.prisma.createUser({
      name: args.name,
      email: lowerCaseEmail,
      password,
    });

    return user;
  },

  async signin(parent, { email, password }, ctx) {
    const user = await ctx.prisma.user({ email });
    if (!user) {
      throw new Error('No user found with this email');
    }
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new Error('Invalid Password');
    }
    const token = jwt.sign({ userId: user.id }, APP_SECRET);
    ctx.response.cookie('token', token, tokenOption);
    return user;
  },

  signout(parent, args, ctx) {
    ctx.response.clearCookie('token');
    return { message: 'You are logged out!' };
  },

  async createSubscription(parent, { source, last4cc }, ctx) {
    const user = await loginChecker(ctx);

    const stripe = new Stripe(process.env.STRIPE_SECRET);
    // create a customer
    const customer = await stripe.customers.create({
      email: user.email,
      source,
      plan: process.env.PLAN,
    });

    return prisma.updateUser({
      where: { id: user.id },

      data: {
        stripeId: customer.id,
        type: 'paid',
        last4cc,
      },
    });
  },

  async changeCreditCard(parent, { source, last4cc }, ctx) {
    const user = await loginChecker(ctx);

    if (!user.stripeId || user.type !== 'paid') {
      throw new Error('');
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET);
    // create a customer
    const updatedCustomer = await stripe.customers.update(user.stripeId, {
      source,
    });

    return prisma.updateUser({
      where: { id: user.id },

      data: {
        stripeId: updatedCustomer.id,
        type: 'paid',
        last4cc,
      },
    });
  },

  async cancelSubscription(parent, argx, ctx) {
    const user = await loginChecker(ctx);

    if (!user.stripeId || user.type !== 'paid') {
      throw new Error('');
    }
    const stripe = new Stripe(process.env.STRIPE_SECRET);

    const customer = await stripe.customers.retrieve(user.stripeId);
    console.log({customer: customer.subscriptions})

    const [subscription] = customer.subscriptions.data;
    // console.log({subscription});

    await stripe.subscriptions.del(subscription.id);

    await stripe.customers.deleteSource(
      user.stripeId,
      customer.default_source || '',
    );

    return prisma.updateUser({
      where: { id: user.id },

      data: {
        stripeId: '',
        type: 'free trial',
        last4cc: '',
      },
    });
  },
};

module.exports = mutations;
