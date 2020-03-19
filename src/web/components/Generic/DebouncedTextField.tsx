import React, { useEffect, useState } from 'react'

import { debounce } from 'debounce'

import TextField from './TextField'

interface IDebouncedProps
  extends Pick<
    React.InputHTMLAttributes<HTMLInputElement>,
    // Override the behavior or onChange to accept string instead of SyntheticEvent
    Exclude<keyof React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>
  > {
  onChange: (value: string) => void
  timeout: number
}

/**
 * Text field that provides a debounced change listener. Useful for things like filtering
 * where you don't wanna smoke your api.
 *
 * ```javascript
 *  <DebouncedTextField onChange={handleChange} timeout={500} placeholder="Search..." />
 * ```
 */
const DebouncedTextField: React.FC<IDebouncedProps> = ({
  timeout = 500,
  onChange,
  ...rest
}) => {
  const [value, setValue] = useState('')
  const notify = debounce(() => onChange(value), timeout)

  useEffect(() => {
    notify()
    return () => notify.clear()
  })

  const handleValueChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target: { value: newValue }
  }) => setValue(newValue)

  return <TextField {...rest} onChange={handleValueChange} value={value} />
}

export default DebouncedTextField
