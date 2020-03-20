import React from 'react'

import styled from 'styled-components'
import matchSorter from 'match-sorter'

import logo from '../images/mcstuffinsville.png'
import { DebouncedTextField } from './Generic'

const HeaderWrapper = styled.header`
  background-color: white;
  box-sizing: border-box;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
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
