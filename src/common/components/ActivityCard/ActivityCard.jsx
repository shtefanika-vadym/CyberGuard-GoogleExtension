import { Popover } from 'antd'

import removeIcon from '../../assets/remove-icon.svg'

import './activityCard.css'

export const ActivityCard = ({ activity, handleRemoveActivity, isDeleting }) => {
  return (
    <div className='activity-card'>
      <div className='activity-card-info'>
        <div
          className='activity-card-info-accuracy'
          style={{ color: activity.isFake ? '#EF4444' : '#10B981' }}>
          {activity.isFake ? 'FAKE' : 'REAL'}
          <span className='activity-card-info-message'>{activity.accuracy}% Confidence</span>
        </div>
        <Popover overlayClassName='popup-details' content={<span>{activity?.title}</span>}>
          <a
            href={activity.url}
            target={'_blank'}
            rel='noreferrer'
            className='activity-card-info-title'>
            {activity.title.substring(0, isDeleting ? 20 : 27)}...
          </a>
        </Popover>
        <span
          className='activity-card-info-line'
          style={{ backgroundColor: activity?.isFake ? '#EF4444' : '#10B981' }}
        />
      </div>
      {isDeleting && (
        <div className='activity-card-info-button-manage'>
          <button
            onClick={() => handleRemoveActivity(activity)}
            className='activity-card-info-button'>
            <img src={removeIcon} alt='Remove Icon' />
          </button>
        </div>
      )}
    </div>
  )
}
