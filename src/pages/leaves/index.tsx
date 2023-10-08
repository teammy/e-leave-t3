import React from 'react'
import FloatingActionBttn from '~/features/ui/components/FloatingActionBttn'
import { useRouter } from 'next/router'

const LeaveIndexPage = () => {
  const router = useRouter();
  return (
    <div>LeaveIndexPage
      <FloatingActionBttn onClick={() => router.push('/leaves/new')}>เขียนใบลา</FloatingActionBttn>
    </div>
  )
}

export default LeaveIndexPage