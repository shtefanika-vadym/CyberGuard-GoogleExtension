import placeholderIcon from '../../assets/textarea-icon-placeholder.svg'

import './textarea.css'

export const Textarea = ({ name, label, ...rest }) => {
  return (
    <>
      <label className='textarea-label' htmlFor={name}>
        {label}
      </label>

      <div className='textarea-container'>
        <div className='textarea-content'>
          <img src={placeholderIcon} alt='Textarea icon' />
          <textarea name={name} id={name} cols='30' rows='10' {...rest}></textarea>
        </div>
      </div>
    </>
  )
}
