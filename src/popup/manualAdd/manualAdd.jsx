import './manualAdd.css'

export const ManualAdd = () => {
  return (
    <div className='manual-add-container'>
      <div className='manual-add-item'>
        <label className='manual-add-label' htmlFor='manual-add-title'>
          Article Title
        </label>
        <input id='manual-add-title' type='text' placeholder='Title...' />
      </div>

      <div className='manual-add-item'>
        <label className='manual-add-label' htmlFor='manual-add-description'>
          Article Content
        </label>
        <textarea
          name=''
          id='manual-add-description'
          cols='30'
          rows='10'
          placeholder='Content...'></textarea>
      </div>
      <button className='manual-add-submit'>Start Analyses</button>
    </div>
  )
}
