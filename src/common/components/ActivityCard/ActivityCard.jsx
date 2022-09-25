import removeIcon from '../../assets/remove-icon.svg'

import './activityCard.css'

export const ActivityCard = ({ activity, handleRemoveActivity }) => {
  return (
    <div className='activity-card'>
      <div className='activity-card-info'>
        <span
          style={{ color: activity.isFake ? '#EF4444' : '#10B981' }}
          className='activity-card-info-accuracy'>
          {activity.accuracy}% Confidence
        </span>
        <a
          href={activity.url}
          target={'_blank'}
          rel='noreferrer'
          className='activity-card-info-title'>
          {activity.title.substring(0, 20)} ...
        </a>
        <span
          className='activity-card-info-line'
          style={{ backgroundColor: activity?.isFake ? '#EF4444' : '#10B981' }}
        />
      </div>
      <div className='activity-card-info-button-manage'>
        <button
          onClick={() => handleRemoveActivity(activity)}
          className='activity-card-info-button'>
          <img src={removeIcon} alt='Remove Icon' />
        </button>
      </div>
    </div>
  )
}
