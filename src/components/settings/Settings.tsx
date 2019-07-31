import React from 'react'
import './Settings.css'
import close from '../../images/close.svg'
import SettingChips from '../settingChips/SettingChips';
import SettingToggle from '../settingToggle/SettingToggle';

type SettingsProps = {
  visible: boolean
  bulletType: number
  randomBullet: boolean
  setBulletType: (bullet: number) => void
  setrandomBullet: (choose: boolean) => void
  toggleVisibility: () => void
}

const WarningDialog: React.FC<SettingsProps> = props => {
  return (
    <div className={`settingsContainer ${props.visible ? 'visible' : 'hidden'}`} onClick={props.toggleVisibility}>
      <div className='settingsDialog' onClick={e => e.stopPropagation()}>
        <h2>Settings</h2>
        <h3>Bullet Type</h3>
        <SettingChips selected={props.bulletType} chips={['Songs', 'Albuns', 'Artists']} onSelect={props.setBulletType}/>
        <div className='row'>
          <h3>Random Bullet</h3>
          <SettingToggle value={props.randomBullet} onToggle={() => props.setrandomBullet(!props.randomBullet)} />
        </div>
        <img className='close' src={close} onClick={props.toggleVisibility} alt=''></img>
      </div>
    </div>
  )
}

export default WarningDialog
