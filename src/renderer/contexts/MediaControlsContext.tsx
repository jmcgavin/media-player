import { createContext } from 'react'

export interface MediaControlsContextProps {
  autoplay: boolean
  setAutoplay: (value: boolean) => void
  loop: boolean
  setLoop: (value: boolean) => void
  muted: boolean
  setMuted: (value: boolean) => void
  shuffle: boolean
  setShuffle: (value: boolean) => void
  imageDuration: number
  setImageDuration: (value: number) => void
}

const MediaControlsContext = createContext<MediaControlsContextProps | undefined>(undefined)

export default MediaControlsContext
