import React from 'react'
import './Result.css'

type ResultProps = {
  title: string
  author: string
  src: string
  onClick: () => void
}

const Result: React.FC<ResultProps> = props => {
  return (
    <div className='result' onClick={props.onClick}>
      <img className='cover' src={props.src} alt={`${props.title} Album Cover`}></img>
      <div className='info'>
        <h2 className='title'>{props.title}</h2>
        <p className='artist'>{props.author}</p>
      </div>
    </div>
  )
}

export default Result
