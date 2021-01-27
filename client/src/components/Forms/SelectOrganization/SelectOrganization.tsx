import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Api from '../../../Api/Api'
import { selectors } from '../../../features/auth'

import './selectOrganization.css'

export interface IAdressInterface {
  city: string;
  street?: string;
  home?: string;
  additional?: string;
}

export interface IOrganizationInterface {
  name: string;
  adress: IAdressInterface;
}

export const SelectOrganization = () => {
  const [isEditMode, setEditMode] = useState(false)
  const [organizations, setOrganizations] = useState<IOrganizationInterface[]>(
    []
  )
  const organization = useSelector(selectors.getOrganization)

  useEffect(() => {
    const tkns = localStorage.getItem('tokens')
    if (tkns) {
      const { refresh, token } = JSON.parse(tkns)
      const api = new Api({ refreshToken: refresh, token })
      api.organizationsList().then((data: any) => {
        setOrganizations(data)
      })
    }
  }, [])

  const handleEditMode = () => {
    setEditMode(!isEditMode)
  }

  const handleSelect = () => {
    setEditMode(false)
  }

  return (
    <>
      <div className="selector-group">
        <div>Организация:</div>
        <div>{organization || 'Не выбрана'}</div>
        <button type="button" onClick={handleEditMode}>
          *
        </button>
      </div>
      {isEditMode && (
        <div className="orgselector__container">
          {organizations.map((org, idx) => (
            <div
              key={idx.toString()}
              tabIndex={idx}
              className="orgselector__item"
              onClick={handleSelect}
              onKeyDown={handleSelect}
              role="button"
            >
              {org.name}: <span>{org.adress.city}</span>{' '}
              <span>{org.adress.street}</span> <span>{org.adress.home}</span>
              <div>{org.adress.additional}</div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
