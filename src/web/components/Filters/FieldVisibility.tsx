import React from 'react'

import useFieldVisibility from '../../hooks/useFieldVisibility'
import { IFieldVisibilityState } from './../FieldVisibilityProvider'
import { CheckboxLabel, SectionLabel } from './../Generic'

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
      {Object.entries(fieldVisibility).map(
        ([field, { label, isVisible }], index) => (
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
        )
      )}
    </React.Fragment>
  )
}

export default FieldVisibilityFilters
