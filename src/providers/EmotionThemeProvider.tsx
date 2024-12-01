import { ThemeProvider } from '@emotion/react'
import { theme } from 'antd'
import { PropsWithChildren } from 'react'

const { useToken } = theme

const EmotionThemeProvider = ({ children }: PropsWithChildren) => {
  const { token } = useToken()

  return (
    <ThemeProvider theme={token}>
      {children}
    </ThemeProvider>
  )
}

export default EmotionThemeProvider
