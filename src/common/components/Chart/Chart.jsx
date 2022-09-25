import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Progress } from 'antd'
import { nanoid } from 'nanoid'
import { RedoOutlined, StopOutlined } from '@ant-design/icons'

import stepIcon from '../../assets/step.svg'
import completedStepIcon from '../../assets/completed-step-icon.svg'
// import inputIcon from '../../assets/input-icon-placeholder.svg'

import { DotLoader } from '../DotLoader/DotLoader'
import {
  HANDLE_COMPLETE_ANALYSIS_STEP,
  SET_NEWS_RESULT,
  UPDATE_RECENT_ACTIVITY,
  RESET_CURRENT_RESULT,
} from '../../../store/store'

import './chart.css'
import 'antd/dist/antd.min.css'

export const Chart = () => {
  const dispatch = useDispatch()
  const { analysisSteps, title, content, result } = useSelector((state) => state)
  const completedSteps = analysisSteps.filter((step) => step.completed)

  const handleStartAnalysis = () => {
    dispatch(HANDLE_COMPLETE_ANALYSIS_STEP('Analysis started'))
    // eslint-disable-next-line
    chrome.notifications.create(`my-notification-${nanoid()}`, {
      type: 'basic',
      iconUrl: 'logo(128x128).png',
      title: 'How to select title or description?',
      message: `Just click on it.`,
    })
  }

  const handleStartNewTask = () => {
    dispatch(RESET_CURRENT_RESULT())
  }

  useEffect(() => {
    if (completedSteps.length === 3) {
      const fetchNews = async () => {
        let queryOptions = { active: true, lastFocusedWindow: true }
        // eslint-disable-next-line
        const [tab] = await chrome.tabs.query(queryOptions)
        const newsData = {
          url: tab?.url,
          title: title,
          content: content,
        }
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
    }
  }, [completedSteps])

  const getStepTitle = () => {
    if (completedSteps.length === 3) {
      return (
        <div className='chart-status-analysis'>
          {analysisSteps[completedSteps.length]?.title}
          <DotLoader />
        </div>
      )
    }
    return analysisSteps[completedSteps.length]?.title
  }

  return (
    <div className='chart-container'>
      <div className='chart-content'>
        {completedSteps.length >= 1 && completedSteps.length !== analysisSteps.length && (
          <button className='stop-analysis' onClick={handleStartNewTask}>
            <StopOutlined />
          </button>
        )}
        {completedSteps.length === analysisSteps.length && (
          <button className='stop-analysis' onClick={handleStartNewTask}>
            <RedoOutlined />
          </button>
        )}
        <div className='chart-pie'>
          {completedSteps.length === 0 ? (
            <button onClick={handleStartAnalysis} className='chart-pie-status chart-pie-start'>
              Start
            </button>
          ) : !result ? (
            <button
              className={`chart-pie-status ${
                completedSteps.length === 3 ? 'chart-pie-analysis' : ''
              }`}>
              {getStepTitle()}
            </button>
          ) : (
            <Progress
              width={155}
              type='circle'
              strokeWidth={15}
              percent={result.accuracy}
              format={(percent) => (
                <div style={{ color: result?.isFake ? '#EF4444' : '#10B981' }}>
                  {percent}%<span className='chart-pie-label-result'>AI confidence</span>
                </div>
              )}
              strokeColor={result?.isFake ? '#EF4444' : '#10B981'}
            />
          )}
        </div>
        <div className='chart-status'>
          {analysisSteps.map((step, index) => (
            <div
              key={nanoid()}
              className={
                completedSteps.length !== 0 && index < completedSteps.length
                  ? 'chart-status-completed'
                  : 'chart-status-initial'
              }>
              <img
                className='chart-status-step-icon'
                src={
                  completedSteps.length !== 0 && index < completedSteps.length
                    ? completedStepIcon
                    : stepIcon
                }
                alt='Step Status Icon'
              />
              {step.title}
            </div>
          ))}
        </div>
      </div>
      <div>
        {/*{title && (*/}
        {/*  <div>*/}
        {/*    <img src={inputIcon} alt='Title Icon' />*/}
        {/*    <span>Title:</span> {title}*/}
        {/*  </div>*/}
        {/*)}*/}

        {/*<p>{content}</p>*/}
      </div>
    </div>
  )
}
