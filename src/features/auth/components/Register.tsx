import React from 'react';
import AuthForm from './AuthForm';
import {type RegisterInput } from '../types';
import { api } from '~/utils/api';
import { useRouter } from 'next/router';

const Register = () => {
  const router = useRouter();
  // const setUiToast = useAppstore((state) => state.setUiToast);
  // const { mutate: register } = api.auth.register.useMutation({
  //   onSuccess() {
  //     router.replace('/auth/signin');
  //   },
  //   onError() {
  //     setUiToast({
  //       type: 'error',
  //       message: 'An error occurred. Please try again later.',
  //     });
  //   }

  // });
  const submit = (credentials: RegisterInput) => {
    register(credentials);
  };
  return <AuthForm kind="register" onSubmit={submit}></AuthForm>
}

export default Register;