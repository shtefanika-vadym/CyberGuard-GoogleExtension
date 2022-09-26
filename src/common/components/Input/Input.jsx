import './input.css'

export const Input = ({ inputIcon, name, label, ...rest }) => {
  return (
    <>
      {label && (
        <label htmlFor={name} className='input-label'>
          {label}
        </label>
      )}
      <div className='input-container'>
        <div className='input-content'>
          {inputIcon && <img src={inputIcon} alt='Input Icon' />}
          <input className='input-content' id={name} {...rest} />
        </div>
      </div>
    </>
  )
}
