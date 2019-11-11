const queries = {
  async me(parent, args, ctx) {
    const {
      request: { userId },
    } = ctx;
    if (!userId) {
      return null;
    }
    return ctx.prisma.user({ id: userId });
  },
};
module.exports = queries;
