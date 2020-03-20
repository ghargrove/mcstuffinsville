import React from 'react'

import styled from 'styled-components'

import { MessageCell } from './Cells'
import { SecondaryText } from '../../Generic'

export const Row = styled.div`
  display: flex;
  flex: 1 1 auto;

  :nth-child(odd) {
    background-color: #efefef;
  }
`

export const SortRow = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`

const MessageRow = styled(Row)`
  justify-content: center;
`

export const LoadingRow = () => (
  <MessageRow>
    <MessageCell>
      <SecondaryText>Loading patients...</SecondaryText>
    </MessageCell>
  </MessageRow>
)

export const NoDataRow = () => (
  <MessageRow>
    <MessageCell>
      <SecondaryText>😮 No patients found</SecondaryText>
    </MessageCell>
  </MessageRow>
)

export const ErrorRow = () => (
  <MessageRow>
    <MessageCell>
      <SecondaryText>🤕 An unexpected error occured</SecondaryText>
    </MessageCell>
  </MessageRow>
)
