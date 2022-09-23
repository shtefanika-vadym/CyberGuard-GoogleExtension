import navigationIcon from '../../assets/navigation-icon.svg'
import { Switch } from '../Switch/Switch'

import './settings.css'

export const Settings = ({ handleGoBack }) => {
  return (
    <div className='settings'>
      <div className='settings-header'>
        <button className='settings-back' onClick={handleGoBack}>
          <img src={navigationIcon} alt='Back Icon' />
        </button>
        <span className='settings-title'>Settings</span>
      </div>
      <div className='settings-profile'>
        <div className='settings-item'>
          <span className='settings-item-label'>Email Notification</span>
          <Switch />
        </div>

        <div className='settings-item'>
          <span className='settings-item-label'>Weekly newsletter</span>
          <Switch />
        </div>
      </div>
    </div>
  )
}
