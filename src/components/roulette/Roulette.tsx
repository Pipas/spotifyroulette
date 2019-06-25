import React from 'react'
import './Roulette.css'
import roulette from '../../images/roulette.svg'
import RouletteAlbum from './RouletteAlbum'

type RouletteProps = {
  blank: string
  bullet: string
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
    <div className='roulette load'>
      {albums}
      <img src={roulette} alt=''></img>
    </div>
  )
}

export default Roulette
