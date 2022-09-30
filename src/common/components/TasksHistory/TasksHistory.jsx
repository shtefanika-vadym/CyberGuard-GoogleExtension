import React, { useEffect, useState } from 'react'
import { Select } from 'antd'
import { Option } from 'antd/lib/mentions/index'

import searchIcon from '../../assets/search-icon.svg'
import navigationIcon from '../../assets/navigation-icon.svg'

import { ActivityCard } from '../ActivityCard/ActivityCard'
import { Input } from '../Input/Input'

import './tasksHistory.css'
import axios from 'axios'

export const TasksHistory = ({ handleGoBack }) => {
  const [filterValue, setFilterValue] = useState('')

  const [filteredActivity, setFilteredActivity] = useState([])
  const [copyFilteredActivity, setCopyFilteredActivity] = useState([])

  const handleChangeFilterActivity = (filterEvent) => {
    setFilterValue(filterEvent.target.value)
    const filtered = [...copyFilteredActivity].filter((activity) =>
      activity.title.toLowerCase().includes(filterEvent.target.value.toLowerCase()),
    )
    setFilteredActivity(filtered)
  }

  const handleRemoveActivity = (activity) => {
    const filtered = filteredActivity.filter((recentAct) => recentAct.id !== activity.id)
    setFilteredActivity(filtered)
  }

  useEffect(() => {
    const fetchRecentActivity = async () => {
      const response = await axios({
        method: 'GET',
        baseURL: 'https://cyberguard-api.herokuapp.com',
        url: '/articles/10',
      })
      if (Array.isArray(response?.data)) {
        console.log(response.data)
        setFilteredActivity(response.data)
        setCopyFilteredActivity(response.data)
      }
    }
    fetchRecentActivity()
  }, [])

  const handleSortNews = (type) => {
    switch (type) {
      case 'title':
        const filteredByTitle = [...copyFilteredActivity].sort((a, b) =>
          a.title.localeCompare(b.title),
        )
        setFilteredActivity(filteredByTitle)
        break
      case 'confidence':
        const filteredByConfidence = [...copyFilteredActivity].sort(
          (a, b) => Number(a?.isFake) - Number(b?.isFake),
        )
        setFilteredActivity(filteredByConfidence)
        break
      default:
        break
    }
  }

  return (
    <div className='tasks'>
      <div className='tasks-header'>
        <button className='tasks-back' onClick={handleGoBack}>
          <img src={navigationIcon} alt='Back Icon' />
        </button>
        <span className='tasks-title'>History</span>
      </div>
      <div className='tasks-sort'>
        <Input
          inputIcon={searchIcon}
          name={'Search'}
          placeholder={'Title...'}
          value={filterValue}
          onChange={handleChangeFilterActivity}
        />

        <div className='tasks-select'>
          <Select
            defaultValue='Sort by...'
            style={{ width: 120 }}
            popupClassName='popup-select'
            onChange={(sort) => handleSortNews(sort)}>
            <Option value='title'>Sort by title</Option>
            <Option value='confidence'>Sort by confidence</Option>
          </Select>
        </div>
      </div>

      <div className='tasks-list'>
        {filteredActivity?.map((activity) => (
          <React.Fragment key={activity.id}>
            <ActivityCard
              isDeleting={true}
              activity={activity}
              handleRemoveActivity={handleRemoveActivity}
            />
          </React.Fragment>
        ))}
        {!filteredActivity.length && !!copyFilteredActivity.length && (
          <span className='tasks-list-empty'>No find task by {filterValue}</span>
        )}
      </div>
    </div>
  )
}
