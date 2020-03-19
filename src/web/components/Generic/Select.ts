import styled, { css } from 'styled-components'

const Select = styled.select`
  appearance: none;
  border: solid 1px #e0e0e0;
  padding: 0.5rem;
  font-size: 1rem;
  outline: none;

  ${({ value }) =>
    value === '' &&
    css`
      color: #939393;
    `}
`

export default Select
