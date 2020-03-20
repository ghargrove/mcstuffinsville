import styled, { css } from 'styled-components'

interface ICellProps {
  header?: boolean
}

export const Cell = styled.div<ICellProps>`
  padding: ${({ theme: { spacing } }) =>
    `${spacing.space400} ${spacing.space100}`};

  ${({ header }) =>
    header &&
    css`
      font-weight: 600;
    `}
`

export const MessageCell = styled(Cell)`
  justify-self: center;
`

export const FirstNameCell = styled(Cell)`
  width: 125px;
`

export const LastNameCell = styled(Cell)`
  width: 125px;
`

export const EmailCell = styled(Cell)`
  word-wrap: break-word;
  width: 300px;
`

export const GenderCell = styled(Cell)`
  width: 75px;
`

export const AddressCell = styled(Cell)`
  flex: 1;

  p:last-of-type {
    margin-top: 0.25rem;
  }
`

export const PrescriptionsCell = styled(Cell)`
  flex: 1;
  word-wrap: break-word;
  width: 200px;
`
