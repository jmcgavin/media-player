import React, { useEffect, useState } from 'react'

import MediaControlsContext, { MediaControlsContextProps } from '../contexts/MediaControlsContext'
import useData from '../hooks/useData'

interface MediaControlsProviderProps {
  children: React.ReactNode
}

const MediaControlsProvider: React.FC<MediaControlsProviderProps> = ({ children }) => {
  const { setRandomIndexOrder } = useData()
  const [autoplay, setAutoplay] = useState(false)
  const [loop, setLoop] = useState(false)
  const [muted, setMuted] = useState(false)
  const [shuffle, setShuffle] = useState(false)
  const [imageDuration, setImageDuration] = useState(10)

  const contextValue: MediaControlsContextProps = {
    autoplay,
    setAutoplay,
    loop,
    setLoop,
    muted,
    setMuted,
    shuffle,
    setShuffle,
    imageDuration,
    setImageDuration,
  }

  useEffect(() => {
    if (shuffle) {
      setRandomIndexOrder()
    }
  }, [setRandomIndexOrder, shuffle])

  return (
    <MediaControlsContext.Provider value={contextValue}>
      {children}
    </MediaControlsContext.Provider>
  )
}

export default MediaControlsProvider