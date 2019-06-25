import React, { useEffect, useRef } from 'react'
import { Spotify } from '../../utils/spoitfy'
import './App.css'
import SongInput from '../songInput/songInput'
import Roulette from '../roulette/Roulette'

const App: React.FC = () => {
  const spotify = useRef(new Spotify())

  useEffect(() => {
    //if (!spotify.current.isAuthenticated()) spotify.current.authenticateUser()
  }, [])

  return (
    <div className='app'>
      <SongInput spotify={spotify.current} />
      <Roulette blank='https://upload.wikimedia.org/wikipedia/en/5/50/Sgt._Pepper%27s_Lonely_Hearts_Club_Band.jpg' bullet='https://upload.wikimedia.org/wikipedia/en/4/42/Beatles_-_Abbey_Road.jpg' />
    </div>
  )
}

export default App
