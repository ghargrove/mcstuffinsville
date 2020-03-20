import styled from 'styled-components'

export const Cell = styled.div`
  padding: 1rem 0.5rem;
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
