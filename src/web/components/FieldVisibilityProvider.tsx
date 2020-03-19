import React, { useState } from 'react'

export interface IFieldVisibility {
  isVisible: boolean
  label: string
}

export interface IFieldVisibilityState {
  address: IFieldVisibility
  email: IFieldVisibility
  firstName: IFieldVisibility
  gender: IFieldVisibility
  lastName: IFieldVisibility
  prescriptions: IFieldVisibility
}

const defaultVisibility: IFieldVisibilityState = {
  address: { label: 'Address', isVisible: true },
  email: { label: 'Email', isVisible: true },
  firstName: { label: 'First name', isVisible: true },
  gender: { label: 'Gender', isVisible: true },
  lastName: { label: 'Last name', isVisible: true },
  prescriptions: { label: 'Prescriptions', isVisible: true }
}

interface IFieldVisibilityContext {
  fieldVisibility: IFieldVisibilityState
  setFieldVisibility: React.Dispatch<
    React.SetStateAction<IFieldVisibilityState>
  >
}

export const FieldVisibilityContext = React.createContext<
  IFieldVisibilityContext
>({
  fieldVisibility: defaultVisibility,
  setFieldVisibility: () => undefined
})

const FieldVisibilityProvider: React.FC = ({ children }) => {
  const [fieldVisibility, setFieldVisibility] = useState(defaultVisibility)
  return (
    <FieldVisibilityContext.Provider
      value={{
        fieldVisibility,
        setFieldVisibility
      }}
    >
      {children}
    </FieldVisibilityContext.Provider>
  )
}

export default FieldVisibilityProvider
