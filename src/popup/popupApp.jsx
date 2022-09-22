import { useState } from 'react'
import { nanoid } from 'nanoid'

import logo from './assets/popupLogo.svg'
import closeIcon from './assets/closeIcon.svg'

import './popup.css'
import { NavigationList } from './navigationList/navigationList.jsx'
import { SelectAdd } from './selectAdd/selectAdd.jsx'
import { ManualAdd } from './manualAdd/manualAdd.jsx'

const PopupApp = () => {
  // eslint-disable-next-line no-unused-vars
  const [title, setTitle] = useState('')

  const list = [
    {
      id: nanoid(),
      title: 'Select Add',
      component: <SelectAdd />,
    },
    {
      id: nanoid(),
      title: 'Manual Add',
      component: <ManualAdd />,
    },
  ]

  //eslint-disable-next-line
  chrome.storage.local.get(['key'], (result) => {
    setTitle(result.key)
  })

  return (
    <div className='popup-container'>
      <div className='popup-header'>
        <img className='popup-logo' src={logo} alt='Popup Logo' />
        <button className='popup-close-button'>
          <img className='popup-close-icon' src={closeIcon} alt='Close icon' />
        </button>
      </div>
      <div className='popup-content'>
        <NavigationList navigationList={list} />
      </div>
    </div>
  )
}

export default PopupApp
