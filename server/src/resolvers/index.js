const authMutation = require('./authentication/mutation');
const userQuery = require('./authentication/query');

const resolvers = {
  Mutation: {
    ...authMutation,
  },

  Query: {
    ...userQuery,
  },
};

module.exports = resolvers;
