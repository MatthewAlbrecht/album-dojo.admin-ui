import React from 'react'
import classnames from 'classnames'

const Checkbox = ({
  name,
  label,
  value,
  sectionName,
  className,
  checked,
  disabled,
  strictDisable,
  handleChange,
}) => {
  const checkboxClasses = classnames('checkbox', className, {
    'checkbox--disabled': disabled,
  })

  const labelClasses = classnames('checkbox-label')

  const id = sectionName ? `${sectionName}-${value}` : name

  return (
    <div className={checkboxClasses}>
      <input
        type="checkbox"
        name={name}
        id={id}
        value={value}
        className="checkbox-input"
        disabled={strictDisable || disabled}
        checked={checked}
        onChange={handleChange}
      />
      <label className={labelClasses} htmlFor={id}>
        {label}
      </label>
      <div className="checkbox-shadowInput"></div>
    </div>
  )
}

export default Checkbox
