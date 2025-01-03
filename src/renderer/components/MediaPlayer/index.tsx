import styled from '@emotion/styled'
import { InputNumber, Switch, Typography } from 'antd'
import { useEffect, useMemo, useState } from 'react'

import { Data } from '../../../types/data'

const { Text } = Typography

const StyledSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  padding: ${(props) => props.theme.paddingLG}px;
`

type Props = {
  data: Data[]
  excludedIds: string[]
  handleSetRandomizedDataOrder: () => void
  randomizedDataOrder: number[]
  selectedIndex: number | undefined
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>
}

const MediaPlayer = ({
  data,
  excludedIds,
  handleSetRandomizedDataOrder,
  randomizedDataOrder,
  selectedIndex,
  setSelectedIndex,
}: Props) => {
  const [autoplay, setAutoplay] = useState(false)
  const [loop, setLoop] = useState(false)
  const [muted, setMuted] = useState(false)
  const [shuffle, setShuffle] = useState(false)
  const [imageDuration, setImageDuration] = useState(10)

  const handleSetShuffle = (shuffle: boolean) => {
    if (shuffle) {
      handleSetRandomizedDataOrder()
    }
    setShuffle(shuffle)
  }

  const handleMediaEnd = useMemo(() => {
    return () => {
      if (autoplay && selectedIndex !== undefined) {
        if (shuffle) {
          const currentIndex = randomizedDataOrder.findIndex((index) => index === selectedIndex)
          const nextIndex = randomizedDataOrder[(currentIndex + 1) % randomizedDataOrder.length]
          setSelectedIndex(nextIndex)
        } else if (selectedIndex + 1 === data.length) {
          setSelectedIndex(0)
        } else {
          setSelectedIndex(selectedIndex + 1)
        }
      }
    }
  }, [autoplay, shuffle, randomizedDataOrder, selectedIndex, data.length, setSelectedIndex])

  useEffect(() => {
    if (autoplay && selectedIndex !== undefined && data[selectedIndex].dataType === 'image') {
      const timer = setTimeout(() => {
        handleMediaEnd()
      }, imageDuration * 1000)

      return () => clearTimeout(timer)
    }
  }, [autoplay, data, handleMediaEnd, imageDuration, selectedIndex])

  const handleSetImageDuration = (value: number) => {
    setImageDuration(value)
  }

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
                autoPlay={autoplay}
                loop={loop}
                muted={muted}
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
            <Switch checked={autoplay} onChange={setAutoplay} />

            <Text type='secondary'>Loop</Text>
            <Switch checked={loop} onChange={setLoop} />

            <Text type='secondary'>Mute</Text>
            <Switch checked={muted} onChange={setMuted} />

            <Text type='secondary'>Shuffle</Text>
            <Switch checked={shuffle} onChange={handleSetShuffle} />

            <Text type='secondary'>Image Duration</Text>
            <InputNumber suffix='s' defaultValue={10} min={1} onChange={handleSetImageDuration} />
          </div>
        </>
      ) : (
        <Text type='secondary'>No file selected</Text>
      )}
    </StyledSection>
  )
}

export default MediaPlayer
