import './tasksHistory.css'

import navigationIcon from '../../assets/navigation-icon.svg'

export const TasksHistory = ({ handleGoBack }) => {
  return (
    <div className='tasks'>
      <div className='tasks-header'>
        <button className='tasks-back' onClick={handleGoBack}>
          <img src={navigationIcon} alt='Back Icon' />
        </button>
        <span className='tasks-title'>Tasks History</span>
      </div>
    </div>
  )
}
