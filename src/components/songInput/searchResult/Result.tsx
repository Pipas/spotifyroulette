import React from 'react'
import './Result.css'

type ResultProps = {
  title: string
  artist: string
  cover: string
}

const Result: React.FC<ResultProps> = props => {
  return (
    <div className='result'>
      <img className='cover' src={props.cover} alt={`${props.title} Album Cover`}></img>
      <div className='info'>
        <h2 className='title'>{props.title}</h2>
        <p className='artist'>{props.artist}</p>
      </div>
    </div>
  )
}

export default Result
