import React, { useState, useEffect, useRef, useCallback } from 'react'
import './SongInput.css'
import SearchLogo from '../../images/search.svg'
import Result from './searchResult/Result'
import { SearchResult } from '../../utils/ContextController'

type onChange = (event: React.ChangeEvent<HTMLInputElement>) => void

type SongInputProps = {
  searchResult: SearchResult
  onSearch: (query: string) => void
  onResultClick: (position: number) => void
  locked: boolean
  tooltip: string
}

const SongInput: React.FC<SongInputProps> = props => {
  const searchInput = useRef<HTMLInputElement>(null)
  const [state, setState] = useState('')
  const [query, setQuery] = useState('')

  const updateSize = useCallback(
    (focused: boolean) => {
      if (focused && query.length === 0) setState('focused')
      else if (focused || query.length > 0) setState('focused')
      else {
        setState('')
      }
    },
    [query.length]
  )

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
    const input = searchInput.current
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
      if (input !== null) {
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

  const resultElements =
    props.searchResult.results.length === 0 ? (
      <div className='noResult'>
        <h2 className='title'>No result found.</h2>
      </div>
    ) : (
      props.searchResult.results.map((result, i) => (
        <Result key={i} {...result} onClick={() => onResultClick(i)} />
      ))
    )

  const calculateHeight = (): number => {
    if (props.searchResult.display) {
      if (props.searchResult.results.length === 0) return 144
      else return 88 + 64 * props.searchResult.results.length + 8
    }

    return 88
  }

  return (
    <div
      className={`input ${state}`}
      style={{
        height: `${calculateHeight()}px`
      }}
    >
      <div className='searchBar'>
        <input
          type='text'
          ref={searchInput}
          value={query}
          onChange={onQueryChange}
          placeholder={props.tooltip}
          disabled={props.locked}
        />
        <button onClick={onSearchClick}>
          <img src={SearchLogo} alt=''></img>
        </button>
      </div>
      {props.searchResult.display && (
        <div className='results'>{resultElements}</div>
      )}
    </div>
  )
}

export default SongInput
