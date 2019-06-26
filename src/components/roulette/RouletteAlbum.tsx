import React from 'react'
import './Roulette.css'

type RouletteAlbumProps = {
  position: number
  src: string
  shot: boolean
}

const RouletteAlbum: React.FC<RouletteAlbumProps> = props => {
  return (
    <div className='container' style={{transform: `rotate(${-60 * props.position}deg)`}}>
      <div className='cover'>
        <img className={props.shot ? 'shot' : ''} src={props.src} alt=""/>
      </div>
    </div>
  )
}

export default RouletteAlbum
