import styled, { css } from 'styled-components'

export const SectionLabel = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
`

export const CheckboxLabel = styled.label`
  color: #5a565e;
`

interface ISecondaryTextProps {
  small?: boolean
}

export const SecondaryText = styled.p<ISecondaryTextProps>`
  color: #5a565e;

  ${({ small }) =>
    small &&
    css`
      font-size: 0.8rem;
    `}
`
