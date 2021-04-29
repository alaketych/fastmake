import React from 'react'
import { Field, ErrorMessage } from 'formik'
import { TextError } from './_index'

function Input ({ name, label, rest }) {
  return (
    <div className='form-control'>
      <label htmlFor={ name }>{ label }</label>
      <Field id={ name } name={ name } { ...rest } />
      <ErrorMessage component={ TextError } name={ name } />
    </div>
  )
}

export default Input