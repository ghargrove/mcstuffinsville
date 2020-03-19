import React, { useState } from 'react'

import styled from 'styled-components'

import logo from '../images/mcstuffinsville.png'
import { TextField } from './Generic'

const HeaderWrapper = styled.header`
  background-color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  position: fixed;
  width: 100%;
`

const Header: React.FC = () => {
  const [searchText, setSearchText] = useState('')

  const handleSearchChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target: { value }
  }) => setSearchText(value)

  return (
    <HeaderWrapper>
      <img alt="McStuffinsville logo" src={logo} />
      <TextField
        onChange={handleSearchChange}
        placeholder="Search.."
        value={searchText}
      />
    </HeaderWrapper>
  )
}

export default Header
