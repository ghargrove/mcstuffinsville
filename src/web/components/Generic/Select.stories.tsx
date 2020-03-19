import React from 'react'

import Select from './Select'

export default {
  component: Select,
  title: 'Select'
}

export const basicSelect = () => (
  <Select>
    <option>--</option>
    <option>Alabama</option>
    <option>Alaska</option>
    <option>Arizona</option>
    <option>Arkansas</option>
    <option>California</option>
  </Select>
)
