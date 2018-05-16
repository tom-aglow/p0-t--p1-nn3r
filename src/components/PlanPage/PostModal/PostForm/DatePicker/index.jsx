import React from 'react'
import PropTypes from 'prop-types'
import ReactDatePicker from 'react-datepicker'
import moment from 'moment'
import './styles.css'

const DatePicker = ({ date, onChange, disabled }) => (
  <div>
    <ReactDatePicker
      id="PostForm__date"
      className="PostForm__date"
      selected={date}
      minDate={moment()}
      onChange={onChange}
      dateFormat="MMM, DD, ddd"
      disabled={disabled}
    />
    <input
      type="date"
      className="PostForm__date_m"
      value={date.format('YYYY-MM-DD')}
      onChange={onChange}
      disabled={disabled}
    />
  </div>
)

DatePicker.defaultProps = {
  disabled: false,
}

DatePicker.propTypes = {
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  date: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
}

export default DatePicker
