import React from 'react'
import Txt from 'components/Txt/Txt'

export default function (props) {
  return (
    <div className="textInput">
      <Txt
        className="textInput-label"
        htmlFor={props.id}
        content={props.label}
        tag="label"
        semibold
        color="Grey"
        size="14"
      />
      <input
        className="textInput-input"
        id={props.id}
        name={props.name}
        type={props.type || 'text'}
      />
    </div>
  )
}
