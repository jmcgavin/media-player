import { theme } from 'antd'
import { useState } from 'react'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import type { Data } from 'src/types/data'

import { randomizeIndices } from '../helpers'
import MediaPlayer from './components/MediaPlayer'
import NavBar from './components/NavBar'

const { useToken } = theme

const App = () => {
  const [data, setData] = useState<Data[]>([])
  const [excludedIds, setExcludedIds] = useState<string[]>([])
  const [randomizedDataOrder, setRandomizedDataOrder] = useState<number[]>([])
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>()
  const { token } = useToken()

  console.log(selectedIndex)

  const handleSetData = (data: Data[]) => {
    console.log(data)
    setData(data)
    setSelectedIndex(0)
  }

  const handleSetRandomizedDataOrder = () => {
    setRandomizedDataOrder(randomizeIndices(data))
  }

  return (
    <PanelGroup style={{ height: '100vh' }} direction='horizontal' autoSaveId='main'>
      <Panel defaultSize={30} minSize={20}>
        <NavBar
          data={data}
          excludedIds={excludedIds}
          setData={handleSetData}
          setExcludedIds={setExcludedIds}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          handleSetRandomizedDataOrder={handleSetRandomizedDataOrder}
        />
      </Panel>
      <PanelResizeHandle style={{ width: 1, background: token.colorBorder }} />
      <Panel minSize={20}>
        <MediaPlayer
          data={data}
          excludedIds={excludedIds}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          randomizedDataOrder={randomizedDataOrder}
          handleSetRandomizedDataOrder={handleSetRandomizedDataOrder}
        />
      </Panel>
    </PanelGroup>
  )
}

export default App
