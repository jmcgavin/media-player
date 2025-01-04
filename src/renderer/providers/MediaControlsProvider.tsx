import React, { useState } from 'react'

import MediaControlsContext, { MediaControlsContextProps } from '../contexts/MediaControlsContext'

interface MediaControlsProviderProps {
  children: React.ReactNode
}

const MediaControlsProvider: React.FC<MediaControlsProviderProps> = ({ children }) => {
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

  return (
    <MediaControlsContext.Provider value={contextValue}>
      {children}
    </MediaControlsContext.Provider>
  )
}

export default MediaControlsProvider