import React from 'react'
import './Settings.css'
import close from '../../images/close.svg'
import SettingChips from '../settingChips/SettingChips';

type SettingsProps = {
  visible: boolean
  bulletType: number
  setBulletType: (bullet: number) => void
  toggleVisibility: () => void
}

const WarningDialog: React.FC<SettingsProps> = props => {
  return (
    <div className={`settingsContainer ${props.visible ? 'visible' : 'hidden'}`} onClick={props.toggleVisibility}>
      <div className='settingsDialog' onClick={e => e.stopPropagation()}>
        <h2>Settings</h2>
        <h3>Bullet Type</h3>
        <SettingChips selected={props.bulletType} chips={['Songs', 'Albuns', 'Artists']} onSelect={props.setBulletType}/>
        <img className='close' src={close} onClick={props.toggleVisibility} alt=''></img>
      </div>
    </div>
  )
}

export default WarningDialog
