import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: string
    colors: {
      primary: string
      secondary: string
      gray: {
        gray000: string
        gray100: string
        gray200: string
        gray300: string
        gray400: string
        gray500: string
        gray600: string
        gray700: string
      }
    }
    fontSize: {
      sm: string
      md: string
      lg: string
    }
    spacing: {
      space100: string
      space200: string
      space300: string
      space400: string
      space500: string
      space600: string
      space700: string
      space800: string
    }
    name: string
  }
}
