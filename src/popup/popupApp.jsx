import { useState } from 'react'
import { nanoid } from 'nanoid'
import { useDispatch } from 'react-redux'

import logo from './assets/popupLogo.svg'
import closeIcon from './assets/closeIcon.svg'

import { NavigationList } from './navigationList/navigationList.jsx'
import { SelectAdd } from './selectAdd/selectAdd.jsx'
import { ManualAdd } from './manualAdd/manualAdd.jsx'
import { Settings } from '../common/components/Settings/Settings'
import { TasksHistory } from '../common/components/TasksHistory/TasksHistory'

import {
  SET_NEWS_TITLE,
  SET_RECENT_ACTIVITY,
  SET_COMPLETED_ANALYSIS_STEPS,
  HANDLE_COMPLETE_ANALYSIS_STEP,
  SET_NEWS_CONTENT,
  SET_NEWS_RESULT,
} from '../store/store'
import './popup.css'

const PopupApp = () => {
  const dispatch = useDispatch()
  const [currentTab, setCurrentTab] = useState(null)

  const list = [
    {
      id: nanoid(),
      title: 'Select Add',
      component: <SelectAdd handleSwitchTab={setCurrentTab} />,
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
    switch (currentTab) {
      case 'Settings':
        return <Settings handleGoBack={handleResetInfoTab} />
      case 'Tasks History':
        return <TasksHistory handleGoBack={handleResetInfoTab} />
      default:
        return null
    }
  }

  // eslint-disable-next-line
  chrome.storage.local.get(['analysisSteps'], (result) => {
    if (!!result.analysisSteps?.length) dispatch(SET_COMPLETED_ANALYSIS_STEPS(result.analysisSteps))
  })

  // eslint-disable-next-line
  chrome.storage.local.get(['recentActivity'], (result) => {
    console.log(result.recentActivity)
    if (!!result.recentActivity?.length) {
      dispatch(SET_RECENT_ACTIVITY(result.recentActivity))
    }
  })

  // eslint-disable-next-line
  chrome.storage.local.get(['title'], (result) => {
    if (!!result.title?.length) {
      dispatch(SET_NEWS_TITLE(result.title))
      dispatch(HANDLE_COMPLETE_ANALYSIS_STEP('Select title'))
    }
  })

  //eslint-disable-next-line
  chrome.storage.local.get(['content'], (result) => {
    if (!!result.content?.length) {
      dispatch(SET_NEWS_CONTENT(result.content))
      dispatch(HANDLE_COMPLETE_ANALYSIS_STEP('Select description'))
    }
  })

  //eslint-disable-next-line
  chrome.storage.local.get(['newsData'], (result) => {
    if (!!result.newsData?.id) {
      dispatch(SET_NEWS_RESULT(result.newsData))
    }
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
