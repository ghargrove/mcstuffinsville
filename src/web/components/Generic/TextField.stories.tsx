import React from 'react'

import TextField from './TextField'

export default {
  component: TextField,
  title: 'Text Field'
}

export const basicTextField = () => (
  <TextField type="text" value="Hello world" />
)
