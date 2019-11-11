import React from 'react';
import { useMutation } from '@apollo/react-hooks';

import { CANCEL_SUBSCRIPTION } from '../resolvers/mutation';

const CancelSubscription = () => {
  const [cancel] = useMutation(CANCEL_SUBSCRIPTION);
  return (
    <div className="pt-2">
      <button
        onClick={ async () => {
          await cancel();

        }}
        className='btn btn-danger'
      >
        Cancel Subscription?
      </button>
    </div>
  );
};

export default CancelSubscription;
