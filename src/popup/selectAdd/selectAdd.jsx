import { ContentManager } from '../../common/components/ContentManager/ContentManager'
import { Chart } from '../../common/components/Chart/Chart'
import { RecentActivity } from '../../common/components/RecentActivity/RecentActivity'

import './selectAdd.css'

export const SelectAdd = ({ handleSwitchTab }) => {
  return (
    <div className='select-add'>
      <Chart />
      <RecentActivity />
      <ContentManager handleSwitchTab={handleSwitchTab} />
    </div>
  )
}
