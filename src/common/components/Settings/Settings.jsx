import { useState } from 'react'

import navigationIcon from '../../assets/navigation-icon.svg'
import userIcon from '../../assets/user-icon.svg'

import { Switch } from '../Switch/Switch'
import { Input } from '../Input/Input'
import './settings.css'

export const Settings = ({ handleGoBack }) => {
  const [email, setEmail] = useState()
  const handleChangeEmail = (emailEvent) => {
    setEmail(emailEvent.target.value)
  }

  const getIfUserEmailIsChanged = () => {
    return false
  }

  //eslint-disable-next-line
  chrome.storage.local.get(['email'], (result) => {
    if (!!result?.email.length) {
      setEmail(result.email)
    }
  })

  return (
    <div className='settings'>
      <div></div>
      <div className='settings-header'>
        <button className='settings-back' onClick={handleGoBack}>
          <img src={navigationIcon} alt='Back Icon' />
        </button>
        <span className='settings-title'>Settings</span>
      </div>
      <Input
        inputIcon={userIcon}
        value={email}
        onChange={handleChangeEmail}
        placeholder={'Email...'}
        name='user Email'
        label={'Email'}
      />
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
