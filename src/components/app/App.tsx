import React, { useEffect, useRef } from 'react'
import { Spotify } from '../../utils/spoitfy'
import './App.css'
import SongInput from '../songInput/songInput'

const App: React.FC = () => {
  const spotify = useRef(new Spotify())

  useEffect(() => {
    if (!spotify.current.isAuthenticated()) spotify.current.authenticateUser()
  }, [])

  return (
    <div className='app'>
      <SongInput spotify={spotify.current} />
    </div>
  )
}

export default App
