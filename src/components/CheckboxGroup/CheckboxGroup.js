import React from 'react'
import classnames from 'classnames'

import Checkbox from 'components/Checkbox/Checkbox'

const CheckboxGroup = ({
  name,
  label,
  className,
  options,
  defaultValue,
  value,
  disabled,
  strictDisable,
  numOfCol,
  handleChange,
}) => {
  const checkboxGroupClasses = classnames(
    'checkboxGroup',
    `checkboxGroup--${numOfCol}col`,
    className,
    { 'checkboxGroup--disabled': disabled }
  )
  const checkboxGroupContentClasses = classnames(
    'checkboxGroup-content',
    `checkboxGroup-content--${numOfCol}col`
  )
  console.log('value ==='.toUpperCase(), value)
  return (
    <fieldset className={checkboxGroupClasses}>
      {label && <label className="checkboxGroup-label">{label}</label>}
      <div className={checkboxGroupContentClasses}>
        {options &&
          options.map(option => (
            <Checkbox
              value={option.value}
              name={name}
              sectionName={name}
              label={option.label}
              key={option.value}
              disabled={disabled}
              strictDisable={strictDisable}
              defaultChecked={
                defaultValue && defaultValue.includes(option.value)
              }
              checked={value && value.includes(option.value)}
              handleChange={handleChange}
            ></Checkbox>
          ))}
      </div>
    </fieldset>
  )
}

export default CheckboxGroup
