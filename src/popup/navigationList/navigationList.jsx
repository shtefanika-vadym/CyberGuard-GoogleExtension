import { useDispatch, useSelector } from 'react-redux'

import { SET_CURRENT_TAB } from '../../store/store'

import './navigationList.css'

export const NavigationList = ({ navigationList }) => {
  const dispatch = useDispatch()
  const { currentTab } = useSelector((state) => state)

  const handleChangeCurrentTab = (newActiveTab) => {
    dispatch(SET_CURRENT_TAB(newActiveTab))
  }

  return (
    <div className='navigation-list'>
      <div className='navigation-items'>
        {navigationList.map((navigationItem) => (
          <button
            key={navigationItem?.id}
            className={`navigation-item ${
              navigationItem?.title === currentTab?.title ? 'navigation-active-item' : ''
            }`}
            onClick={() => handleChangeCurrentTab(navigationItem)}>
            {currentTab?.title}
          </button>
        ))}
      </div>
      {currentTab?.component}
    </div>
  )
}
