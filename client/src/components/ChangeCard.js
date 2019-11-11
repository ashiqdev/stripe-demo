import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Mutation } from 'react-apollo';
import StripeCheckout from 'react-stripe-checkout';
import { createBrowserHistory } from 'history';

import { CHANGE_CREDITCARD } from '../resolvers/mutation';
import { CURRENT_USER_QUERY } from './User';
const history = createBrowserHistory();

const ChangeCard = props => {
  const { loading, data } = useQuery(CURRENT_USER_QUERY);
  if (loading) return 'Loading......';
  if (!data) return 'no data';
  const user = data && data.me;

  if (!user) {
    props.history.push('/');
  }

  // if (user.type === 'paid') {
  //   return <p>You are suibscribed user</p>;
  // }

  return (
    <Mutation
      mutation={CHANGE_CREDITCARD}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
    >
      {changeCreditCard => (
        <div>
          <StripeCheckout
            name='To To Company Ltd'
            panelLabel='Change Card'
            token={async token => {
              const res = await changeCreditCard({
                variables: { source: token.id, last4cc: token.card.last4 },
              });
              console.log(res);
              history.replace('/');
            }}
            stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
          >
            <button className='btn btn-warning'>Change Credit Card?</button>
          </StripeCheckout>
        </div>
      )}
    </Mutation>
  );
};

export default ChangeCard;
