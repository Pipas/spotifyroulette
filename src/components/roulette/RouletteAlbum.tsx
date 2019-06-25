import React from 'react'
import './Roulette.css'

type RouletteAlbumProps = {
  position: number
  src: string
}

const RouletteAlbum: React.FC<RouletteAlbumProps> = props => {
  return (
    <div className='album' style={{transform: `rotate(${-60 * props.position}deg)`}}>
      <img src={props.src} alt=""/>
    </div>
  )
}

export default RouletteAlbum
