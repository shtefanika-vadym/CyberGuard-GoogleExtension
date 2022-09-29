import { useState } from 'react'
import axios from 'axios'
import { nanoid } from 'nanoid'
import { useDispatch } from 'react-redux'

import startIcon from '../../common/assets/start-icon.svg'
import inputIcon from '../../common/assets/input-icon-placeholder.svg'

import { Input } from '../../common/components/Input/Input'
import { Textarea } from '../../common/components/Textarea/Textarea'
import { SelectAdd } from '../selectAdd/selectAdd'

import {
  HANDLE_COMPLETE_ANALYSIS_STEP,
  RESET_CURRENT_RESULT,
  SET_CURRENT_TAB,
  SET_NEWS_RESULT,
  UPDATE_RECENT_ACTIVITY,
} from '../../store/store'

import './manualAdd.css'

export const ManualAdd = ({ handleSwitchTab }) => {
  const dispatch = useDispatch()
  const [articleData, setArticleData] = useState({
    title: '',
    content: '',
  })

  const handleChangeCurrentTab = (newActiveTab) => {
    dispatch(SET_CURRENT_TAB(newActiveTab))
  }

  // eslint-disable-next-line
  chrome.storage.local.get(['manualArticleData'], (result) => {
    if (result?.manualArticleData?.title) setArticleData(result?.manualArticleData)
  })

  const handleSubmitArticleData = (newData) => {
    const updatedData = { ...articleData, ...newData }
    setArticleData(updatedData)
    // eslint-disable-next-line
    chrome.storage.local.set({ manualArticleData: updatedData })
  }

  const handleStartAnalysis = () => {
    const fetchNews = async () => {
      let queryOptions = { active: true, lastFocusedWindow: true }
      // eslint-disable-next-line
      const [tab] = await chrome.tabs.query(queryOptions)
      const newsData = {
        url: tab?.url,
        title: articleData.title,
        content: articleData.content,
      }
      dispatch(RESET_CURRENT_RESULT())
      dispatch(HANDLE_COMPLETE_ANALYSIS_STEP('Select content'))
      handleChangeCurrentTab({
        id: nanoid(),
        title: 'Select Add',
        component: <SelectAdd handleSwitchTab={handleSwitchTab} />,
      })
      const response = await axios({
        method: 'POST',
        baseURL: 'https://cyberguard-api.herokuapp.com',
        url: '/articles',
        data: newsData,
      })
      if (response?.data) {
        const resultResponse = {
          ...newsData,
          ...response.data,
          id: nanoid(),
        }
        window.setTimeout(() => {
          dispatch(HANDLE_COMPLETE_ANALYSIS_STEP('Results'))
          dispatch(SET_NEWS_RESULT(resultResponse))
          dispatch(UPDATE_RECENT_ACTIVITY(resultResponse))
        }, 5000)
      }
    }
    fetchNews()
    setArticleData({
      title: '',
      content: '',
    })
    // eslint-disable-next-line
    chrome.storage.local.set({
      manualArticleData: {
        title: '',
        content: '',
      },
    })
  }

  return (
    <div className='manual-add-container'>
      <div className='manual-add-item'>
        <Input
          inputIcon={inputIcon}
          name='manual-add-title'
          placeholder='Title...'
          label='Article Title'
          value={articleData.title}
          onChange={(event) => handleSubmitArticleData({ title: event.target.value })}
        />
      </div>

      <div className='manual-add-item'>
        <Textarea
          name='manual-add-content'
          placeholder='Content...'
          label='Article Content'
          value={articleData.content}
          onChange={(event) => handleSubmitArticleData({ content: event.target.value })}
        />
      </div>
      <button onClick={handleStartAnalysis} className='manual-add-submit'>
        <img src={startIcon} alt='Start icon' />
        Start Analyses
      </button>
    </div>
  )
}
