import React, { useState, useEffect, useRef, useCallback } from 'react'
import './SearchBar.css'
import SearchLogo from '../../images/search.svg'

type onChange = (event: React.ChangeEvent<HTMLInputElement>) => void

type SearchBarProps = {
  onSearch: (query: string) => void
  locked: boolean
  tooltip: string
}

const SearchBar: React.FC<SearchBarProps> = props => {
  const searchInput = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')

  const onSearchClick = useCallback(() => {
    if (query !== null && query !== '') {
      props.onSearch(query)
    }
  }, [query, props])

  useEffect(() => {
    const input = searchInput.current
    const onKeypress = (e: KeyboardEvent) => {
      if (e.key === 'Enter') onSearchClick()
    }

    if (input !== null) {
      input.addEventListener('keypress', onKeypress)
    }

    return () => {
      if (input !== null) {
        input.removeEventListener('keypress', onKeypress)
      }
    }
  }, [onSearchClick])

  useEffect(() => {
    if (props.locked) {
      setQuery('')
    } 
  }, [props.locked])

  const onQueryChange: onChange = e => {
    setQuery(e.target.value)
  }

  return (
    <div className='searchBar'>
      <button onClick={onSearchClick}>
        <img src={SearchLogo} alt=''></img>
      </button>
      <input
        type='text'
        ref={searchInput}
        value={query}
        onChange={onQueryChange}
        placeholder={props.tooltip}
        disabled={props.locked}
      />
    </div>
  )
}

export default SearchBar
