import React from 'react'

import styled, { css } from 'styled-components'

import { MessageCell } from './Cells'
import { SecondaryText } from '../../Generic'

interface IRowProps {
  highlight?: boolean
}

export const Row = styled.div<IRowProps>`
  display: flex;
  flex: 1 1 auto;

  :nth-child(odd) {
    background-color: ${props => props.theme.colors.gray.gray200};
  }

  ${({ highlight, theme }) =>
    highlight &&
    css`
      :hover {
        background-color: ${theme.colors.secondary};
      }
    `}
`

export const HeaderRow = styled(Row)`
  border-bottom: solid 2px #d3d3d3;
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
