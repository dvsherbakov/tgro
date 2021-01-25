import React, { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { myThunk } from '../../features/auth/actions'
import { UserForm } from '../Forms/UsersForms/UserForm'

export const Profile: FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(myThunk())
  }, [])
  return (
    <>
      <UserForm />
    </>
  )
}
