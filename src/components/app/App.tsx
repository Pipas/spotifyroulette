import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Spotify } from '../../utils/Spoitfy'
import './App.css'
import SearchBar from '../searchBar/SearchBar'
import Roulette from '../roulette/Roulette'
import ActionButtons from '../actionButtons/ActionButtons'
import {
  TrackController,
  SearchResult,
  SpotifyItem,
  AlbumController,
  ArtistController
} from '../../utils/ContextController'
import WarningDialog from '../warningDialog/WarningDialog'
import Settings from '../settings/Settings'
import Results from '../searchResults/Results'
import Title from '../title/Title'

export enum BulletType {
  Songs,
  Albums,
  Artists
}

export enum RouletteState {
  RESET = 'reset',
  IDLE = 'idle',
  LOAD = 'load',
  LOADING = 'loading',
  READY = 'ready',
  SPIN = 'spin',
  SPINING = 'spining',
  SHOOTING = 'shooting',
  SHOT = 'shot'
}

const useSettingsOpen = (): [boolean, () => void] => {
  const [settingsOpen, setSettingsOpen] = useState(false)

  const toggleSettings = () => {
    setSettingsOpen(!settingsOpen)
  }

  return [settingsOpen, toggleSettings]
}

const usePlayerOpen = (
  spotify: Spotify,
  state: RouletteState,
  setState: React.Dispatch<React.SetStateAction<RouletteState>>
): [boolean, () => void, React.Dispatch<any>] => {
  const [playerOpen, setPlayerOpen] = useState()

  const checkPlayerOpen = useCallback(
    () =>
      spotify.hasPlayerOpen().then(isOpen => {
        setPlayerOpen(isOpen)
      }),
    [spotify]
  )

  useEffect(() => {
    if (state === RouletteState.READY) {
      if (!playerOpen) checkPlayerOpen()
      else setState(RouletteState.SPIN)
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
  const [authenticated, setAuthenticated] = useState(false)
  const [searchResult, setSearchResult] = useState<SearchResult>(
    new SearchResult(false, [])
  )
  const [playerOpen, checkPlayerOpen, setPlayerOpen] = usePlayerOpen(
    spotify.current,
    state,
    setState
  )
  const [settingsOpen, toggleSettingsOpen] = useSettingsOpen()

  useEffect(() => {
    switch (bulletType) {
      case BulletType.Songs:
        spotify.current.setController(new TrackController())
        break
      case BulletType.Albums:
        spotify.current.setController(new AlbumController())
        break
      case BulletType.Artists:
        spotify.current.setController(new ArtistController())
        break
    }
  }, [bulletType])

  useEffect(() => {
    spotify.current.authenticateUser()
    setAuthenticated(spotify.current.isAuthenticated())
  }, [authenticated])

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
    spotify.current.search(query).then(result => setSearchResult(result))
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

  const resolveTooltip = (): string => {
    if (state === RouletteState.IDLE) {
      if (blank === undefined) {
        switch (bulletType) {
          case BulletType.Songs:
            return 'Search for a song to get started'
          case BulletType.Albums:
            return 'Search for an album to get started'
          case BulletType.Artists:
            return 'Search for an artist to get started'
        }
      } else return 'Search for the bullet!'
    } else if (state === RouletteState.LOADING) return 'Loading weapon...'
    else if (state === RouletteState.SHOT) return 'Choose an option'

    return ''
  }

  if (!authenticated) return null
  else
    return (
      <div className='app'>
        <Title />
        <div className='searchContainer'>
          <SearchBar
            onSearch={onSearch}
            onQueryChange={() => setSearchResult(new SearchResult(false, []))}
            onSettingsClick={toggleSettingsOpen}
            locked={state !== RouletteState.IDLE}
            tooltip={resolveTooltip()}
          />
          <Results searchResult={searchResult} onResultClick={onResultClick} />
          <ActionButtons
            visible={state === RouletteState.SHOT}
            onRerollClick={() => setState(RouletteState.SPIN)}
            onResetClick={resetRoulette}
          />
        </div>
        <Roulette
          blank={blank}
          bullet={bullet}
          state={state}
          setState={setState}
          chooseBullet={true}
          onShoot={onShoot}
        />
        <WarningDialog
          visible={!playerOpen && playerOpen !== undefined}
          onRetryClick={checkPlayerOpen}
          onContinueClick={onContinueClick}
        />
        <Settings
          visible={settingsOpen}
          toggleVisibility={toggleSettingsOpen}
          bulletType={bulletType}
          setBulletType={setBulletType}
        />
      </div>
    )
}

export default App
