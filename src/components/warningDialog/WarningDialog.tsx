import React from 'react'
import './WarningDialog.css'
import warning from '../../images/warning.svg'

type WarningDialogProps = {
  visible: boolean
  onRetryClick: () => void
  onContinueClick: () => void
}

const WarningDialog: React.FC<WarningDialogProps> = props => {
  return (
    <div className={`warningDialog ${props.visible ? 'visible' : 'hidden'}`}>
      <img src={warning} alt={'Warning'}></img>
      <h2>Spotify not found</h2>
      <p>
        Make sure you have spotify open and press retry. If you
        continue no song will play.
      </p>
      <button className='retry' onClick={props.onRetryClick}>
        Retry
      </button>
      <button className='continue' onClick={props.onContinueClick}>continue</button>
    </div>
  )
}

export default WarningDialog
