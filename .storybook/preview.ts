import { addDecorator } from '@storybook/react'

import { withThemesProvider } from 'storybook-addon-styled-component-theme'

import theme from '../src/web/theme'

addDecorator(withThemesProvider([theme]))
