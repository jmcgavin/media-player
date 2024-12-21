import { theme } from 'antd'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'

import MediaPlayer from './components/MediaPlayer'
import NavBar from './components/NavBar'

const { useToken } = theme

const App = () => {
  const { token } = useToken()

  return (
    <PanelGroup style={{ height: '100vh' }} direction="horizontal" autoSaveId="main">
      <Panel defaultSize={30} minSize={20}>
        <NavBar />
      </Panel>
      <PanelResizeHandle style={{ width: 1, background: token.colorBorder }} />
      <Panel minSize={20}>
        <MediaPlayer />
      </Panel>
    </PanelGroup>
  )
}

export default App
