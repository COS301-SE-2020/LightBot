import React, { Fragment } from 'react'
import spinner from '../assets/img/spinner.gif'

export default () => (
  <div className='page-header clear-filter'>
    <div className='page-header-image'></div>
    <div className='content'>
      <img
        src={spinner}
        style={{ width: '200px', margin: 'auto', display: 'block' }}
        alt='Loading...'
      />
    </div>
  </div>
)
