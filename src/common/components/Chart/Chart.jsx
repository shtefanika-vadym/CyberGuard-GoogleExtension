import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Progress } from 'antd'
import { nanoid } from 'nanoid'

import stepIcon from '../../assets/step.svg'
import completedStepIcon from '../../assets/completed-step-icon.svg'

import { DotLoader } from '../DotLoader/DotLoader'
import {
  HANDLE_COMPLETE_ANALYSIS_STEP,
} from '../../../store/store'

import './chart.css'
import 'antd/dist/antd.min.css'

export const Chart = () => {
  const dispatch = useDispatch()
  const [isFetching, setIsFetching] = useState(false)
  const { analysisSteps, result } = useSelector((state) => state)
  const completedSteps = analysisSteps.filter((step) => step.completed)

  useEffect(() => {
    if (result?.id) {
      dispatch(HANDLE_COMPLETE_ANALYSIS_STEP('Results'))
    }
  }, [result])

  // eslint-disable-next-line
  chrome.storage.local.get(['isFetching'], (result) => {
    if (result?.isFetching) setIsFetching(result.isFetching)
  })

  useEffect(() => {
    if (isFetching) dispatch(HANDLE_COMPLETE_ANALYSIS_STEP('Selected content'))
  }, [isFetching])

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
      <div className={`chart-content`}>
        <div className={`chart-pie ${completedSteps.length === 0 ? 'chart-content-start' : ''}`}>
          {completedSteps?.length === 0 ? (
            <button className='chart-pie-status chart-pie-start'>Start</button>
          ) : !result ? (
            <button
              className={`chart-pie-status ${
                completedSteps?.length === 3 ? 'chart-pie-analysis' : ''
              }`}>
              {getStepTitle()}
            </button>
          ) : (
            <Progress
              width={145}
              type='circle'
              strokeWidth={15}
              percent={result?.accuracy}
              format={() => (
                <div>
                  <a
                    style={{ color: result?.isFake ? '#EF4444' : '#10B981' }}
                    href={result?.url}
                    target={'_blank'}
                    rel={'noreferrer'}>
                    {result?.isFake ? 'Fake' : 'Real'}
                  </a>
                  <span className='chart-pie-label-result'>{result?.accuracy}% confidence</span>
                </div>
              )}
              strokeColor={result?.isFake ? '#EF4444' : '#10B981'}
            />
          )}
        </div>
        {completedSteps.length > 0 && (
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
        )}
      </div>
    </div>
  )
}
