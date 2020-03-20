import React from 'react'

import { boolean, withKnobs } from '@storybook/addon-knobs'

import { SecondaryText, SectionLabel } from './Text'

export default {
  decorators: [withKnobs],
  title: 'Text'
}

export const sectionLabel = () => <SectionLabel>Filters</SectionLabel>

export const secondaryText = () => (
  <SecondaryText small={boolean('Small', false)}>1000 patients</SecondaryText>
)
