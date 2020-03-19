import React from 'react'

import styled from 'styled-components'

const Input = styled.input`
  font-size: 1rem;
  padding: 0.5rem;
  border: none;
  border-bottom: solid 1px #8d8893;
  color: #181719;
  outline: none;
  width: 400px;
`

const TextField: React.FC<React.InputHTMLAttributes<
  HTMLInputElement
>> = props => <Input {...props} type="text" />

export default TextField
