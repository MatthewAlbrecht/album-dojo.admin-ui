import React from 'react'
import cn from 'classnames'

import Txt from 'components/Txt/Txt'

export default function SelectDropdown({
  options,
  name,
  id,
  label,
  onChange,
  defaultValue,
  fullWidth,
  className,
}) {
  const elementClasses = cn('selectDropdown', className)
  const selectClasses = cn(
    'selectDropdown-select',
    fullWidth && 'selectDropdown-select--fullWidth'
  )
  return (
    <div className={elementClasses}>
      {label && (
        <Txt
          className="selectDropdown-label"
          htmlFor={id}
          content={label}
          tag="label"
          semibold
          color="Grey"
          size="14"
        />
      )}
      <select
        className={selectClasses}
        name={name}
        id={id}
        onChange={onChange}
        defaultValue={defaultValue}
      >
        {options.map((option, i) => (
          <option key={i} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
