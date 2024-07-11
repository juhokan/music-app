import React from 'react'
import { SpotifyTracklistObject } from '../../types'
import Track from './Track'

interface AlbumTracklistProps {
  readonly tracklist: SpotifyTracklistObject
}

const Tracklist: React.FC<AlbumTracklistProps> = ({ tracklist }) => {

  
  return (
    <div className='tracklist-container'>
      {tracklist.items.map((t, i) => (
        <Track track={t} index={i + 1} key={i}/>
      ))}
    </div>
  )
}

export default Tracklist
