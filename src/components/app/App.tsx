import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Spotify } from '../../utils/Spoitfy'
import './App.css'
import SongInput from '../songInput/songInput'
import Roulette from '../roulette/Roulette'
import ActionButton from '../actionButton/ActionButton'
import spin from '../../images/spin.svg'
import { TrackController } from '../../utils/ContextController'
import WarningDialog from '../warningDialog/WarningDialog'

export enum RouletteState {
  IDLE = 'idle',
  LOAD = 'load',
  LOADING = 'loading',
  READY = 'ready',
  SPIN = 'spin',
  SPINING = 'spining',
  SHOT = 'shot'
}

const usePlayerOpen = (spotify: Spotify, state: RouletteState, setState: React.Dispatch<React.SetStateAction<RouletteState>>): [boolean, () => void, React.Dispatch<any>] => {
  const [playerOpen, setPlayerOpen] = useState()

  const checkPlayerOpen = useCallback(() => spotify.hasPlayerOpen().then(isOpen => {setPlayerOpen(isOpen)}),[spotify])

  useEffect(() => {
    if (state === RouletteState.READY) {
      if(!playerOpen)
        checkPlayerOpen()
      else
        setState(RouletteState.SPIN)
    }
  }, [playerOpen, checkPlayerOpen, state, setState])


  return [playerOpen, checkPlayerOpen, setPlayerOpen]
}

const App: React.FC = () => {
  const spotify = useRef(new Spotify())
  const [state, setState] = useState(RouletteState.IDLE)
  const [results, setResults] = useState<any>([])
  const [bullet, setBullet] = useState<any>()
  const [blank, setBlank] = useState<any>()
  const controller = useRef(new TrackController(spotify.current, setResults))
  const [playerOpen, checkPlayerOpen, setPlayerOpen] = usePlayerOpen(spotify.current, state, setState)

  useEffect(() => {
    if (!spotify.current.isAuthenticated()) spotify.current.authenticateUser()
  }, [])

  const onResultClick = (position: number): void => {
    if (blank === undefined) {
      setBlank(results[position])
    } else {
      setBullet(results[position])
    }

    setResults([])
    setState(RouletteState.LOAD)
  }

  const onShoot = (isBullet: boolean): void => {
    controller.current.play(isBullet ? bullet : blank)
  }

  const onContinueClick = () => {
    setState(RouletteState.SPIN)
    setPlayerOpen(true)
  }

  return (
    <div className='app'>
      <div className='controls'>
        <SongInput
          results={controller.current.formatResults(results)}
          onSearch={(query: string) => controller.current.search(query)}
          onResultClick={onResultClick}
          locked={state !== RouletteState.IDLE}
        />
        <ActionButton src={spin} visible={state === RouletteState.SHOT} />
      </div>
      <Roulette
        blank={controller.current.getItemSrc(blank)}
        bullet={controller.current.getItemSrc(bullet)}
        state={state}
        setState={setState}
        chooseBullet={true}
        onShoot={onShoot}
      />
      <WarningDialog visible={!playerOpen && playerOpen !== undefined} onRetryClick={checkPlayerOpen} onContinueClick={onContinueClick} />
    </div>
  )
}

export default App
