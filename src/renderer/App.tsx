import { theme } from 'antd'
import { useEffect, useState } from 'react'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import type { Data } from 'src/types/data'

import { randomizeIndices } from '../helpers'
import MediaPlayer from './components/MediaPlayer'
import NavBar from './components/NavBar'

const { useToken } = theme

const App = () => {
  const [data, setData] = useState<Data[]>([])
  const [excludedIds, setExcludedIds] = useState<string[]>([])
  const [randomIndexOrder, setRandomIndexOrder] = useState<number[]>([])
  const [selectedId, setSelectedId] = useState<string | undefined>()
  const { token } = useToken()

  useEffect(() => {
    if (data.length) {
      console.log(data)
      setSelectedId(data[0].id)
    }
  }, [data])

  const handleSetRandomIndexOrder = () => {
    setRandomIndexOrder(randomizeIndices(data))
  }

  return (
    <PanelGroup style={{ height: '100vh' }} direction='horizontal' autoSaveId='main'>
      <Panel defaultSize={30} minSize={20}>
        <NavBar
          data={data}
          excludedIds={excludedIds}
          setData={setData}
          setExcludedIds={setExcludedIds}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          handleSetRandomIndexOrder={handleSetRandomIndexOrder}
        />
      </Panel>
      <PanelResizeHandle style={{ width: 1, background: token.colorBorder }} />
      <Panel minSize={20}>
        <MediaPlayer
          data={data}
          excludedIds={excludedIds}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          randomIndexOrder={randomIndexOrder}
          handleSetRandomIndexOrder={handleSetRandomIndexOrder}
        />
      </Panel>
    </PanelGroup>
  )
}

export default App
