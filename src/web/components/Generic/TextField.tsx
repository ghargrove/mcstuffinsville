import React from 'react'

import styled from 'styled-components'

const Input = styled.input`
  font-size: 1rem;
  padding: 0.5rem;
  border: solid 1px #e0e0e0;
  color: #181719;
  outline: none;
  width: 400px;
  border-radius: 4px;

  ::placeholder {
    color: #939393;
  }
`

const TextField: React.FC<React.InputHTMLAttributes<
  HTMLInputElement
>> = props => <Input {...props} type="text" />

export default TextField
