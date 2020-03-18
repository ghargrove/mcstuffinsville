import { internet } from 'faker'

import { decodeCursor, encodeCursor } from './helpers'

it('encodes and codes a cursor', () => {
  const email = internet.email()
  const cursor = encodeCursor(email)
  expect(decodeCursor(cursor)).toBe(email)
})
