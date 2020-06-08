import React from 'react'
import Txt from 'components/Txt/Txt'
import Icon from 'components/Icon/Icon'
import classnames from 'classnames'

export default function ({
  name,
  label,
  type,
  id,
  icon,
  iconClasses,
  onChange,
  defaultValue,
  placeholder,
  col,
  colSpan,
  row,
  required,
  pattern,
}) {
  const inputClasses = classnames(
    'textInput-input',
    icon && 'textInput-input_iconActive'
  )
  const textInputClasses = classnames(
    'textInput',
    col && colSpan && `gridItem--${col}span${colSpan}`,
    row && `gridItem--row${row}`
  )

  return (
    <div className={textInputClasses}>
      {label && (
        <Txt
          className="textInput-label"
          htmlFor={id}
          content={label}
          tag="label"
          semibold
          color="Grey"
          size="14"
        />
      )}
      <div className="textInput-inputContainer">
        <input
          className={inputClasses}
          id={id}
          name={name}
          type={type || 'text'}
          onChange={onChange}
          placeholder={placeholder}
          defaultValue={defaultValue}
          required={required}
          pattern={pattern}
        />
        {icon && (
          <Icon
            type={icon}
            className="textInput-icon"
            classes={iconClasses}
          ></Icon>
        )}
      </div>
    </div>
  )
}
