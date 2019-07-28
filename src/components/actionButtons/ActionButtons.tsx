import React from 'react'
import './ActionButtons.css'
import reload from '../../images/reload.svg'
import reshoot from '../../images/reshoot.svg'

type ActionButtonProps = {
  visible: boolean
  onRerollClick: () => void
  onResetClick: () => void
}

const ActionButtons: React.FC<ActionButtonProps> = props => {
  return (
    <div className={`actionButtonContainer ${props.visible ? 'visible' : ''}`}>
      <button className='actionButton' onClick={props.onResetClick} >
        <img src={reload} alt=''></img>
        Reset Gun.
      </button>
      <button className='actionButton' onClick={props.onRerollClick} >
        <img src={reshoot} alt=''></img>
        Shoot again!
      </button>
    </div>
  )
}

export default ActionButtons
