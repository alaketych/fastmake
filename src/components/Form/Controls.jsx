import React from 'react'
import { Input, TextArea } from './_index'

function Controls({ control, rest }) {
  switch (control) {
      case 'input':
        return <Input { ...rest} />

      case 'textarea':
        return <TextArea { ...rest } />

      default:
        return null
  }
}

export default Controls