import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { FILTER_RECENT_ACTIVITY, RESET_CURRENT_RESULT } from '../../../store/store'

import './recentActivity.css'
import { ActivityCard } from '../ActivityCard/ActivityCard'

export const RecentActivity = () => {
  const dispatch = useDispatch()
  const { recentActivity, result } = useSelector((state) => state)

  if (!recentActivity?.length) return null

  const handleRemoveActivity = (activity) => {
    if (activity.id === result.id) dispatch(RESET_CURRENT_RESULT())
    dispatch(FILTER_RECENT_ACTIVITY(activity))
  }

  return (
    <div className='recent-activity'>
      <h2 className='recent-activity-title'>Recent activity</h2>
      <div className='recent-activity-list'>
        {recentActivity?.map((activity) => (
          <React.Fragment key={activity.id}>
            <ActivityCard activity={activity} handleRemoveActivity={handleRemoveActivity} />
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
