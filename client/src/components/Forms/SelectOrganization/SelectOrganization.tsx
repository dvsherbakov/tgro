import React, { useEffect, useState } from 'react'
import Api from '../../../Api/Api'

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

  return (
    <>
      <div className="selector-group">
        <div>Организация:</div>
        <div>Selected</div>
        <button type="button" onClick={handleEditMode}>
          *
        </button>
      </div>
      {isEditMode && (
        <div>
          {organizations.map((org, idx) => (
            <div key={idx.toString()}>
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
