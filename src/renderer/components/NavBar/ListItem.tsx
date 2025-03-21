import styled from '@emotion/styled'
import { Checkbox, Space, Typography } from 'antd'
import { useRef, useState } from 'react'

import { secondsToTime } from '../../../helpers'
import type { Data } from '../../../types/data'
import useData from '../../hooks/useData'

const { Text } = Typography

const Container = styled.li<{ active: boolean, disabled: boolean }>`
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  list-style: none;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: ${({ theme }) => theme.sizeSM}px;
  padding: ${({ theme }) => theme.paddingSM}px;
  background: ${({ active, theme }) => (active ? theme.controlItemBgActive : 'transparent')};

  &:hover {
    background: ${(props) =>
      !props.disabled
        ? props.active
          ? props.theme.controlItemBgActiveHover
          : props.theme.controlItemBgHover
        : 'transparent'};
  }

  .content {
    display: flex;
    align-items: center;
    overflow: hidden;
    gap: ${({ theme }) => theme.sizeSM}px;
    opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
  }
`

const StyledVideo = styled.video`
  width: 100px;
  height: 60px;
  flex-shrink: 0;
  background: black;
`

const StyledImg = styled.div<{ src: string }>`
  width: 100px;
  height: 60px;
  flex-shrink: 0;
  background-image: url(${(props) => props.src});
  background-color: black;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`

type Props = {
  active: boolean
  datum: Data
  exclude: boolean
  handleSetExclude: (id: string, exclude: boolean) => void
  index: number
}

const ListItem = ({
  datum,
  exclude,
  handleSetExclude,
  active
}: Props) => {
  const { setRandomIndexOrder, setSelectedId } = useData()
  const [videoDuration, setVideoDuration] = useState<string>('')
  const videoPlayer = useRef<HTMLVideoElement>(null)

  const getVideoDuration = () => {
    if (videoPlayer.current) {
      setVideoDuration(secondsToTime(videoPlayer.current.duration))
    }
  }

  const handleClick = () => {
    if (active) {
      setSelectedId(undefined)
    } else if (!exclude) {
      setRandomIndexOrder()
      setSelectedId(datum.id)
    }
  }

  return (
    <Container onClick={handleClick} active={active} disabled={exclude}>
      <Checkbox
        checked={!exclude}
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => handleSetExclude(datum.id, !e.target.checked)}
      />
      <div className='content'>
        {datum.dataType === 'video' ? (
          <StyledVideo ref={videoPlayer} onLoadedMetadata={getVideoDuration}>
            <source src={`media://${datum.path}`} type={`video/${datum.extension}`} />
          </StyledVideo>
        ) : (
          <StyledImg src={encodeURI(`media://${datum.path}`)} />
        )}
        <Space direction='vertical' size='small' style={{ overflow: 'hidden' }}>
          <Text ellipsis={true}>
            <strong>Name: </strong>
            {datum.name}
          </Text>
          <Text ellipsis={true}>
            <strong>Type: </strong>
            {datum.dataType.charAt(0).toUpperCase() + datum.dataType.slice(1)}
          </Text>
          {datum.dataType === 'video' && (
            <Text ellipsis={true}>
              <strong>Duration: </strong>
              {videoDuration}
            </Text>
          )}
        </Space>
      </div>
    </Container>
  )
}

export default ListItem
