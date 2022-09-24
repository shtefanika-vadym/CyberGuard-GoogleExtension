import { useDispatch, useSelector } from 'react-redux'
// import { Progress } from 'antd'
import { nanoid } from 'nanoid'

import stepIcon from '../../assets/step.svg'
import completedStepIcon from '../../assets/completed-step-icon.svg'

import { HANDLE_COMPLETE_ANALYSIS_STEP } from '../../../store/store'

import './chart.css'
import 'antd/dist/antd.min.css'

export const Chart = () => {
  const dispatch = useDispatch()
  const { analysisSteps } = useSelector((state) => state)
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

  return (
    <div className='chart-container'>
      <div className='chart-pie'>
        {completedSteps.length === 0 ? (
          <button onClick={handleStartAnalysis} className='chart-pie-status chart-pie-start'>
            Start
          </button>
        ) : (
          <button className='chart-pie-status'>
            {analysisSteps[completedSteps.length].title}
          </button>
        )}
        {/*<Progress width={155} strokeWidth={15} strokeColor={'#10B981'} type='circle' percent={75} />*/}
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
  )
}
