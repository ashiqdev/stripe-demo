import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { Mutation } from 'react-apollo';
import { CheckAuth } from './common/authCheker';
import { Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { CURRENT_USER_QUERY } from './User';

import { CREATE_SUBSCRIPTION } from '../resolvers/mutation';

const TakeMoney = props => {
  const { loading, data } = useQuery(CURRENT_USER_QUERY);
  if (loading) return 'Loading......';
  if (!data) return 'no data';
  const user = data && data.me;

  if (!user) {
    props.history.push('/');
  }

  if (user.type === 'paid') {
    return <p>You are suibscribed user</p>;
  }

  return (
    <Mutation
      mutation={CREATE_SUBSCRIPTION}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
    >
      {createSubscription => (
        <div className='d-flex justify-content-center align-items-center pt-5'>
          <StripeCheckout
            name='To To Company Ltd'
            token={async token => {
              const res = await createSubscription({
                variables: { source: token.id, last4cc: token.card.last4 },
              });
              console.log(res);
            }}
            stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
            amount = {1000}
          />
        </div>
      )}
    </Mutation>
  );
};

export default TakeMoney;
