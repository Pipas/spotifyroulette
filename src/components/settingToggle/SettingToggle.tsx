import React from 'react'
import { useUID } from 'react-uid'
import './SettingToggle.css'

type SettingToggleProps = {
  value: boolean
  onToggle: () => void
  disabled: boolean
}

const SettingToggle: React.FC<SettingToggleProps> = props => {
  const id = useUID()

  return (
    <div className='switch'>
      <input
        id={id}
        className='cmn-toggle cmn-toggle-round'
        type='checkbox'
        defaultChecked={props.value}
        onChange={props.onToggle}
        disabled={props.disabled}
      />
      <label htmlFor={id}></label>
    </div>
  )
}

export default SettingToggle
