import React from 'react'
import './Results.css'
import Result from '../searchResults/Result'
import { SearchResult } from '../../utils/ContextController'

type ResultsProps = {
  searchResult: SearchResult
  onResultClick: (position: number) => void
}

const Results: React.FC<ResultsProps> = props => {
  const onResultClick = (position: number) => {
    props.onResultClick(position)
  }

  const resultElements = props.searchResult.results.map((result, i) => (
    <Result key={Math.floor(Math.random() * 10000)} {...result} onClick={() => onResultClick(i)} />
  ))

  if (props.searchResult.display) {
    if (props.searchResult.results.length > 0)
      return <div className='results'>{resultElements}</div>
    else
      return (
        <div className='results'>
          <div className='noResult'>
            <h2 className='title'>No results found.</h2>
          </div>
        </div>
      )
  }
  return null
}

export default Results
