import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'

import Checkbox from './Checkbox'
import {
  renderHoursOptions,
  renderMinutesOptions,
  mapToCheckboxComponent,
} from './utils'
import './styles.css'

moment.updateLocale('en', {
  week: {
    dow: 1,
  },
})

class PostForm extends Component {
  state = {
    date: moment(),
    media: this.props.media,
  }

  handleDateChange = date => {
    this.setState({ date })
  }

  handleCheckboxChange = (media, state) => {
    console.log(media, state)
  }

  renderCheckboxes() {
    return this.props.allMedia.map(
      mapToCheckboxComponent({
        checkedMedia: this.state.media,
        Component: Checkbox,
        cb: this.handleCheckboxChange,
      }),
    )
  }

  render() {
    const { date } = this.state
    return (
      <form className="PostForm">
        {/* date & time */}
        <div className="PostForm__date-time">
          {/* date */}
          <label htmlFor="PostForm__date">When to publish: </label>
          <DatePicker
            id="PostForm__date"
            className="PostForm__date"
            selected={date}
            minDate={moment()}
            onChange={this.handleDateChange}
            dateFormat="MMM, DD, ddd"
          />
          <span>at</span>
          {/* time */}
          <select className="PostForm__hours">{renderHoursOptions()}</select>
          <select className="PostForm__minutes">
            {renderMinutesOptions()}
          </select>
          <span className="PostForm__timezone">UTC+03:00</span>
        </div>
        {/* social media */}
        <div className="PostForm__social">{this.renderCheckboxes()}</div>
        I am a modal
        <button type="submit">Schedule Post</button>
      </form>
    )
  }
}

PostForm.defaultProps = {
  allMedia: ['facebook', 'instagram', 'googleplus', 'twitter'],
  media: ['facebook', 'instagram'],
}

PostForm.propTypes = {
  allMedia: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  media: PropTypes.array, // eslint-disable-line react/forbid-prop-types
}

export default PostForm
