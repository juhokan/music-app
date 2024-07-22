/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react'
import AlbumGrid from '../../common/AlbumGrid'
import { UserAlbumData } from '../../../types'
import { AlbumsContext, UserContext } from '../../../context'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'

const enum Filters {
  Newest = 'newest',
  Oldest = 'oldest',
  Highest = 'highest',
  Lowest = 'lowest'
}

const RatingPage: React.FC = () => {
  const { user } = React.useContext(UserContext)
  const { albums } = React.useContext(AlbumsContext)
  const [selectFilter, setSelectFilter] = React.useState<string | null>(null)
  const [usersAlbums, setUsersAlbums] = React.useState<UserAlbumData[] | null>(null)
  const [filteredAlbums, setFilteredAlbums] = React.useState<UserAlbumData[] | null>(null)
  const filters = [
    { label: 'Newest First', value: Filters.Newest },
    { label: 'Oldest First', value: Filters.Oldest },
    { label: 'Highest First', value: Filters.Highest },
    { label: 'Lowest First', value: Filters.Lowest }
  ]

  useEffect(() => {
    if (user && albums) {
      const filtered = albums.filter(album => album.user.username === user.username).reverse()
      setUsersAlbums(filtered)
    }
  }, [user, albums])


  useEffect(() => {
    if (usersAlbums) {
      switch (selectFilter) {
        case Filters.Newest:
          setFilteredAlbums([...usersAlbums])
          break
        case Filters.Oldest:
          setFilteredAlbums([...usersAlbums].reverse())
          break
        case Filters.Highest:
          setFilteredAlbums([...usersAlbums].sort((a, b) => b.rating - a.rating))
          break
        case Filters.Lowest:
          setFilteredAlbums([...usersAlbums].sort((a, b) => a.rating - b.rating))
          break
        default:
          break
      }
    }
  }, [selectFilter, usersAlbums])

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
      {filteredAlbums ? <AlbumGrid albums={filteredAlbums} /> : <AlbumGrid albums={usersAlbums} />}
    </>
  )
}

export default RatingPage