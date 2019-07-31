import React, { useState, useEffect, useRef } from 'react'
import { Howl } from 'howler'
import './Roulette.css'
import roulette from '../../images/roulette.svg'
import RouletteAlbum from './RouletteAlbum'
import { RouletteState } from '../app/App'
import { SpotifyItem } from '../../utils/ContextController'
import { root } from '../../utils/FileRoot'

enum LoadState {
  EMPTY = 'empty',
  HALF = 'half',
  FULL = 'full'
}

type RouletteProps = {
  blank: SpotifyItem | undefined
  bullet: SpotifyItem | undefined
  state: RouletteState
  setState: React.Dispatch<React.SetStateAction<RouletteState>>
  randomBullet: boolean
  onShoot: (isBullet: boolean) => void
}

const useSpinSound = (play: boolean) => {
  const loadSound = useRef<Howl>(
    new Howl({
      src: root + 'audio/spin.mp3'
    })
  )

  useEffect(() => {
    if (play) loadSound.current.play()
  }, [play])
}

const useLoadShots = (
  randomBullet: boolean
): [number, () => void, () => void] => {
  const [loadedShots, setLoadedShots] = useState(-1)

  useEffect(() => {
    setTimeout(() => {
      if (!randomBullet) {
        if (loadedShots >= 0 && loadedShots < 4) incrementShot()
        if (loadedShots === 5) incrementShot()
      } else {
        if (loadedShots >= 0 && loadedShots < 6) incrementShot()
      }
    }, 1500)
  }, [loadedShots, randomBullet])

  const incrementShot = (): void =>
    setLoadedShots(loadedShots => loadedShots + 1)

  const resetLoadShots = () => setLoadedShots(-1)

  return [loadedShots, incrementShot, resetLoadShots]
}

const Roulette: React.FC<RouletteProps> = props => {
  const [chosenShot, setChosenShot] = useState(-1)
  const [angle, setAngle] = useState(0)
  const [loadState, setLoadState] = useState(LoadState.EMPTY)
  const [loadedShots, loadShots, resetLoadShots] = useLoadShots(
    props.randomBullet
  )

  useSpinSound(props.state === RouletteState.SPINING)

  const albums = [
    props.blank,
    props.blank,
    props.blank,
    props.blank,
    props.blank,
    props.bullet
  ].map((item, i) => (
    <RouletteAlbum
      key={i}
      src={item !== undefined ? item.image : ''}
      position={i}
      shot={i === chosenShot && props.state === RouletteState.SHOOTING}
      load={i <= loadedShots}
      loading={i === loadedShots && props.state === RouletteState.LOADING}
    />
  ))

  // Loads shots and calls callback after waitTime
  const loadRoulette = (callback: () => void, waitTime: number): void => {
    loadShots()

    setTimeout(() => {
      callback()
    }, waitTime)

    props.setState(RouletteState.LOADING)
  }

  const resetRoulette = (): void => {
    setChosenShot(-1)
    setAngle(0)
    resetLoadShots()
    setLoadState(LoadState.EMPTY)
  }

  const setCSSPreviousAngle = (n: number) => {
    document.documentElement.style.setProperty('--previous', `${n}`)
  }

  useEffect(() => {
    if (props.state === RouletteState.LOAD) {
      if (!props.randomBullet) {
        if (loadState === LoadState.EMPTY) {
          loadRoulette(() => {
            setLoadState(LoadState.HALF)
            setAngle(5)
            props.setState(RouletteState.IDLE)
          }, 7500)
        } else if (loadState === LoadState.HALF) {
          loadRoulette(() => {
            props.setState(RouletteState.READY)
            setLoadState(LoadState.FULL)
            setCSSPreviousAngle(5)
          }, 500)
        } else {
          resetRoulette()
        }
      } else {
        resetRoulette()

        loadRoulette(() => {
          setAngle(5)
          props.setState(RouletteState.READY)
          setLoadState(LoadState.FULL)
          setCSSPreviousAngle(5)
        }, 8300)
      }
    } else if (
      props.state === RouletteState.SPIN &&
      loadState === LoadState.FULL
    ) {
      const randomShot = randomChosenShot()

      setTimeout(() => {
        setAngle(randomShot)
        props.setState(RouletteState.SHOOTING)
      }, 1700)

      props.setState(RouletteState.SPINING)
    } else if (props.state === RouletteState.SHOOTING) {
      setCSSPreviousAngle(chosenShot)
      props.onShoot(chosenShot === 5)
      props.setState(RouletteState.SHOT)
    } else if (props.state === RouletteState.RESET) {
      resetRoulette()
      props.setState(RouletteState.IDLE)
    }
  })

  const randomChosenShot = (): number => {
    const randomShot = Math.floor(Math.random() * 6)
    document.documentElement.style.setProperty('--next', `${randomShot}`)
    setChosenShot(randomShot)

    return randomShot
  }

  return (
    <div
      className={`roulette ${props.state} ${loadState}`}
      style={{ transform: `rotate(calc(60deg * ${angle}))` }}
    >
      {albums}
      <img src={roulette} alt=''></img>
    </div>
  )
}

export default Roulette
