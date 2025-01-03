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
  selectedIndex: number | undefined
  setData: React.Dispatch<React.SetStateAction<Data[]>>
  setExcludedIds: React.Dispatch<React.SetStateAction<string[]>>
  setSelectedIndex: React.Dispatch<React.SetStateAction<number | undefined>>
  handleSetRandomizedDataOrder: () => void
}

const NavBar = ({
  data,
  excludedIds,
  selectedIndex,
  setData,
  setExcludedIds,
  setSelectedIndex,
  handleSetRandomizedDataOrder
}: Props) => {
  const handleSetExclude = (id: string, exclude: boolean) => {
    if (exclude) {
      setExcludedIds([...excludedIds, id])
      if (selectedIndex !== undefined && id === data[selectedIndex].id) {
        setSelectedIndex(undefined)
      }
    } else {
      setExcludedIds(excludedIds.filter((excludedId) => excludedId !== id))
    }
  }

  console.log(excludedIds)

  return data.length ? (
    <List>
      {data.map((datum, index) => (
        <ListItem
          key={datum.id}
          datum={datum}
          exclude={excludedIds.includes(datum.id)}
          handleSetExclude={handleSetExclude}
          handleSetRandomizedDataOrder={handleSetRandomizedDataOrder}
          index={index}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
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
