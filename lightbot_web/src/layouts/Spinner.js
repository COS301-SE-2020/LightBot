import React, { Fragment } from 'react'
import spinner from '../assets/img/spinner.gif'

export default () => (
  <Fragment class='black-background'>
    <img
      src={spinner}
      style={{ width: '200px', margin: 'auto', display: 'block' }}
      alt='Loading...'
    />
  </Fragment>
)
