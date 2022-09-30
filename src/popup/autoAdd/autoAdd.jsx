import { ContentManager } from '../../common/components/ContentManager/ContentManager'
import { Chart } from '../../common/components/Chart/Chart'
import { RecentActivity } from '../../common/components/RecentActivity/RecentActivity'
import { WebsiteRank } from '../websiteRank/WebsiteRank'

import './autoAdd.css'

export const AutoAdd = ({ handleChangeCurrentTab }) => {
  return (
    <div className='select-add'>
      <Chart />
      <RecentActivity />
      <WebsiteRank />
      <ContentManager handleSwitchTab={handleChangeCurrentTab} />
    </div>
  )
}
