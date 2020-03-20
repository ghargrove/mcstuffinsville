import React from 'react'

import useFieldVisibility from '../../hooks/useFieldVisibility'
import { IFieldVisibilityState } from './../FieldVisibilityProvider'
import { CheckboxLabel, SectionLabel } from './../Generic'

// Sort array and func to control rendering order
const filterOrder = [
  'lastName',
  'firstName',
  'email',
  'gender',
  'address',
  'prescriptions'
]
const filterSort: (
  a: [string, IFieldVisibilityState],
  b: [string, IFieldVisibilityState]
) => number = ([aName], [bName]) => {
  const aIndex = filterOrder.indexOf(aName)
  const bIndex = filterOrder.indexOf(bName)
  if (aIndex < bIndex) {
    return -1
  } else if (aIndex > bIndex) {
    return 1
  } else {
    return 0
  }
}

const FieldVisibilityFilters: React.FC = () => {
  const { fieldVisibility, setFieldVisibility } = useFieldVisibility()

  // Handle the visibility change dynamically using the `name` props
  const handleVisibilityChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target: { name, checked: isVisible }
  }) =>
    setFieldVisibility(prevState => ({
      ...prevState,
      [name]: {
        ...prevState[name as keyof IFieldVisibilityState],
        isVisible
      }
    }))

  return (
    <React.Fragment>
      <SectionLabel>View</SectionLabel>
      {Object.entries(fieldVisibility)
        .sort(filterSort)
        .map(([field, { label, isVisible }], index) => (
          <div key={index} style={{ marginBottom: '.5rem' }}>
            <CheckboxLabel>
              <input
                name={field}
                onChange={handleVisibilityChange}
                type="checkbox"
                checked={isVisible}
              />{' '}
              {label}
            </CheckboxLabel>
          </div>
        ))}
    </React.Fragment>
  )
}

export default FieldVisibilityFilters
