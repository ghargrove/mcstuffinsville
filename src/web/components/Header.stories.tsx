import React from 'react'

import Header from './Header'

export default {
  component: Header,
  title: 'Header'
}

export const header = () => <Header onSearchChange={() => undefined} />
