import styled from '@emotion/styled'
import { InputNumber, Switch, Typography } from 'antd'
import { useEffect, useMemo, useState } from 'react'

import useData from '../../hooks/useData'
import useMediaControls from '../../hooks/useMediaControls'


const { Text } = Typography

const StyledSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  padding: ${(props) => props.theme.paddingLG}px;
`

const MediaPlayer = () => {
  const { data, randomIndexOrder, selectedId, setRandomIndexOrder, setSelectedId } = useData()
  const mediaControls = useMediaControls()
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>()

  const handleSetShuffle = (shuffle: boolean) => {
    if (shuffle) {
      setRandomIndexOrder()
    }
    mediaControls.setShuffle(shuffle)
  }

  const handleMediaEnd = useMemo(() => {
    return () => {
      if (mediaControls.autoplay && selectedIndex !== undefined) {
        if (mediaControls.shuffle) {
          const nextIndex = randomIndexOrder[(selectedIndex + 1) % randomIndexOrder.length]
          setSelectedId(data[nextIndex].id)
        } else if (selectedIndex + 1 === data.length) {
          setSelectedId(data[0].id)
        } else {
          const nextIndex = selectedIndex + 1
          setSelectedId(data[nextIndex].id)
        }
      }
    }
  }, [data, mediaControls.autoplay, mediaControls.shuffle, randomIndexOrder, selectedIndex, setSelectedId])

  useEffect(() => {
    if (selectedId) {
      setSelectedIndex(data.findIndex((datum) => datum.id === selectedId))
    } else {
      setSelectedIndex(undefined)
    }
  }, [data, selectedId])

  useEffect(() => {
    if (mediaControls.autoplay && selectedIndex !== undefined && data[selectedIndex].dataType === 'image') {
      const timer = setTimeout(() => {
        handleMediaEnd()
      }, mediaControls.imageDuration * 1000)

      return () => clearTimeout(timer)
    }
  }, [data, handleMediaEnd, mediaControls.autoplay, mediaControls.imageDuration, selectedId, selectedIndex])

  return (
    <StyledSection>
      {selectedIndex !== undefined ? (
        <>
          <div style={{ height: '100%' }}>
            {data[selectedIndex].dataType === 'video' ? (
              <video
                key={data[selectedIndex].id} // Re-render video element when selectedIndex changes
                controls
                width='100%'
                height='100%'
                autoPlay={mediaControls.autoplay}
                loop={mediaControls.loop}
                muted={mediaControls.muted}
                onEnded={handleMediaEnd}
              >
                <source src={`media://${data[selectedIndex].path}`} type='video/mp4' />
              </video>
            ) : (
              <img src={`media://${data[selectedIndex].path}`} width='100%' height='auto' />
            )}
          </div>
          <div>
            <Text type='secondary'>Autoplay</Text>
            <Switch checked={mediaControls.autoplay} onChange={mediaControls.setAutoplay} />

            <Text type='secondary'>Loop</Text>
            <Switch checked={mediaControls.loop} onChange={mediaControls.setLoop} />

            <Text type='secondary'>Mute</Text>
            <Switch checked={mediaControls.muted} onChange={mediaControls.setMuted} />

            <Text type='secondary'>Shuffle</Text>
            <Switch checked={mediaControls.shuffle} onChange={handleSetShuffle} />

            <Text type='secondary'>Image Duration</Text>
            <InputNumber suffix='s' defaultValue={mediaControls.imageDuration} min={1} onChange={(value) => mediaControls.setImageDuration(value!)} />
          </div>
        </>
      ) : (
        <Text type='secondary'>No file selected</Text>
      )}
    </StyledSection>
  )
}

export default MediaPlayer
