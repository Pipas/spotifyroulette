import React, { useState, useEffect, useRef } from 'react'
import './SongInput.css'
import SearchLogo from '../../images/search.svg'
import Result from './searchResult/Result'
import { SearchResult } from '../../utils/ContextController'

type onChange = (event: React.ChangeEvent<HTMLInputElement>) => void

type SongInputProps = {
  results: SearchResult
  onSearch: (query: string) => void
  onResultClick: (position: number) => void
}

const SongInput: React.FC<SongInputProps> = props => {
  const searchInput = useRef<HTMLInputElement>(null)
  const [state, setState] = useState('')
  const [query, setQuery] = useState('')

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
      setState('')
    }
  }

  const onSearchClick = () => {
    if (query !== null && query !== '') {
      props.onSearch(query)
    }
  }

  const onQueryChange: onChange = e => {
    setQuery(e.target.value)
  }

  const resultElements = props.results.map((result, i) => (
    <Result key={i} {...result} onClick={() => props.onResultClick(i)} />
  ))

  return (
    <div className={`input ${state}`} style={{height: `${88 + (64 * props.results.length) + (props.results.length ? 8 : 0)}px`}}>
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
      {!!props.results.length && <div className='results'>{resultElements}</div>}
    </div>
  )
}

export default SongInput
