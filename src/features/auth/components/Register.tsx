import React from 'react'
import AuthForm from './AuthForm'
import {type RegisterInput } from '../types'

const Register = () => {
  const submit = (credentials: RegisterInput) => {};
  return <AuthForm kind="register" onSubmit={}></AuthForm>
}

export default Register