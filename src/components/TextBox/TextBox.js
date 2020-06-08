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
  rows,
  cols,
  iconClasses,
  onChange,
  defaultValue,
  placeholder,
  col,
  colSpan,
  row,
}) {
  const inputClasses = classnames(
    'textBox-input',
    icon && 'textBox-input_iconActive'
  )
  const textBoxClasses = classnames(
    'textBox',
    col && colSpan && `gridItem--${col}span${colSpan}`,
    row && `gridItem--row${row}`
  )

  return (
    <div className={textBoxClasses}>
      {label && (
        <Txt
          className="textBox-label"
          htmlFor={id}
          content={label}
          tag="label"
          semibold
          color="Grey"
          size="14"
        />
      )}
      <div className="textBox-inputContainer">
        <textarea
          className={inputClasses}
          id={id}
          name={name}
          type={type || 'text'}
          onChange={onChange}
          placeholder={placeholder}
          defaultValue={defaultValue}
          rows={rows}
          cols={cols}
        />
        {icon && (
          <Icon
            type={icon}
            className="textBox-icon"
            classes={iconClasses}
          ></Icon>
        )}
      </div>
    </div>
  )
}
