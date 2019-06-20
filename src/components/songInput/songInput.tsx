import React, { useState, useEffect, useRef } from 'react'
import './SongInput.css'
import SearchLogo from '../../images/search.svg'
import Result from './searchResult/Result'
import { Spotify } from '../../utils/spoitfy'

type onChange = (event: React.ChangeEvent<HTMLInputElement>) => void

type SongInputProps = {
  spotify: Spotify
}

const SongInput: React.FC<SongInputProps> = props => {
  const searchInput = useRef<HTMLInputElement>(null)
  const [state, setState] = useState('')
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<
    { title: string; artist: string; cover: string }[]
  >([])

  useEffect(() => {
    if (searchInput.current) {
      searchInput.current.addEventListener('focus', () => updateSize(true))
      searchInput.current.addEventListener('focusout', () => updateSize(false))
    }
  })

  const updateSize = (focused: boolean) => {
    if (focused && query.length === 0) setState('focused')
    else if (focused || query.length > 0) setState('focused')
    else {
      setResults([])
      setState('')
    }
  }

  const onSearchClick = () => {
    if (query !== null && query !== '') {
      props.spotify.searchTrack(query).then(data => {
        if (data.tracks.items.length > 0) {
          setResults(
            data.tracks.items.slice(0, 3).map(item => ({
              title: item.name,
              artist: item.artists[0].name,
              cover: item.album.images[0].url
            }))
          )
        }
      })
    }
  }

  const onQueryChange: onChange = e => {
    setQuery(e.target.value)
  }

  const resultElements = results.map((result, i) => (
    <Result key={i} {...result} />
  ))

  return (
    <div className={`input ${state}`} style={{height: `${88 + (64 * results.length) + (results.length ? 8 : 0)}px`}}>
      <div className='searchBar'>
        <input
          type='text'
          ref={searchInput}
          value={query}
          onChange={onQueryChange}
          placeholder='Search'
        ></input>
        <button onClick={onSearchClick}>
          <img src={SearchLogo} alt=''></img>
        </button>
      </div>
      {!!results.length && <div className='results'>{resultElements}</div>}
    </div>
  )
}

export default SongInput
