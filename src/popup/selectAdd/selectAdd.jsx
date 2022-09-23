import { ContentManager } from '../../common/components/ContentManager/ContentManager'
import { Chart } from '../../common/components/Chart/Chart'

import './selectAdd.css'

export const SelectAdd = ({ handleSwitchTab, handleStartAnalysis, isStartedAnalysis }) => {
  return (
    <div>
      <div>{!isStartedAnalysis ? <Chart /> : <span></span>}</div>
      <div>
        <ContentManager handleSwitchTab={handleSwitchTab} />
      </div>
    </div>
  )
}
