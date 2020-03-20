import styled from 'styled-components'

export const Cell = styled.div`
  padding: 1rem 0.5rem;
`

export const MessageCell = styled(Cell)`
  justify-self: center;
`

export const FirstNameCell = styled(Cell)`
  width: 150px;
`

export const LastNameCell = styled(Cell)`
  width: 150px;
`

export const EmailCell = styled(Cell)`
  flex: 1;
  width: 250px;
  word-wrap: break-word;
`

export const GenderCell = styled(Cell)`
  width: 100px;
`

export const AddressCell = styled(Cell)`
  flex: 1;

  p:last-of-type {
    margin-top: 0.25rem;
  }
`

export const PrescriptionsCell = styled(Cell)`
  flex: 1;
  width: 200px;
  word-wrap: break-word;
`
