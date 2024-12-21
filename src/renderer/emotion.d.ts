import '@emotion/react'
import { type GlobalToken } from 'antd/es/theme/interface'

declare module '@emotion/react' {
  export type Theme = GlobalToken
}
