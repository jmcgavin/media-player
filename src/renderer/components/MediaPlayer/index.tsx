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

  const handleMediaEnd = useMemo(() => {
    return () => {
      if (mediaControls.autoplay && selectedIndex !== undefined) {
        if (mediaControls.shuffle) {
          // Shuffle on - play next
          console.log('Shuffle on - play next')
          const getNextIndex = () => {
            let index = randomIndexOrder.indexOf(selectedIndex) + 1
            if (index >= randomIndexOrder.length) index = 0
            return randomIndexOrder[index]
          }
          const nextIndex = getNextIndex()
          const nextData = data[nextIndex]
          setSelectedId(nextData.id)

          if (randomIndexOrder.indexOf(nextIndex) === randomIndexOrder[randomIndexOrder.length - 1]) {
            // Shuffle on - reached end of data - reshuffle
            console.log('Shuffle on - reached end of data - reshuffle')
            setRandomIndexOrder()
          }
        } else if (selectedIndex + 1 === data.length) {
          // Shuffle off - reached end of data - start from 0
          console.log('Shuffle off - reached end of data - start from 0')
          setSelectedId(data[0].id)
        } else {
          // Shuffle off - play next
          console.log('Shuffle off - play next')
          const nextIndex = selectedIndex + 1
          setSelectedId(data[nextIndex].id)
        }
      }
    }
  }, [data, mediaControls.autoplay, mediaControls.shuffle, randomIndexOrder, selectedIndex, setRandomIndexOrder, setSelectedId])

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
            <Switch checked={mediaControls.shuffle} onChange={mediaControls.setShuffle} />

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
