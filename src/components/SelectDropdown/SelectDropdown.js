import React from 'react'

export default function SelectDropdown({
  options,
  name,
  id,
  label,
  onChange,
  defaultValue,
}) {
  return (
    <div className="selectDropdown">
      {label && <label htmlFor={id}>{label}</label>}
      <select
        className="selectDropdown-select"
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
