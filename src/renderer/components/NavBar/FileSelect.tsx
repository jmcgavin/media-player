import { FolderAddTwoTone } from '@ant-design/icons'
import styled from '@emotion/styled'
import { Checkbox, Tooltip, Typography, theme } from 'antd'
import { useState } from 'react'
import type { Data } from 'src/types/data'

import { FILE_TYPES } from '../../../constants'

const { Text, Title } = Typography
const { useToken } = theme

const DraggableArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  gap: ${(props) => props.theme.sizeMD}px;
  background-color: ${(props) => props.theme.colorFillAlter};
  width: 100%;
  padding: ${(props) => props.theme.padding}px;
  border-radius: ${(props) => props.theme.borderRadiusLG}px;
  border: dashed ${(props) => props.theme.lineWidth}px ${(props) => props.theme.colorBorder};
  transition: border-color ${(props) => props.theme.motionDurationSlow};

  &:hover {
    border-color: ${(props) => props.theme.colorPrimaryBorderHover};
  }
`

type Props = {
  setData: React.Dispatch<React.SetStateAction<Data[]>>
}

const FileSelect = ({ setData }: Props) => {
  const { token } = useToken()

  const [recursive, setRecursive] = useState(true)

  const handleClick = async () => {
    const results = await window.electronAPI.openFiles({ recursive })
    setData(results)
  }

  return (
    /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
    <DraggableArea onClick={handleClick}>
      <FolderAddTwoTone twoToneColor={token.colorPrimary} style={{ fontSize: token.fontSizeHeading1 }} />
      <div style={{ textAlign: 'center' }}>
        <Title level={5}>Select Files</Title>
        <Text type='secondary'>Click to select or drag-and-drop files/folders to this area.</Text>
        <br />
        <Text type='secondary'>Supported file types: {FILE_TYPES.join(', ')}.</Text>
      </div>
      <span onClick={(e) => e.stopPropagation()}>
        <Tooltip title='Select files from all nested directories.'>
          <Checkbox checked={recursive} onChange={(e) => setRecursive(e.target.checked)}>
            Include all subfolders
          </Checkbox>
        </Tooltip>
      </span>
    </DraggableArea>
  )
}

export default FileSelect
