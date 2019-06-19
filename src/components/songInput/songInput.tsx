import React, { useState, useEffect, useRef } from 'react'
import './SongInput.css'
import SearchLogo from '../../images/search.svg'
import Result from './searchResult/Result'

type onChange = (event: React.ChangeEvent<HTMLInputElement>) => void

const SongInput: React.FC = () => {
  const searchInput = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    if(searchInput.current) {
      searchInput.current.addEventListener('focus', () => setIsFocused(true))
      searchInput.current.addEventListener('focusout', () => setIsFocused(false))
    }
  })

  const onQueryChange: onChange = e => {
    setQuery(e.target.value)
  }

  const onPlayClick = () => {
    // if (query !== null && query !== '' && query.length > 3) {
    //   spotify.current.searchTrack(query).then(data => {
    //     if (data.tracks.items.length > 0) {
    //       setImg(data.tracks.items[0].album.images[0].url)
    //     }
    //   })
    // }
  }

  const results = [
    {
      title: "Sgt. Pepper's Lonely Hearts Club Band",
      artist: 'The Beatles',
      cover:
        'https://upload.wikimedia.org/wikipedia/en/5/50/Sgt._Pepper%27s_Lonely_Hearts_Club_Band.jpg'
    }
  ].map(track => <Result {...track} />)

  return (
    <div className='input'>
      <div className='searchBar'>
        <input
          type='text'
          ref={searchInput}
          value={query}
          onChange={onQueryChange}
          placeholder='Search'
        ></input>
        <button onClick={onPlayClick}>
          <img src={SearchLogo} alt=''></img>
        </button>
      </div>
      {(isFocused || query.length > 0) && <p className="tooltip">Search for a spotify song to get started.</p>}
      {(isFocused || query.length > 0) && <div className='results'>{results}</div>}
    </div>
  )
}

export default SongInput
