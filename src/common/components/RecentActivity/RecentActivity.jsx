import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { FILTER_RECENT_ACTIVITY, RESET_CURRENT_RESULT } from '../../../store/store'

import './recentActivity.css'
import { ActivityCard } from '../ActivityCard/ActivityCard'

export const RecentActivity = () => {
  const dispatch = useDispatch()
  const [lastActivity, setLastActivity] = useState([])
  const { recentActivity, result } = useSelector((state) => state)

  const handleRemoveActivity = (activity) => {
    if (activity.id === result.id) dispatch(RESET_CURRENT_RESULT())
    dispatch(FILTER_RECENT_ACTIVITY(activity))
  }

  useEffect(() => {
    if (recentActivity.length <= 2) setLastActivity(recentActivity)
    else setLastActivity(recentActivity.slice(-2))
  }, [recentActivity])

  if (!recentActivity?.length) return null

  return (
    <div className='recent-activity'>
      <h2 className='recent-activity-title'>Recent activity</h2>
      <div className='recent-activity-list'>
        {lastActivity?.map((activity) => (
          <React.Fragment key={activity.id}>
            <ActivityCard activity={activity} handleRemoveActivity={handleRemoveActivity} />
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
