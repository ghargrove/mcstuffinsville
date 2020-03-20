import styled, { css } from 'styled-components'

export const SectionLabel = styled.h2`
  font-size: ${props => props.theme.fontSize.lg};
  font-weight: 600;
  margin-bottom: ${props => props.theme.spacing.space400};
`

interface ISecondaryTextProps {
  small?: boolean
}

export const SecondaryText = styled.p<ISecondaryTextProps>`
  color: ${props => props.theme.colors.gray.gray400};

  ${({ small }) =>
    small &&
    css`
      font-size: ${props => props.theme.fontSize.sm};
    `}
`
