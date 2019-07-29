import React from 'react'
import './Title.css'
import logo from '../../images/logo.png'

const Title: React.FC = () => {
  return (
    <div className='siteTitle'>
      <img src={logo} alt=''/>
      <div>
        <h1>Spotify</h1>
        <h1>Roulette</h1>
      </div>
    </div>
  )
}

export default Title
