import { FolderAddTwoTone } from '@ant-design/icons'
import styled from '@emotion/styled'
import { Checkbox, Typography, theme } from 'antd'
import { useState } from 'react'

import { SUPPORTED_FILE_EXTENSIONS } from '../../../constants'

const { Text, Title } = Typography
const { useToken } = theme

const DraggableArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  gap: ${props => props.theme.sizeMD}px;
  background-color: ${props => props.theme.colorFillAlter};
  padding: ${props => props.theme.padding}px;
  margin: ${props => props.theme.marginLG}px;
  border-radius: ${props => props.theme.borderRadiusLG}px;
  border: dashed ${props => props.theme.lineWidth}px ${props => props.theme.colorBorder};
  transition: border-color ${props => props.theme.motionDurationSlow};

  &:hover {
    border-color: ${props => props.theme.colorPrimaryBorderHover};
  }
`

const FileSelect = () => {
  const { token } = useToken()

  const [recursively, setRecursively] = useState(true)

  const handleClick = async () => {
    const result = await window.electronAPI.openFiles(recursively)
    console.log(result)
  }

  return (
    /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
    <DraggableArea onClick={handleClick}>
      <FolderAddTwoTone twoToneColor={token.colorPrimary} style={{ fontSize: token.fontSizeHeading1 }} />
      <div style={{ textAlign: 'center' }}>
        <Title level={5}>Select files</Title>
        <Text type='secondary'>Click to select or drag-and-drop files or folders to this area. Supported file types: {SUPPORTED_FILE_EXTENSIONS.join(', ')}.</Text>
      </div>
      <span onClick={(e) => e.stopPropagation()}>
        <Checkbox checked={recursively} onChange={e => setRecursively(e.target.checked)}>
          Include all subfolders
        </Checkbox>
      </span>
    </DraggableArea>
  )
}

export default FileSelect
