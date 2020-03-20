import React from 'react'

import styled from 'styled-components'

import { Link, SecondaryText } from './Generic'

const ShoutoutWrapper = styled.div`
  position: fixed;
  bottom: 16px;
  left: 16px;
`

const Shoutout: React.FC = () => (
  <ShoutoutWrapper>
    <SecondaryText small>
      Built by <Link href="https://github.com/ghargrove">ghargrove</Link>
    </SecondaryText>
  </ShoutoutWrapper>
)

export default Shoutout
