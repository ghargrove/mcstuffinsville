import styled, { css } from 'styled-components'

interface ISelectProps {
  placeholder?: string
}

const Select = styled.select<ISelectProps>`
  appearance: none;
  outline: none;

  ${({ theme: { borderRadius, colors, fontSize, spacing } }) => css`
    border: solid 1px ${colors.gray.gray100};
    border-radius: ${borderRadius};
    padding: ${spacing.space100};
    font-size: ${fontSize.md};
  `}

  ${({ placeholder, value }) =>
    (value === '' || value === placeholder) &&
    css`
      color: ${props => props.theme.colors.gray.gray300};
    `}
`

export default Select
