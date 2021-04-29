import React from 'react'
import { Field, ErrorMessage } from 'formik'
import { TextError } from './_index'

function TextArea ({name, label, rest, error}) {
    return (
      <div className='form-control'>
        <label htmlFor={ name }>{ label }</label>
        <Field as='textarea' id={ name } name={ name } {...rest} />

        <ErrorMessage component={ TextError } name={ name } />
      </div>
    )
  }

export default TextArea