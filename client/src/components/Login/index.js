import React, { useEffect } from 'react';
import Input from '../common/Input';
import UseForm from '../common/UseForm';
import { useMutation } from '@apollo/react-hooks';
import { Redirect, Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { CURRENT_USER_QUERY } from '../User';
import { CheckAuth } from '../common/authCheker';

import { SIGNIN_MUTATION } from '../../resolvers/mutation';
const history = createBrowserHistory();

const Login = props => {
  console.log(props);

  // useEffect(() => {
  //   props.history.push('/');
  // }, [props.history]);

  const user = CheckAuth();
  useEffect(() => {
    (() => user && props.history.push('/'))();
  }, [props.history, user]);

  const [values, onChangeHandler, reset] = UseForm({ email: '', password: '' });

  const [signin] = useMutation(SIGNIN_MUTATION, {
    variables: {
      email: values.email,
      password: values.password,
    },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const onSubmit = async e => {
    e.preventDefault();
    // console.log(props.);
    await signin();
    reset();
    history.replace('/');
  };
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <Input
          type='email'
          name='email'
          label='Email'
          value={values.email}
          onChange={onChangeHandler}
        />

        <Input
          type='password'
          name='password'
          label='Password'
          value={values.password}
          onChange={onChangeHandler}
        />

        <button type='submit' className='btn btn-primary'>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
