import React from 'react'
import './Settings.css'
import close from '../../images/close.svg'
import SettingChips from '../settingChips/SettingChips'
import SettingToggle from '../settingToggle/SettingToggle'
import { SettingOptions } from '../../types/SettingTypes'

type SettingsProps = {
  visible: boolean
  settings: SettingOptions
  setSettings: React.Dispatch<React.SetStateAction<SettingOptions>>
  toggleVisibility: () => void
}

const WarningDialog: React.FC<SettingsProps> = props => {
  const onSelectBulletType = (option: number) => {
    props.setSettings((settings: SettingOptions) => ({
      ...settings,
      bulletType: option
    }))
  }

  const onToggleRandomBullet = () => {
    props.setSettings((settings: SettingOptions) => ({
      ...settings,
      randomBullet: !settings.randomBullet
    }))
  }

  const onToggleDangerMode = () => {
    props.setSettings((settings: SettingOptions) => ({
      ...settings,
      dangerMode: !settings.dangerMode
    }))
  }

  return (
    <div
      className={`settingsContainer ${props.visible ? 'visible' : 'hidden'}`}
      onClick={props.toggleVisibility}
    >
      <div className='settingsDialog' onClick={e => e.stopPropagation()}>
        <h2>Settings</h2>
        <h3>Bullet Type</h3>
        <SettingChips
          selected={props.settings.bulletType}
          chips={['Songs', 'Albuns', 'Artists']}
          onSelect={onSelectBulletType}
        />
        <div className='row'>
          <h3 className={props.settings.dangerMode ? 'disabled' : ''}>
            Random Bullet
          </h3>
          <SettingToggle
            value={props.settings.randomBullet}
            onToggle={onToggleRandomBullet}
            disabled={props.settings.dangerMode}
          />
        </div>
        <div className='row'>
          <h3>Danger Mode</h3>
          <SettingToggle
            value={props.settings.dangerMode}
            onToggle={onToggleDangerMode}
            disabled={false}
          />
        </div>
        <div className='github'>
          <p>Source on GitHub</p>
          <a
          className='github-button'
          href='https://github.com/pipas/spotifyroulette'
          data-icon='octicon-star'
          aria-label='Star pipas/spotifyroulette on GitHub'
        >
          Star
        </a>
        </div>
        <img
          className='close'
          src={close}
          onClick={props.toggleVisibility}
          alt=''
        ></img>
      </div>
    </div>
  )
}

export default WarningDialog
