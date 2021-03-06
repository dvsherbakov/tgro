import React, { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { myThunk } from '../../features/auth/actions'
import { SelectOrganization } from '../Forms/SelectOrganization/SelectOrganization'
import { UserPanel } from '../Panels/UserPanel/UserPanel'

export const Profile: FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(myThunk())
  }, [])
  return (
    <>
      <UserPanel />
      <SelectOrganization />
    </>
  )
}
