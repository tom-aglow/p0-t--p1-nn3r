import React from 'react'
import PropTypes from 'prop-types'
import './styles.css'

const Button = ({ className, onClick, disabled, children }) => (
  <button
    className={`Button ${className}`}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
)

Button.defaultProps = {
  className: '',
  disabled: false,
}

Button.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
}

export default Button
