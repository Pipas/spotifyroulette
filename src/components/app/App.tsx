import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Spotify } from '../../utils/Spoitfy'
import './App.css'
import SongInput from '../songInput/songInput'
import Roulette from '../roulette/Roulette'
import ActionButtons from '../actionButtons/ActionButtons'
import settingsGear from '../../images/settings.svg'
import { TrackController, SearchResult, SpotifyItem, AlbumController, ArtistController } from '../../utils/ContextController'
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
  const spotify = useRef(new Spotify(new TrackController()))
  const [state, setState] = useState(RouletteState.IDLE)
  const [bullet, setBullet] = useState<SpotifyItem>()
  const [blank, setBlank] = useState<SpotifyItem>()
  const [bulletType, setBulletType] = useState(BulletType.Songs)
  const [searchResult, setSearchResult] = useState<SearchResult>(new SearchResult(false, []))
  const [playerOpen, checkPlayerOpen, setPlayerOpen] = usePlayerOpen(spotify.current, state, setState)
  const [settingsOpen, toggleSettingsOpen] = useSettingsOpen()

  useEffect(() => {
    switch (bulletType) {
      case BulletType.Songs:
        spotify.current.setController(new TrackController())
        break;
      case BulletType.Albums:
        spotify.current.setController(new AlbumController())
        break;
      case BulletType.Artists:
        spotify.current.setController(new ArtistController())
        break;
      default:
        break;
    }
  }, [bulletType])

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

  const onSearch = (query: string): void => {
    spotify.current.search(query).then(
      result => setSearchResult(result)
    )
  }

  const onShoot = (isBullet: boolean): void => {
    spotify.current.play(isBullet ? bullet : blank)
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
          searchResult={searchResult}
          onSearch={onSearch}
          onResultClick={onResultClick}
          locked={state !== RouletteState.IDLE}
          tooltip={resolveTooltip()}
        />
        <ActionButtons visible={state === RouletteState.SHOT} onRerollClick={() => setState(RouletteState.SPIN)} onResetClick={resetRoulette}/>
      </div>
      <Roulette
        blank={blank}
        bullet={bullet}
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
