import React, { useRef, useEffect } from 'react'
import './Roulette.css'
import { Howl } from 'howler'

type RouletteAlbumProps = {
  position: number
  src: string
  shot: boolean
  load: boolean
  loading: boolean
}

const useLoadSound = (play: boolean) => {
  const loadSound = useRef<Howl>(
    new Howl({
      src: '/audio/load.mp3'
    })
  )

  useEffect(() => {
    if (play) loadSound.current.play()
  }, [play])
}

const useShootSound = (play: boolean, position: number) => {
  const shotSound = useRef<Howl>(
    new Howl({
      src: position === 5 ? '/spotifyroulette/audio/shot.mp3' : '/spotifyroulette/audio/blank.mp3'
    })
  )

  useEffect(() => {
    if (play) shotSound.current.play()
  }, [play])
}

const RouletteAlbum: React.FC<RouletteAlbumProps> = props => {
  useLoadSound(props.loading)
  useShootSound(props.shot, props.position)

  return (
    <div
      className='container'
      style={{ transform: `rotate(${-60 * props.position}deg)` }}
    >
      <div className={`cover ${props.load && 'load'}`}>
        <img className={props.shot ? 'shot' : ''} src={props.src} alt='' />
      </div>
    </div>
  )
}

export default RouletteAlbum
