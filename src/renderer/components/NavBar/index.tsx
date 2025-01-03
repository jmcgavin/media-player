import styled from '@emotion/styled'
import type { Data } from 'src/types/data'

import FileSelect from './FileSelect'
import ListItem from './ListItem'

const EmptySection = styled.section`
  display: flex;
  align-items: center;
  height: 100%;
  padding: ${(props) => props.theme.paddingLG}px;
`

const List = styled.ul`
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: auto;
`

type Props = {
  data: Data[]
  excludedIds: string[]
  selectedId: string | undefined
  setData: React.Dispatch<React.SetStateAction<Data[]>>
  setExcludedIds: React.Dispatch<React.SetStateAction<string[]>>
  setSelectedId: React.Dispatch<React.SetStateAction<string | undefined>>
  handleSetRandomIndexOrder: () => void
}

const NavBar = ({
  data,
  excludedIds,
  selectedId,
  setData,
  setExcludedIds,
  setSelectedId,
  handleSetRandomIndexOrder
}: Props) => {
  const handleSetExclude = (id: string, exclude: boolean) => {
    if (exclude) {
      setExcludedIds([...excludedIds, id])
      if (id === selectedId) {
        setSelectedId(undefined)
      }
    } else {
      setExcludedIds(excludedIds.filter((excludedId) => excludedId !== id))
    }
  }

  return data.length ? (
    <List>
      {data.map((datum, index) => (
        <ListItem
          key={datum.id}
          datum={datum}
          exclude={excludedIds.includes(datum.id)}
          handleSetExclude={handleSetExclude}
          handleSetRandomIndexOrder={handleSetRandomIndexOrder}
          index={index}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />
      ))}
    </List>
  ) : (
    <EmptySection>
      <FileSelect setData={setData} />
    </EmptySection>
  )
}

export default NavBar
