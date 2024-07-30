import React, { useEffect } from 'react'
import AlbumGrid from './AlbumGrid'
import { UserAlbumData } from '../../types'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'

const enum Filters {
  Newest = 'newest',
  Oldest = 'oldest',
  Highest = 'highest',
  Lowest = 'lowest'
}

interface SortedAlbumGridProps {
  readonly albums: UserAlbumData[] | null
}

const SortedAlbumGrid: React.FC<SortedAlbumGridProps> = ({ albums }) => {
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
  }, [albums, selectFilter])

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
      {filteredAlbums ? <AlbumGrid albums={filteredAlbums} /> : <AlbumGrid albums={albums} />}
    </>
  )
}

export default SortedAlbumGrid