import React from 'react'

import styled, { css } from 'styled-components'

const Input = styled.input`
  outline: none;
  width: 400px;

  ${({ theme: { borderRadius, colors, fontSize, spacing } }) => css`
    border-radius: ${borderRadius};
    border: solid 1px ${colors.gray.gray100};
    font-size: ${fontSize.md};
    padding: ${spacing.space100};

    ::placeholder {
      color: ${colors.gray.gray300};
    }
  `}
`

const TextField: React.FC<React.InputHTMLAttributes<
  HTMLInputElement
>> = props => <Input {...props} type="text" />

export default TextField
