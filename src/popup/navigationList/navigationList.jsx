import { useEffect } from 'react'
import './navigationList.css'

export const NavigationList = ({ activeTab, setActiveTab, navigationList }) => {
  useEffect(() => {
    setActiveTab(navigationList[0])
  }, [])

  return (
    <div className='navigation-list'>
      <div className='navigation-items'>
        {navigationList.map((navigationItem) => (
          <button
            key={navigationItem?.id}
            className={`navigation-item ${
              navigationItem?.title === activeTab?.title ? 'navigation-active-item' : ''
            }`}
            onClick={() => setActiveTab(navigationItem)}>
            {navigationItem?.title}
          </button>
        ))}
      </div>
      {activeTab?.component}
    </div>
  )
}
