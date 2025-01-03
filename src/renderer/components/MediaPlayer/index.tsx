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
  handleSetRandomIndexOrder: () => void
  randomIndexOrder: number[]
  selectedId: string | undefined
  setSelectedId: React.Dispatch<React.SetStateAction<string>>
}

const MediaPlayer = ({
  data,
  // excludedIds,
  handleSetRandomIndexOrder,
  randomIndexOrder,
  selectedId,
  setSelectedId,
}: Props) => {
  const [autoplay, setAutoplay] = useState(false)
  const [loop, setLoop] = useState(false)
  const [muted, setMuted] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>()
  const [shuffle, setShuffle] = useState(false)
  const [imageDuration, setImageDuration] = useState(10)

  const handleSetShuffle = (shuffle: boolean) => {
    if (shuffle) {
      handleSetRandomIndexOrder()
    }
    setShuffle(shuffle)
  }

  const handleMediaEnd = useMemo(() => {
    return () => {
      if (autoplay && selectedIndex !== undefined) {
        if (shuffle) {
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
  }, [autoplay, data, randomIndexOrder, selectedIndex, setSelectedId, shuffle])

  useEffect(() => {
    if (selectedId) {
      setSelectedIndex(data.findIndex((datum) => datum.id === selectedId))
    } else {
      setSelectedIndex(undefined)
    }
  }, [data, selectedId])

  useEffect(() => {
    if (autoplay && selectedIndex !== undefined && data[selectedIndex].dataType === 'image') {
      const timer = setTimeout(() => {
        handleMediaEnd()
      }, imageDuration * 1000)

      return () => clearTimeout(timer)
    }
  }, [autoplay, data, handleMediaEnd, imageDuration, selectedId, selectedIndex])

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
