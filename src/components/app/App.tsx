import React, { useEffect, useState, useRef } from 'react'
import { Spotify } from '../../utils/spoitfy'
import './App.css'
import Album from '../album/Album'

type onChange = (event: React.ChangeEvent<HTMLInputElement>) => void

const App: React.FC = () => {
  const [query, setQuery] = useState('')
  const [img, setImg] = useState('')
  const spotify = useRef(new Spotify())
  
  useEffect(() => {
    if (!spotify.current.isAuthenticated()) spotify.current.authenticateUser()
  }, [])

  const onQueryChange: onChange = e => {
    setQuery(e.target.value)
  }

  const onPlayClick = () => {
    if (query !== null && query !== '' && query.length > 3) {
      spotify.current.searchTrack(query).then(data => {
        if (data.tracks.items.length > 0) {
          setImg(data.tracks.items[0].album.images[0].url)
        }
      })
    }
  }

  return (
    <div className='app'>
      <div className='input'>
        <input type='text' value={query} onChange={onQueryChange}></input>
        <button onClick={onPlayClick}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
          >
            <path d='M3 22v-20l18 10-18 10z' />
          </svg>
        </button>
      </div>
      <Album img={img} />
    </div>
  )
}

export default App
