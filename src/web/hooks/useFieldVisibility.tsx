import React, { useContext } from 'react'

import { FieldVisibilityContext } from '../components/FieldVisibilityProvider'

const useFieldVisibility = () => useContext(FieldVisibilityContext)

export default useFieldVisibility
