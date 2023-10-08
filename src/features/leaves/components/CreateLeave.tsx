import React from 'react'
import LeaveForm from './LeaveForm'
import {type AddLeaveInput } from '../types'

const CreateLeave = () => {
  const createLeave = (leave: AddLeaveInput) => {
    console.log(leave); 
  }

  return (
    <LeaveForm kind="create" onSubmit={createLeave}></LeaveForm> 
  )
}

export default CreateLeave