import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'

import Checkbox from './Checkbox'
import { renderHoursOptions, renderMinutesOptions } from './utils'
import facebookPath from './Checkbox/facebook.png'
import './styles.css'

moment.updateLocale('en', {
  week: {
    dow: 1,
  },
})

class PostForm extends Component {
  state = {
    date: moment(),
    media: ['facebook', 'instagram'],
  }

  handleDateChange = date => {
    this.setState({ date })
  }

  handleCheckboxChange = () => {
    console.log('hey')
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
        <div className="PostForm__social">
          <Checkbox
            media={this.state.media[0]}
            smPath={facebookPath}
            checked
            onChange={this.handleCheckboxChange}
          />
        </div>
        I am a modal
        <button type="submit">Schedule Post</button>
      </form>
    )
  }
}

export default PostForm
