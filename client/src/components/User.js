import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';


const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      email
      name
      type
      last4cc
    }
  }
`;

const User = props => (
  <Query {...props} query={CURRENT_USER_QUERY}>
    {payload => props.children(payload)}
  </Query>
);

export default User;
export { CURRENT_USER_QUERY };
