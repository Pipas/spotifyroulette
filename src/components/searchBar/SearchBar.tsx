import React, { useState, useEffect, useRef, useCallback } from 'react'
import './SearchBar.css'
import SearchLogo from '../../images/search.svg'
import settingsGear from '../../images/settings.svg'

type onChange = (event: React.ChangeEvent<HTMLInputElement>) => void

type SearchBarProps = {
  onSearch: (query: string) => void
  onQueryChange: () => void
  onSettingsClick: () => void
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
    if (e.target.value === '') props.onQueryChange()
  }

  return (
    <div className='buttonContainer'>
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
      <img
        className='settingsButton'
        src={settingsGear}
        onClick={props.onSettingsClick}
        alt=''
      ></img>
    </div>
  )
}

export default SearchBar
