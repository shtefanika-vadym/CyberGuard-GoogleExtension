import { useSelector } from 'react-redux'

import './recentActivity.css'
import { ActivityCard } from '../ActivityCard/ActivityCard'

export const RecentActivity = () => {
  const { result } = useSelector((state) => state)
  if (!result) return null

  return (
    <div className='recent-activity'>
      <h2 className='recent-activity-title'>Last activity</h2>
      <div className='recent-activity-list'>
        <ActivityCard isDeleting={false} activity={result} handleRemoveActivity={() => {}} />
      </div>
    </div>
  )
}
