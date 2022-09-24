import { ContentManager } from '../../common/components/ContentManager/ContentManager'
import { Chart } from '../../common/components/Chart/Chart'

import './selectAdd.css'

export const SelectAdd = ({ handleSwitchTab }) => {
  return (
    <div>
      <Chart />
      <div>
        <ContentManager handleSwitchTab={handleSwitchTab} />
      </div>
    </div>
  )
}
