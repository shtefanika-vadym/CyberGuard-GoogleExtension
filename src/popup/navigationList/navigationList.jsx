import { useState } from 'react'

import './navigationList.css'

export const NavigationList = ({ navigationList }) => {
  const [activeTab, setActiveTab] = useState(navigationList[0])

  const handleChangeActiveTab = (newTab) => {
    setActiveTab(newTab)
  }

  return (
    <div className='navigation-list'>
      <div className='navigation-items'>
        {navigationList.map((navigationItem) => (
          <button
            key={navigationItem.id}
            className={`navigation-item ${
              navigationItem.title === activeTab.title ? 'navigation-active-item' : ''
            }`}
            onClick={() => handleChangeActiveTab(navigationItem)}>
            {navigationItem.title}
          </button>
        ))}
      </div>
      {activeTab?.component}
    </div>
  )
}
