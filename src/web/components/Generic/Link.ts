import styled from 'styled-components'

export const Link = styled.a`
  color: ${props => props.theme.colors.primary};
  cursor: pointer;
  font-size: ${props => props.theme.fontSize.sm};
  font-weight: 600;
`
