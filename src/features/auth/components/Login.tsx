import React from 'react'
import AuthForm from './AuthForm'
import {type LoginInput } from '../types'
import { useRouter } from 'next/router'

const Login = () => {
  const router = useRouter();

  const submit = (credentials: LoginInput) => {
    console.log(credentials);
  };
  return <AuthForm kind="login" onSubmit={submit}></AuthForm>;
}

export default Login