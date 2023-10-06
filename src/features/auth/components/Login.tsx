import React from 'react'
import AuthForm from './AuthForm'
import {type LoginInput } from '../types'

const Login = () => {
  const submit = (credentials: LoginInput) => {};
  return 
    <AuthForm kind="login" onSubmit={}></AuthForm>
}

export default Login