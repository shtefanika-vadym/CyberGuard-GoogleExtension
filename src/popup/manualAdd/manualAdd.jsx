import startIcon from '../../common/assets/start-icon.svg'
import inputIcon from '../../common/assets/input-icon-placeholder.svg'

import { Input } from '../../common/components/Input/Input'
import { Textarea } from '../../common/components/Textarea/Textarea'

import './manualAdd.css'

import { useState } from 'react'

export const ManualAdd = () => {
  const [articleData, setArticleData] = useState({
    title: '',
    content: '',
  })

  const handleSubmitArticleData = (newData) => {
    setArticleData({ ...articleData, ...newData })
  }

  const handleStartAnalysis = () => {
    setArticleData({
      title: '',
      content: '',
    })
  }

  return (
    <div className='manual-add-container'>
      <div className='manual-add-item'>
        <Input
          inputIcon={inputIcon}
          name='manual-add-title'
          placeholder='Title...'
          label='Article Title'
          value={articleData.title}
          onChange={(event) => handleSubmitArticleData({ title: event.target.value })}
        />
      </div>

      <div className='manual-add-item'>
        <Textarea
          name='manual-add-content'
          placeholder='Content...'
          label='Article Content'
          value={articleData.content}
          onChange={(event) => handleSubmitArticleData({ content: event.target.value })}
        />
      </div>
      <button onClick={handleStartAnalysis} className='manual-add-submit'>
        <img src={startIcon} alt='Start icon' />
        Start Analyses
      </button>
    </div>
  )
}
