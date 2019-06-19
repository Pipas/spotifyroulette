import React, { useEffect, useState, useRef } from 'react'
import { Spotify } from '../../utils/spoitfy'
import './App.css'
import SongInput from '../songInput/songInput';

type onChange = (event: React.ChangeEvent<HTMLInputElement>) => void

const App: React.FC = () => {
  const spotify = useRef(new Spotify())

  useEffect(() => {
    //if (!spotify.current.isAuthenticated()) spotify.current.authenticateUser()
  }, [])

  const onPlayClick = () => {
    // if (query !== null && query !== '' && query.length > 3) {
    //   spotify.current.searchTrack(query).then(data => {
    //     if (data.tracks.items.length > 0) {
    //       setImg(data.tracks.items[0].album.images[0].url)
    //     }
    //   })
    // }
  }

  return (
    <div className='app'>
      <SongInput />
    </div>
  )
}

export default App
