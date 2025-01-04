import styled from '@emotion/styled'

import FileSelect from './FileSelect'
import ListItem from './ListItem'
import useData from '../../hooks/useData'

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

const NavBar = () => {
  const { data, excludedIds, selectedId, setData, setExcludedIds, setSelectedId } = useData()

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
          index={index}
          active={datum.id === selectedId}
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
