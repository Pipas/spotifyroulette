import React from 'react'
import './ActionButton.css'

type ActionButtonProps = {
  src: string
  visible: boolean
}

const ActionButton: React.FC<ActionButtonProps> = props => {
  return (
    <button className={`actionButton ${props.visible ? 'visible' : ''}`}>
      <img src={props.src} alt=''></img>
    </button>
  )
}

export default ActionButton
