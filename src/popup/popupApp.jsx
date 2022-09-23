import { useState } from 'react'
import { nanoid } from 'nanoid'

import logo from './assets/popupLogo.svg'
import closeIcon from './assets/closeIcon.svg'

import './popup.css'
import { NavigationList } from './navigationList/navigationList.jsx'
import { SelectAdd } from './selectAdd/selectAdd.jsx'
import { ManualAdd } from './manualAdd/manualAdd.jsx'
import { Settings } from '../common/components/Settings/Settings'
import { TasksHistory } from '../common/components/TasksHistory/TasksHistory'

const PopupApp = () => {
  // eslint-disable-next-line no-unused-vars
  const [title, setTitle] = useState('')
  const [currentTab, setCurrentTab] = useState(null)
  const [isStartedAnalysis, setIsStartedAnalysis] = useState(false)

  const handleStartAnalysis = () => {
    setIsStartedAnalysis(true)
  }

  const list = [
    {
      id: nanoid(),
      title: 'Select Add',
      component: (
        <SelectAdd
          handleSwitchTab={setCurrentTab}
          isStartedAnalysis={isStartedAnalysis}
          handleStartAnalysis={handleStartAnalysis}
        />
      ),
    },
    {
      id: nanoid(),
      title: 'Manual Add',
      component: <ManualAdd />,
    },
  ]

  const handleCloseExtension = () => {
    window.close()
  }

  const handleResetInfoTab = () => {
    setCurrentTab(null)
  }

  const getCurrentTab = () => {
    console.log(currentTab)
    switch (currentTab) {
      case 'Settings':
        return <Settings handleGoBack={handleResetInfoTab} />
      case 'Tasks History':
        return <TasksHistory handleGoBack={handleResetInfoTab} />
      default:
        return null
    }
  }

  //eslint-disable-next-line
  chrome.storage.local.get(['key'], (result) => {
    setTitle(result.key)
  })

  return (
    <div className='popup-container'>
      <div className='popup-header'>
        <img className='popup-logo' src={logo} alt='Popup Logo' />
        <button onClick={handleCloseExtension} className='popup-close-button'>
          <img className='popup-close-icon' src={closeIcon} alt='Close icon' />
        </button>
      </div>
      {!currentTab ? (
        <div className='popup-content'>
          <NavigationList navigationList={list} />
        </div>
      ) : (
        getCurrentTab()
      )}
    </div>
  )
}

export default PopupApp
