import React, { useState, useEffect } from 'react'
import ReactHowler from 'react-howler'
import './Roulette.css'
import roulette from '../../images/roulette.svg'
import RouletteAlbum from './RouletteAlbum'

type RouletteProps = {
  blank: string
  bullet: string
  state: string
  setState: React.Dispatch<React.SetStateAction<string>>
}

const Roulette: React.FC<RouletteProps> = props => {
  const [shot, setShot] = useState(-1)
  const [shotSound, setShotSound] = useState('')

  const albums = [
    props.blank,
    props.blank,
    props.blank,
    props.blank,
    props.blank,
    props.bullet
  ].map((src, i) => <RouletteAlbum key={i} src={src} position={i} shot={i === shot} />)

  useEffect(() => {
    if(props.state === 'load') {
      const randomShot = Math.floor(Math.random() * 6);
      document.documentElement.style.setProperty('--spin', `${randomShot}`)
      setTimeout(() => {
        props.setState('shot')
        setShot(randomShot)
        setShotSound(randomShot === 5 ? 'shot' : 'blank')
      }, 9500);
    }
  }, [props])

  return (
    <div className={`roulette ${props.state}`} style={props.state === 'shot' ? {transform: `rotate(calc(60deg * ${shot}))`} : {}}>
      {albums}
      <img src={roulette} alt=''></img>
      <ReactHowler src='/audio/load.mp3' playing={props.state === 'load'} />
      <ReactHowler src='/audio/blank.mp3' playing={shotSound === 'blank' && props.state === 'shot'} />
      <ReactHowler src='/audio/shot.mp3' playing={shotSound === 'shot' && props.state === 'shot'} />
    </div>
  )
}

export default Roulette
