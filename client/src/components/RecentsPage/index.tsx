import React, { useEffect } from 'react'
import { AlbumsContext } from '../../context'
import { UserAlbumData } from '../../types'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'
import AlbumGrid from '../common/AlbumGrid'

const enum Filters {
  Newest = 'newest',
  Oldest = 'oldest',
  Highest = 'highest',
  Lowest = 'lowest'
}

const RecentsPage = () => {
  const { albums } = React.useContext(AlbumsContext)
  const [selectFilter, setSelectFilter] = React.useState<string | null>(null)
  const [filteredAlbums, setFilteredAlbums] = React.useState<UserAlbumData[] | null>(null)
  const filters = [
    { label: 'Newest First', value: Filters.Newest },
    { label: 'Oldest First', value: Filters.Oldest },
    { label: 'Highest First', value: Filters.Highest },
    { label: 'Lowest First', value: Filters.Lowest }
  ]

  useEffect(() => {
    if (albums) {
      const sortedAlbums = [...albums].reverse()
      setFilteredAlbums(sortedAlbums)
    }
  }, [albums])


  useEffect(() => {
    if (albums) {
      switch (selectFilter) {
        case Filters.Newest:
          setFilteredAlbums([...albums])
          break
        case Filters.Oldest:
          setFilteredAlbums([...albums].reverse())
          break
        case Filters.Highest:
          setFilteredAlbums([...albums].sort((a, b) => {
            const ratingA = a.rating ?? -Infinity
            const ratingB = b.rating ?? -Infinity
            return ratingB - ratingA
          }))
          break
        case Filters.Lowest:
          setFilteredAlbums([...albums].sort((a, b) => {
            const ratingA = a.rating ?? Infinity
            const ratingB = b.rating ?? Infinity
            return ratingA - ratingB
          }))
          break
        default:
          break
      }
    }
  }, [selectFilter, albums])

  const handleSetFilter = (e: DropdownChangeEvent) => {
    setSelectFilter(e.value)
  }

  
  return (
    <>
      <div className='card flex justify-content-end align-items-center'>
        <h3>Sort:</h3>
        <Dropdown
          value={selectFilter}
          onChange={(e) => handleSetFilter(e)}
          options={filters}
          optionLabel='label'
          placeholder='Select a Filter'
          className='w-14rem m-2'
        />
      </div>
      {filteredAlbums && <AlbumGrid albums={filteredAlbums}/>}
    </>
  )
}

export default RecentsPage