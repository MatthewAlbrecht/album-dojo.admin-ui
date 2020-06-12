import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

export default class Btn extends Component {
  get classes() {
    return (
      this.props.classes &&
      this.props.classes.split(' ').map(btnClass => `btn_${btnClass}`)
    )
  }

  get className() {
    const {
      pill,
      full,
      secondary,
      tertiary,
      loading,
      shadow,
      circle,
      small,
    } = this.props

    return classnames(
      'btn',
      this.classes,
      this.props.className,
      { btn_secondary: secondary },
      { btn_tertiary: tertiary },
      { btn_pill: pill },
      { btn_full: full },
      { btn_loading: loading },
      { btn_shadow: shadow },
      { btn_circle: circle },
      { btn_small: small }
    )
  }

  render() {
    const { content, disabled, onClick } = this.props

    return (
      <button className={this.className} disabled={disabled} onClick={onClick}>
        {content}
      </button>
    )
  }
}

Btn.propTypes = {
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  type: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
}
