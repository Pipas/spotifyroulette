import React, { useState, useEffect, useRef } from 'react'
import { Spotify } from '../../utils/Spoitfy'
import './App.css'
import SongInput from '../songInput/songInput'
import Roulette from '../roulette/Roulette'
import ActionButton from '../actionButton/ActionButton'
import spin from '../../images/spin.svg'
import { TrackController } from '../../utils/ContextController'

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
  const [state, setState] = useState(RouletteState.IDLE)
  const [results, setResults] = useState<any>([])
  const [bullet, setBullet] = useState<any>()
  const [blank, setBlank] = useState<any>()
  const controller = useRef(new TrackController(spotify.current, setResults))

  useEffect(() => {
    if (!spotify.current.isAuthenticated()) spotify.current.authenticateUser()
  }, [])

  const onResultClick = (position: number): void => {
    if (blank === undefined) {
      setBlank(results[position])
      setResults([])
    } else {
      setBullet(results[position])
      setResults([])
      setState(RouletteState.LOAD)
    }
  }

  const onShoot = (isBullet: boolean) : void => {
    controller.current.play(isBullet ? bullet : blank)
  }

  return (
    <div className='app'>
      <div className='controls'>
        <SongInput
          results={controller.current.formatResults(results)}
          onSearch={(query: string) => controller.current.search(query)}
          onResultClick={onResultClick}
        />
        <ActionButton src={spin} visible={state === RouletteState.SHOT} />
      </div>
      <Roulette
        blank={controller.current.getItemSrc(blank)}
        bullet={controller.current.getItemSrc(bullet)}
        state={state}
        setState={setState}
        chooseBullet={false}
        onShoot={onShoot}
      />
    </div>
  )
}

export default App
