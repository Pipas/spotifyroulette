import React from 'react'
import './PremiumWarning.css'
import warning from '../../images/warning.svg'

type PremiumWarningProps = {
  visible: boolean
}

const PremiumWarning: React.FC<PremiumWarningProps> = props => {
  return (
    <div className={`premiumWarning ${props.visible ? 'visible' : 'hidden'}`}>
      <img src={warning} alt={'Warning'}></img>
      <div>
        <h2>Spotify free version detected.</h2>
        <p>
          The website will still function but no songs will be played.
        </p>
      </div>
    </div>
  )
}

export default PremiumWarning
