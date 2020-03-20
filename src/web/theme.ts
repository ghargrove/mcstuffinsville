import { DefaultTheme } from 'styled-components'

const theme: DefaultTheme = {
  borderRadius: '4px',
  colors: {
    primary: 'teal',
    gray: {
      gray000: '#f9f9f9',
      gray100: '#e0e0e0',
      gray200: '#efefef',
      gray300: '#939393 ',
      gray400: '#5a565e',
      gray500: '#e0e0e0',
      gray600: '#e0e0e0',
      gray700: '#181719'
    }
  },
  fontSize: {
    sm: '.8rem',
    md: '1rem',
    lg: '1.2rem'
  },
  name: 'default',
  spacing: {
    space100: '.5rem',
    space200: '.7rem',
    space300: '.8rem',
    space400: '1rem',
    space500: '1.2rem',
    space600: '1.4rem',
    space700: '2rem',
    space800: '3rem'
  }
}

export default theme
