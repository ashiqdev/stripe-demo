import React, { useEffect } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Redirect } from 'react-router-dom';
import { CURRENT_USER_QUERY } from './User';
import SignIn from './Login';

const SignOut = props => {
  const SIGN_OUT_MUTATION = gql`
    mutation SIGN_OUT_MUTATION {
      signout {
        message
      }
    }
  `;

  const [signout] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  useEffect(() => {
    signout();
    props.history.push('/')
  }, [props.history, signout]);

  return (
    <>
    Loading
    </>
  );
};

export default SignOut;
