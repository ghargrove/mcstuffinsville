import styled, { css } from 'styled-components'

interface ISelectProps {
  placeholder?: string
}

const Select = styled.select<ISelectProps>`
  appearance: none;
  border: solid 1px ${props => props.theme.colors.gray.gray100};
  border-radius: ${props => props.theme.borderRadius};
  padding: 0.5rem;
  font-size: 1rem;
  outline: none;

  ${({ placeholder, value }) =>
    (value === '' || value === placeholder) &&
    css`
      color: ${props => props.theme.colors.gray.gray300};
    `}
`

export default Select
