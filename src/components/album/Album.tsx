import React from 'react'
import './Album.css'

type AlbumProps = {
  img: string
}

const Album: React.FC<AlbumProps> = props => {
  return (
    <div className='album'>
      <img src={props.img} alt={''}></img>
    </div>
  )
}

export default Album
