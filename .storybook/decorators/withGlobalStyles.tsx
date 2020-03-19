import React from 'react'

import { DecoratorFn } from '@storybook/react'

import GlobalStyles from '../../src/web/components/GlobalStyles'

const withGlobalStyles: DecoratorFn = storyFn => (
  <React.Fragment>
    <GlobalStyles />
    {storyFn()}
  </React.Fragment>
)

export default withGlobalStyles
