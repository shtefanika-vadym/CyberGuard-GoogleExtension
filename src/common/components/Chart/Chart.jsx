import { Progress } from 'antd'

import './chart.css'
import 'antd/dist/antd.min.css'

export const Chart = () => {
  return (
    <div className='chart-container'>
      <div className='chart-pie'>
        <Progress width={155} strokeWidth={15} strokeColor={'#10B981'} type='circle' percent={75} />
      </div>

      <div className='chart-status'>Content</div>
    </div>
  )
}
