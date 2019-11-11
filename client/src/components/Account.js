import React from 'react';
import User from './User';
import { Link } from 'react-router-dom';
import Subscription from './Subscription';
import ChangeCard from './ChangeCard';
import CancelSubscription from './CancelSubscription';

const Account = () => {
  return (
    <User>
      {({ data }) => {
        const me = data ? data.me : null;
        console.log(me);
        return (
          <>
            {me && me.type === 'free trial' && <Subscription />}

            {me && me.type === 'paid' && (
              <div className='pt-5'>
                <p className='lead '>Thanks for Subscribing in our website</p>
                <p>last 4 digit of your current credit card : {me.last4cc}</p>
                <div className=''>
                  <ChangeCard />
                  <CancelSubscription />
                </div>
              </div>
            )}
          </>
        );
      }}
    </User>
  );
};

export default Account;
