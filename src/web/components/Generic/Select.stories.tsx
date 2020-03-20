import React from 'react'

import Select from './Select'

import states from '../Filters/states.json'

export default {
  component: Select,
  title: 'Select'
}

export const basicSelect = () => (
  <Select>
    {states.map((state, i) => (
      <option key={i}>{state}</option>
    ))}
  </Select>
)
