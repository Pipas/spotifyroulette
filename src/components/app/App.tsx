import React, { useState, useEffect, useRef } from 'react'
import { Spotify } from '../../utils/spoitfy'
import './App.css'
import SongInput from '../songInput/songInput'
import Roulette from '../roulette/Roulette'

export enum RouletteState {
  IDLE = 'idle',
  LOAD = 'load',
  LOADING = 'loading',
  SPIN = 'spin',
  SPINING = 'spining',
  SHOT = 'shot'
}

const App: React.FC = () => {
  const spotify = useRef(new Spotify())
  const [rouletteState, setRouletteState] = useState(RouletteState.IDLE)

  useEffect(() => {
    //if (!spotify.current.isAuthenticated()) spotify.current.authenticateUser()
  }, [])

  return (
    <div className='app'>
      <SongInput spotify={spotify.current} />
      <button onClick={() => setRouletteState(RouletteState.LOAD)}>Try me</button>
      <button onClick={() => setRouletteState(RouletteState.SPIN)}>Spin</button>
      <Roulette
        blank='https://upload.wikimedia.org/wikipedia/en/4/42/Beatles_-_Abbey_Road.jpg'
        bullet='https://upload.wikimedia.org/wikipedia/en/9/9e/No_Love_Deep_Web_artwork.png'
        state={rouletteState}
        setState={setRouletteState}
        chooseBullet={true}
      />
    </div>
  )
}

export default App
