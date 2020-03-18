/**
 * This module is for general utility functions that may have wide ranging uses
 */

/**
 * Create a base64 cursor based from some value
 *
 * @param value string to convert into a cursor
 */
export const encodeCursor = (value: string) =>
  Buffer.from(value).toString('base64')

/**
 * Decode a base64 cursor
 *
 * @param cursor cursor to be coded
 */
export const decodeCursor = (cursor: string) =>
  Buffer.from(cursor, 'base64').toString('utf-8')
