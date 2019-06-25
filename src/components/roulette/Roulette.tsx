import React from 'react'
import ReactHowler from 'react-howler'
import './Roulette.css'
import roulette from '../../images/roulette.svg'
import RouletteAlbum from './RouletteAlbum'

type RouletteProps = {
  blank: string
  bullet: string
  state: string
}

const Roulette: React.FC<RouletteProps> = props => {
  const albums = [
    props.blank,
    props.blank,
    props.blank,
    props.blank,
    props.blank,
    props.bullet
  ].map((src, i) => <RouletteAlbum key={i} src={src} position={i} />)

  return (
    <div className={`roulette ${props.state}`}>
      {albums}
      <img src={roulette} alt=''></img>
      <ReactHowler src='/audio/load.mp3' playing={props.state === 'load'} />
    </div>
  )
}

export default Roulette
