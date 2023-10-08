import React from 'react'
import LeaveForm from './LeaveForm'
import { useRouter } from 'next/router';
import { api } from '~/utils/api';
import {type UpdateLeaveInput } from '../types';

const EditLeave = () => {
  const router = useRouter();
  const id = +(router.query.id as string)
  const { data: leave , isLoading} = api.leave.byId.useQuery(id)
  const editLeave = (leave:UpdateLeaveInput["data"]) => {
      console.log(leave);
    }
  if(isLoading) return <div>Loading...</div>
  if(!leave) return <div>Not Leave Data found</div>
  return <LeaveForm kind="edit" leave={leave} onSubmit={editLeave}>EditLeave</LeaveForm>
  
}

export default EditLeave