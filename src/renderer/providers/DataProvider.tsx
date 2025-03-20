import React, { useCallback, useEffect, useState } from 'react'

import { randomizeIndices } from '../../helpers'
import { Data } from '../../types/data'
import DataContext, { DataContextProps } from '../contexts/DataContext'

interface DataProviderProps {
  children: React.ReactNode
}

const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [data, setData] = useState<Data[]>([])
  const [excludedIds, setExcludedIds] = useState<string[]>([])
  const [randomIndexOrder, _setRandomIndexOrder] = useState<number[]>([])
  const [selectedId, setSelectedId] = useState<string | undefined>()

  // Set first ID when data is initialized
  useEffect(() => {
    if (data.length) {
      console.log('data', data)
      setSelectedId(data[0].id)
    }
  }, [data, setSelectedId])

  const setRandomIndexOrder = useCallback(() => {
    if (data.length) {
      const newRandomOrder = randomizeIndices(data)
      console.log('randomIndexOrder', newRandomOrder)
      _setRandomIndexOrder(newRandomOrder)
    }
  }, [data])

  const contextValue: DataContextProps = {
    data,
    setData,
    excludedIds,
    setExcludedIds,
    randomIndexOrder,
    setRandomIndexOrder,
    selectedId,
    setSelectedId,
  }

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  )
}

export default DataProvider