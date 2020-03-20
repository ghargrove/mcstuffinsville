import styled, { css } from 'styled-components'

const FilterSidebar = styled.div`
  position: fixed;
  top: 70px;
  height: 100vh;
  width: 200px;

  ${({ theme: { colors, spacing } }) => css`
    background-color: ${colors.gray.gray200};
    padding: ${spacing.space400};
  `}
`
export default FilterSidebar
