import React from 'react'
import './ActionButtons.css'
import spin from '../../images/spin.svg'
import close from '../../images/close.svg'

type ActionButtonProps = {
  visible: boolean
  onRerollClick: () => void
  onResetClick: () => void
}

const ActionButtons: React.FC<ActionButtonProps> = props => {
  return (
    <div className={`actionButtonContainer ${props.visible ? 'visible' : ''}`}>
      <button className='actionButton' onClick={props.onResetClick} >
        <img src={close} alt=''></img>
      </button>
      <button className='actionButton' onClick={props.onRerollClick} >
        <img src={spin} alt=''></img>
      </button>
    </div>
  )
}

export default ActionButtons
