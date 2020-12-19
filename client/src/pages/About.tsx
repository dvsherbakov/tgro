import React, { Fragment } from 'react'
import { useHistory } from 'react-router-dom'

export const About: React.FC = () => {
  const history = useHistory()

  return (
    <Fragment>
      <h1>About</h1>
      <button
        type="button"
        className="btn"
        cy-data="go-back-button"
        onClick={() => history.push('/')}
      >
        Go back
      </button>
    </Fragment>
  )
}
