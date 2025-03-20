import { createContext } from 'react'

import { Data } from '../../types/data'

export interface DataContextProps {
  data: Data[]
  setData: (value: Data[]) => void
  excludedIds: string[]
  setExcludedIds: (ids: string[]) => void
  randomIndexOrder: number[]
  setRandomIndexOrder: (firstIndex?: number) => void
  selectedId: string | undefined
  setSelectedId: (id: string | undefined) => void
}

const DataContext = createContext<DataContextProps | undefined>(undefined)

export default DataContext
