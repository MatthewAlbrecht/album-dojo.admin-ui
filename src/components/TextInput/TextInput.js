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
}) {
  const inputClasses = classnames(
    'textInput-input',
    icon && 'textInput-input_iconActive'
  )

  return (
    <div className="textInput">
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
