import React from 'react'
import { useSelector } from 'react-redux'
import { selectors } from '../../../features/auth'

export const UserPanel = () => {
  const firstName = useSelector(selectors.getFirstName)
  const lastName = useSelector(selectors.getLastName)
  return (
    <>
      <div>Имя:</div>
      <div>{firstName}</div>
      <div>Фамилия:</div>
      <div>{lastName}</div>
    </>
  )
}
