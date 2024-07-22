/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { UserAlbumData } from '../../types'
import './index.css'

interface ProfileStatsProps {
  readonly albums: UserAlbumData[]
}

const ProfileStats: React.FC<ProfileStatsProps> = ({ albums }) => {
  const [hoveredRating, setHoveredRating] = React.useState<number | null>(null)
  const [hoveredCount, setHoveredCount] = React.useState<number>(0)
  const [ratingDict, setRatingDict] = React.useState<{ [key: number]: number } | null>(null)
  const [largestValue, setLargestValue] = React.useState<number>(0)
  const allRatings = albums.length
  const MAX_HEIGHT = 100

  useEffect(() => {
    albumRatingStats()
  }, [albums])

  useEffect(() => {
    highestRatingAmount()
  }, [ratingDict])

  const highestRatingAmount = () => {
    let val = 0
    if (ratingDict) {
      for (const key in ratingDict) {
        if (ratingDict[key] > val) {
          val = ratingDict[key]
        }
      }
      setLargestValue(val)
    }
  }

  const albumRatingStats = () => {
    const dict: { [key: number]: number } = {}
    for (let i = 1; i <= 10; i++) {
      dict[i] = 0
    }
    albums.forEach((album) => {
      if (album.rating && dict[album.rating] !== undefined) { 
        dict[album.rating] += 1
      }
    })
    setRatingDict(dict)
  }

  const ratingBar = (rating: number, count: number) => {
    const multiplicationFactor = allRatings / (largestValue^2 / count)
    const height = (count / allRatings) * MAX_HEIGHT * multiplicationFactor

    return (
      <div className='rating-bar-container'
        onMouseEnter={() => { 
          setHoveredRating(rating) 
          setHoveredCount(count)
        }}
        onMouseLeave={() => {
          setHoveredRating(null) 
          setHoveredCount(0)
        }}
      >
        <div className='rating-bar' style={{ height: `${height + 5}%` }}>
        </div>

      </div>
    )
  }

  return (
    <>
      {ratingDict && 
      <div className='rating-bar-data-container'>
        { hoveredRating ? 
          <h2 className='rating-bar-data-header'>
            {hoveredCount} {hoveredRating}'s ({Math.floor((hoveredCount / allRatings) * 100)}%)</h2> 
          : 
          <h2 className='rating-bar-data-header'>
          Ratings: {Object.values(ratingDict).reduce((sum, value) => sum + value, 0)}
          </h2>}
        <div className='rating-bar-container'>
          <h3 className='rating-bar-number'>1</h3>
          {ratingDict && Object.entries(ratingDict).map(([rating, count]) => (
            <div key={rating}>
              {ratingBar(parseInt(rating), count)}
            </div>
          ))}
          <h3 className='rating-bar-number'>10</h3>
        </div>
      </div>}
    </>
  )
}

export default ProfileStats