import styled, { css } from 'styled-components'

interface ISelectProps {
  placeholder?: string
}

const Select = styled.select<ISelectProps>`
  appearance: none;
  border: solid 1px #e0e0e0;
  padding: 0.5rem;
  font-size: 1rem;
  outline: none;

  ${({ placeholder, value }) =>
    (value === '' || value === placeholder) &&
    css`
      color: #939393;
    `}
`

export default Select
