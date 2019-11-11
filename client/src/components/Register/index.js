import React, { useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import Input from '../common/Input';
import UseForm from '../common/UseForm';

import { SIGNUP_MUTATION } from '../../resolvers/mutation';

const Register = props => {
  // useEffect(() => {
  //   props.history.push('/');
  // }, [props.history]);

  const [values, onChangeHandler, reset] = UseForm({
    name: '',
    email: '',
    password: '',
  });
  const [signup] = useMutation(SIGNUP_MUTATION, {
    variables: {
      name: values.name,
      email: values.email,
      password: values.password,
    },
  });

  const onSubmit = async e => {
    e.preventDefault();
    await signup();
    reset();
    await props.history.push('/');
  };
  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={onSubmit}>
        <Input
          type='text'
          name='name'
          label='Name'
          value={values.name}
          onChange={onChangeHandler}
        />

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

        <button className='btn btn-primary'>Register</button>
      </form>
    </div>
  );
};

export default Register;
