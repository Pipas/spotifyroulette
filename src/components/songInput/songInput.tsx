import React, { useState, useEffect, useRef, useCallback } from 'react'
import './SongInput.css'
import SearchLogo from '../../images/search.svg'
import Result from './searchResult/Result'
import { SearchResult } from '../../utils/ContextController'

type onChange = (event: React.ChangeEvent<HTMLInputElement>) => void

type SongInputProps = {
  results: SearchResult
  onSearch: (query: string) => void
  onResultClick: (position: number) => void
  locked: boolean
}

const SongInput: React.FC<SongInputProps> = props => {
  const searchInput = useRef<HTMLInputElement>(null)
  const [state, setState] = useState('')
  const [query, setQuery] = useState('')

  const updateSize = useCallback((focused: boolean) => {
    if (focused && query.length === 0) setState('focused')
    else if (focused || query.length > 0) setState('focused')
    else {
      setState('')
    }
  }, [query.length])

  const onSearchClick = useCallback(() => {
    if (query !== null && query !== '') {
      props.onSearch(query)
    }
  }, [query, props])

  const onResultClick = (position: number) => {
    setQuery('')
    props.onResultClick(position)
  }

  useEffect(() => {
    const input = searchInput.current;
    const focus = () => updateSize(true)
    const focusout = () => updateSize(false)
    const onKeypress = (e: KeyboardEvent) => {
      if (e.key === 'Enter') onSearchClick()
    }

    if (input !== null) {
      input.addEventListener('focus', focus)
      input.addEventListener('focusout', focusout)
      input.addEventListener('keypress', onKeypress)
    }

    return () => {
      if(input !== null) {
        input.removeEventListener('focus', focus)
        input.removeEventListener('focusout', focusout)
        input.removeEventListener('keypress', onKeypress)
      }
    }
  }, [onSearchClick, updateSize])

  useEffect(() => {
    if (props.locked) setState('')
  }, [props.locked])

  const onQueryChange: onChange = e => {
    setQuery(e.target.value)
  }

  const resultElements = props.results.map((result, i) => (
    <Result key={i} {...result} onClick={() => onResultClick(i)} />
  ))

  return (
    <div
      className={`input ${state}`}
      style={{
        height: `${88 +
          64 * props.results.length +
          (props.results.length ? 8 : 0)}px`
      }}
    >
      <div className='searchBar'>
        <input
          type='text'
          ref={searchInput}
          value={query}
          onChange={onQueryChange}
          placeholder='Search'
          disabled={props.locked}
        ></input>
        <button onClick={onSearchClick}>
          <img src={SearchLogo} alt=''></img>
        </button>
      </div>
      {!!props.results.length && (
        <div className='results'>{resultElements}</div>
      )}
    </div>
  )
}

export default SongInput
