import React from 'react'
import './SettingToggle.css'

type SettingToggleProps = {
  value: boolean
  onToggle: () => void
}

const SettingToggle: React.FC<SettingToggleProps> = props => {
  return (
    <div className='switch'>
      <input
        id='cmn-toggle-1'
        className='cmn-toggle cmn-toggle-round'
        type='checkbox'
        defaultChecked={props.value}
        onChange={props.onToggle}
      />
      <label htmlFor='cmn-toggle-1'></label>
    </div>
  )
}

export default SettingToggle
