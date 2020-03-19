import React from 'react'

import styled from 'styled-components'
import matchSorter from 'match-sorter'

import logo from '../images/mcstuffinsville.png'
import { DebouncedTextField } from './Generic'
import { IFilterValue } from './Layout/Layout'

const HeaderWrapper = styled.header`
  background-color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  z-index: 100;
`

interface IHeaderProps {
  onSearchChange: (filters: IFilterValue[]) => void
}

const Header: React.FC<IHeaderProps> = ({ onSearchChange }) => {
  const handleSearchChange = (searchText: string) => {
    // Pack this into a filter and pass it along
    const value = searchText.trim()
    onSearchChange([
      {
        field: 'firstName',
        value
      }
    ])
  }

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
