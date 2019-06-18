import React, { useEffect } from 'react'
import { Spotify } from '../../utils/spoitfy'
import './App.css'

const App: React.FC = () => {
  const spotify = new Spotify();

  useEffect(() => {
    if(!spotify.isAuthenticated())
      spotify.authenticateUser()
  })

  return (
    <div className='App'>
      <h1>test</h1>
    </div>
  )
}

export default App
