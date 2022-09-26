import './switch.css'

export const Switch = ({ disabled, name, handleChange, checked }) => {
  return (
    <label className='switch' htmlFor={name}>
      <input
        id={name}
        name={name}
        checked={checked}
        disabled={disabled}
        type='checkbox'
        onChange={() => handleChange(name)}
      />
      <span style={{ cursor: disabled ? 'not-allowed' : 'initial' }} className='slider round' />
    </label>
  )
}
