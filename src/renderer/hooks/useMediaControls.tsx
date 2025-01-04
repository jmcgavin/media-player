import { useContext } from 'react'

import MediaControlsContext, { MediaControlsContextProps } from '../contexts/MediaControlsContext'

const useMediaControls = (): MediaControlsContextProps => {
  const context = useContext(MediaControlsContext)
  if (!context) {
    throw new Error('useMediaControls must be used within a MediaControlsProvider')
  }
  return context
}

export default useMediaControls
