import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Redirect } from 'react-router-dom';
import { CURRENT_USER_QUERY } from './User';
import Account from './Account';
import Login from './Login';

const Home = props => {
  const { loading, data } = useQuery(CURRENT_USER_QUERY);
  if (loading) return 'Loading......';
  if (!data) return 'no data';

  const user = data && data.me;


  return (
    <>
      {user ? <Account /> : <Login />}

    </>
  );
};

export default Home;
