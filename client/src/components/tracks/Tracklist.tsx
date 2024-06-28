import React from 'react'
import { SpotifyTracklistObject } from '../../interface/SpotifyWrappers'
import Track from './Track'

interface AlbumTracklistProps {
  readonly tracklist: SpotifyTracklistObject
}

const Tracklist: React.FC<AlbumTracklistProps> = ({ tracklist }) => {

  
  return (
    <>
      {tracklist.items.map(t => (
        <Track track={t}/>
      ))}
    </>
  )
}

export default Tracklist
