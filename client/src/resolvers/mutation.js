import gql from 'graphql-tag';

export const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $password: String!
    $name: String!
  ) {
    signup(email: $email, password: $password, name: $name) {
      id
      name
      email
    }
  }
`;

export const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      name
      email
    }
  }
`;

export const CREATE_SUBSCRIPTION = gql`
  mutation CREATE_SUBSCRIPTION($source: String!, $last4cc: String!) {
    createSubscription(source: $source, last4cc: $last4cc) {
      id
      email
      type
      last4cc
    }
  }
`;

export const CHANGE_CREDITCARD = gql`
  mutation CHANGE_CREDITCARD($source: String!, $last4cc: String!) {
    changeCreditCard(source: $source, last4cc: $last4cc) {
      id
      email
      type
      last4cc
    }
  }
`;

export const CANCEL_SUBSCRIPTION = gql`
  mutation CANCEL_SUBSCRIPTION {
    cancelSubscription {
      id
      name
      email
      type
    }
  }

`;

// const SignOut = props => {
//   const SIGN_OUT_MUTATION = gql`
//     mutation SIGN_OUT_MUTATION {
//       signout {
//         message
//       }
//     }
//   `;