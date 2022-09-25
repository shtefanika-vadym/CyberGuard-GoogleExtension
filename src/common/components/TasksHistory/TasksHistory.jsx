import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import searchIcon from '../../assets/search-icon.svg'
import navigationIcon from '../../assets/navigation-icon.svg'

import { ActivityCard } from '../ActivityCard/ActivityCard'
import { FILTER_RECENT_ACTIVITY, RESET_CURRENT_RESULT } from '../../../store/store'

import './tasksHistory.css'

export const TasksHistory = ({ handleGoBack }) => {
  const dispatch = useDispatch()
  const [filterValue, setFilterValue] = useState('')
  const { recentActivity, result } = useSelector((state) => state)

  const [filteredActivity, setFilteredActivity] = useState([...recentActivity])

  const handleChangeFilterActivity = (filterEvent) => {
    setFilterValue(filterEvent.target.value)
    const filtered = [...recentActivity].filter((activity) =>
      activity.title.toLowerCase().includes(filterEvent.target.value.toLowerCase()),
    )
    setFilteredActivity(filtered)
  }

  const handleRemoveActivity = (activity) => {
    if (activity.id === result.id) dispatch(RESET_CURRENT_RESULT())
    dispatch(FILTER_RECENT_ACTIVITY(activity))
  }

  return (
    <div className='tasks'>
      <div className='tasks-header'>
        <button className='tasks-back' onClick={handleGoBack}>
          <img src={navigationIcon} alt='Back Icon' />
        </button>
        <span className='tasks-title'>Tasks History</span>
      </div>
      <div className='tasks-filter'>
        <img className='tasks-search-icon' src={searchIcon} alt='Search Icon' />
        <input type='text' value={filterValue} onChange={handleChangeFilterActivity} />
      </div>
      <div className='tasks-list'>
        {filteredActivity?.map((activity) => (
          <React.Fragment key={activity.id}>
            <ActivityCard activity={activity} handleRemoveActivity={handleRemoveActivity} />
          </React.Fragment>
        ))}
        {!filteredActivity.length && (
          <span className='tasks-list-empty'>No find task by {filterValue}</span>
        )}
      </div>
    </div>
  )
}
