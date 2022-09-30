import navigationIcon from '../../assets/navigation-icon.svg'
import globalIcon from '../../assets/global-icon.svg'
import noteIcon from '../../assets/note-icon.svg'
import settingIcon from '../../assets/setting-icon.svg'

import './contentManager.css'

export const ContentManager = ({ handleSwitchTab }) => {
  const handleNavigateToWebsite = () => {
    window.open('https://cyberguard-frontend.herokuapp.com/', '_blank')
  }

  return (
    <div className='content-manager'>
      <div className='content-manager-item'>
        <div className='content-manager-item__content'>
          <img src={globalIcon} alt='Global Icon' />
          CyberGuard
        </div>
        <button onClick={handleNavigateToWebsite} className={'content-manager-item__button'}>
          <img src={navigationIcon} alt='Navigation Icon' />
        </button>
      </div>
      <span className='content-manager-line' />
      <div className='content-manager-item'>
        <div
          // style={{ opacity: !recentActivity.length ? 0.3 : 1 }}
          className='content-manager-item__content'>
          <img src={noteIcon} alt='Global Icon' />
          History
        </div>
        <button
          onClick={() => handleSwitchTab('Tasks History')}
          className={'content-manager-item__button'}>
          <img src={navigationIcon} alt='Navigation Icon' />
        </button>
      </div>
      <span className='content-manager-line' />
      <div className='content-manager-item'>
        <div className='content-manager-item__content'>
          <img src={settingIcon} alt='Global Icon' />
          Settings
        </div>
        <button
          onClick={() => handleSwitchTab('Settings')}
          className={'content-manager-item__button'}>
          <img src={navigationIcon} alt='Navigation Icon' />
        </button>
      </div>
    </div>
  )
}
