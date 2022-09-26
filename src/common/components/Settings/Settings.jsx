import { useEffect, useState } from 'react'

import navigationIcon from '../../assets/navigation-icon.svg'
import userIcon from '../../assets/user-icon.svg'
import saveIcon from '../../assets/save-icon.svg'

import { Switch } from '../Switch/Switch'
import { Input } from '../Input/Input'
import './settings.css'
import axios from 'axios'

export const Settings = ({ handleGoBack }) => {
  const [email, setEmail] = useState('')
  const [savedEmail, setSavedEmail] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [notification, setNotification] = useState({ email: false, weekly: false })

  const handleChangeEmail = (emailEvent) => {
    console.log(emailEvent.target.value)
    setEmail(emailEvent.target.value)
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) setEmailError(true)
    else setEmailError(false)
  }

  useEffect(() => {
    //eslint-disable-next-line
    chrome.storage.local.get(['email'], (result) => {
      if (!!result?.email?.length) {
        setEmail(result.email)
        setSavedEmail(result.email)
      }
    })
    //eslint-disable-next-line
    chrome.storage.local.get(['notification'], (result) => {
      if (result?.notification?.email) {
        setNotification(result.notification)
      }
    })
  }, [])

  const handleSaveNewEmail = async () => {
    if (!!savedEmail.length) {
      const response = await axios({
        method: 'PUT',
        baseURL: 'https://cyberguard-api.herokuapp.com',
        url: `/subscribers/${savedEmail}`,
        data: { newEmail: email },
      })
      if (response?.data?.message === 'Subscriber updated successfully') {
        setSavedEmail(email)
        //eslint-disable-next-line
        chrome.storage.local.set({ email: email })
      }
    } else {
      const response = await axios({
        method: 'POST',
        baseURL: 'https://cyberguard-api.herokuapp.com',
        url: '/subscribers',
        data: { email: email },
      })
      if (response?.data?.message === 'Subscribed successfully') {
        setSavedEmail(email)
        //eslint-disable-next-line
        chrome.storage.local.set({ email: email })
      }
    }
  }

  const getIsDisabledSaveButton = () => {
    switch (true) {
      case emailError:
        return true
      case savedEmail === email:
        return true
      default:
        return false
    }
  }

  const handleChangeNotification = (type) => {
    switch (type) {
      case 'email':
        setNotification({ ...notification, email: !notification.email })
        break
      case 'weekly':
        setNotification({ ...notification, weekly: !notification.weekly })
        break
      default:
        break
    }
  }

  useEffect(() => {
    //eslint-disable-next-line
    chrome.storage.local.set({ notification: notification })
  }, [notification])

  return (
    <div className='settings'>
      <div className='settings-header'>
        <button className='settings-back' onClick={handleGoBack}>
          <img src={navigationIcon} alt='Back Icon' />
        </button>
        <span className='settings-title'>Settings</span>
      </div>
      <div className='settings-update'>
        <div className='settings-email'>
          <Input
            inputIcon={userIcon}
            value={email}
            onChange={handleChangeEmail}
            placeholder={'Email...'}
            name='user Email'
            label={'Email'}
          />
          {emailError && <span className='email-error'>Please enter valid email</span>}
        </div>
        <button
          onClick={handleSaveNewEmail}
          disabled={getIsDisabledSaveButton()}
          className={`email-save-button ${getIsDisabledSaveButton() ? 'email-save-disabled' : ''}`}>
          <img src={saveIcon} alt='Save Icon' />
        </button>
      </div>

      <div className={`settings-profile`}>
        <div className='settings-item'>
          <span className={`settings-item-label ${!savedEmail.length ? 'disabled-settings' : ''}`}>
            Email Notification
          </span>
          <Switch
            name={'email'}
            checked={notification.email}
            handleChange={handleChangeNotification}
            disabled={!savedEmail.length}
          />
        </div>

        <div className='settings-item'>
          <span className={`settings-item-label ${!savedEmail.length ? 'disabled-settings' : ''}`}>
            Weekly newsletter
          </span>
          <Switch
            name={'weekly'}
            checked={notification.weekly}
            handleChange={handleChangeNotification}
            disabled={!savedEmail.length}
          />
        </div>
      </div>
    </div>
  )
}
