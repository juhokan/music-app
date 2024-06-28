/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import { SpotifyTrackObject } from '../../interface/SpotifyWrappers'
import { MdPlayArrow, MdPause } from "react-icons/md"
import { AudioContext } from '../../context'

interface TrackProps {
  readonly track: SpotifyTrackObject;
}

const Track: React.FC<TrackProps> = ({ track }) => {
  const { audio, setAudio, id, setId } = React.useContext(AudioContext)
  const [isPlaying, setIsPlaying] = useState(false)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<number | null>(null)

  useEffect(() => {
    if (audio) {
      try {
        audio.play()
        setIsPlaying(true)
        intervalRef.current = window.setInterval(updateProgressBar, 100)
        audio.addEventListener('ended', handleAudioEnded)
      } catch (err) {
        console.error(err)
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      if (audio) {
        audio.removeEventListener('ended', handleAudioEnded)
      }
    }
  }, [audio])

  const handleAudioEnded = () => {
    setIsPlaying(false)
    setAudio(null)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  const updateProgressBar = () => {
    if (audio && progressBarRef.current) {
      const progress = (audio.currentTime / audio.duration) * 100
      progressBarRef.current.style.width = `${progress}%`
    }
  }

  const transformTime = (ms: number) => {
    const total = Math.floor(ms / 1000)
    const m = Math.floor(total / 60)
    const s = total % 60
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

  const startAudio = (link: string) => {
    if (audio) {
      stopAudio()
    }
    const newAudio = new Audio(link)
    setAudio(newAudio)
    setId(track.id)
    setIsPlaying(true)
  }

  const stopAudio = () => {
    if (audio) {
      audio.pause()
      audio.currentTime = 0
      setIsPlaying(false)
      setAudio(null)
      setId(null)
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }

  return (
    <div className='track-container' key={track.id}>
      <h4 className='track-name'>{track.name}</h4>
      <h4 className='track-duration'>({transformTime(track.duration_ms)})</h4>

      {track.preview_url && (isPlaying && id === track.id ? (
        <div className='track-play-container' onClick={stopAudio}>
          <MdPause className='track-play-icon' size={'20px'}/>
        </div>
      ) : (
        <div className='track-play-container' onClick={() => {track.preview_url && startAudio(track.preview_url)}}>
          <MdPlayArrow className='track-play-icon' size={'20px'}/>
        </div>
      ))}

      {audio && audio.src === track.preview_url && (
        <div className='track-progress-container'>
          <div className='track-progress' ref={progressBarRef} style={{ width: '0%' }}></div>
        </div>
      )}
    </div>
  )
}

export default Track

