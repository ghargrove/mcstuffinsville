import React from 'react'

import styled from 'styled-components'

import logo from '../images/mcstuffinsville.png'
import { DebouncedTextField } from './Generic'

const HeaderWrapper = styled.header`
  background-color: white;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  padding: ${props => props.theme.spacing.space400};
  position: fixed;
  width: 100%;
  z-index: 100;
`

interface IHeaderProps {
  onSearchChange: (search: string) => void
}

const Header: React.FC<IHeaderProps> = ({ onSearchChange }) => {
  const handleSearchChange = (searchText: string) =>
    onSearchChange(searchText.trim())

  return (
    <HeaderWrapper>
      <img alt="McStuffinsville logo" src={logo} />
      <DebouncedTextField
        onChange={handleSearchChange}
        placeholder="Search.."
      />
    </HeaderWrapper>
  )
}

export default Header
