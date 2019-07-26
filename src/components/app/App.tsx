import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Spotify } from '../../utils/Spoitfy'
import './App.css'
import SongInput from '../songInput/songInput'
import Roulette from '../roulette/Roulette'
import ActionButtons from '../actionButtons/ActionButtons'
import settingsGear from '../../images/settings.svg'
import { TrackController, SearchResult } from '../../utils/ContextController'
import WarningDialog from '../warningDialog/WarningDialog'
import Settings from '../settings/Settings'

export enum BulletType {
  Songs, Albums, Artists
}

export enum RouletteState {
  RESET = 'reset',
  IDLE = 'idle',
  LOAD = 'load',
  LOADING = 'loading',
  READY = 'ready',
  SPIN = 'spin',
  SPINING = 'spining',
  SHOT = 'shot'
}

const useSettingsOpen = (): [boolean, () => void] => {
  const [settingsOpen, setSettingsOpen] = useState(false)

  const toggleSettings = () => {
    setSettingsOpen(!settingsOpen)
  }

  return [settingsOpen, toggleSettings]
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
  const [searchResult, setSearchResult] = useState<any>(new SearchResult(false, []))
  const [bullet, setBullet] = useState<any>()
  const [blank, setBlank] = useState<any>()
  const controller = useRef(new TrackController(spotify.current, setSearchResult))
  const [playerOpen, checkPlayerOpen, setPlayerOpen] = usePlayerOpen(spotify.current, state, setState)
  const [settingsOpen, toggleSettingsOpen] = useSettingsOpen()
  const [bulletType, setBulletType] = useState(BulletType.Songs)

  useEffect(() => {
    if (!spotify.current.isAuthenticated()) spotify.current.authenticateUser()
  }, [])

  const onResultClick = (position: number): void => {
    if (blank === undefined) {
      setBlank(searchResult.results[position])
    } else {
      setBullet(searchResult.results[position])
    }

    setSearchResult(new SearchResult(false, []))
    setState(RouletteState.LOAD)
  }

  const onShoot = (isBullet: boolean): void => {
    controller.current.play(isBullet ? bullet : blank)
  }

  const onContinueClick = () => {
    setState(RouletteState.SPIN)
    setPlayerOpen(true)
  }

  const resetRoulette = () => {
    setBullet(undefined)
    setBlank(undefined)
    setState(RouletteState.RESET)
  }

  const resolveTooltip = () : string => {
    if (state ===  RouletteState.IDLE)
      return blank === undefined ? 'Search for the blanks' : 'Search for the bullet!'
    else if(state === RouletteState.LOADING)
      return 'Loading weapon.'
    else if(state === RouletteState.SHOT)
      return 'Reset or Reroll'
    else
      return ''
  }

  return (
    <div className='app'>
      <div className='controls'>
        <SongInput
          searchResult={controller.current.formatResults(searchResult)}
          onSearch={(query: string) => controller.current.search(query)}
          onResultClick={onResultClick}
          locked={state !== RouletteState.IDLE}
          tooltip={resolveTooltip()}
        />
        <ActionButtons visible={state === RouletteState.SHOT} onRerollClick={() => setState(RouletteState.SPIN)} onResetClick={resetRoulette}/>
      </div>
      <Roulette
        blank={controller.current.getItemSrc(blank)}
        bullet={controller.current.getItemSrc(bullet)}
        state={state}
        setState={setState}
        chooseBullet={true}
        onShoot={onShoot}
      />
      <img className='settingsButton' src={settingsGear} onClick={toggleSettingsOpen} alt=''></img>
      <WarningDialog visible={!playerOpen && playerOpen !== undefined} onRetryClick={checkPlayerOpen} onContinueClick={onContinueClick} />
      <Settings visible={settingsOpen} toggleVisibility={toggleSettingsOpen} bulletType={bulletType} setBulletType={setBulletType}/>
    </div>
  )
}

export default App
