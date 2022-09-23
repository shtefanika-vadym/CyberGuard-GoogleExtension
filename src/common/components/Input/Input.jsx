import inputIcon from '../../assets/input-icon-placeholder.svg'

import './input.css'

export const Input = ({ name, label, ...rest }) => {
  return (
    <>
      <label htmlFor={name} className='input-label'>
        {label}
      </label>
      <div className='input-container'>
        <div className='input-content'>
          <img cls src={inputIcon} alt='Input Icon' />
          <input className='input-content' id={name} {...rest} />
        </div>
      </div>
    </>
  )
}
