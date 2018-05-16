import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import { isInThePast } from 'components/PlanPage/utils'

import withPlanContext from 'components/PlanPage/withPlanContext'
import Checkbox from './Checkbox'
import {
  renderHoursOptions,
  renderMinutesOptions,
  mapToCheckboxComponent,
  getHours,
  getMinutes,
  filterOut,
} from './utils'
import './styles.css'

moment.updateLocale('en', {
  week: {
    dow: 1,
  },
})

class PostForm extends Component {
  state = {
    date: moment(this.props.plan.selectedPost.day),
    media: this.props.plan.selectedPost.media || [],
    text: this.props.plan.selectedPost.text || '',
    hours: getHours(this.props.plan.selectedPost.time),
    minutes: getMinutes(this.props.plan.selectedPost.time),
  }

  isPast = isInThePast(
    this.props.plan.selectedPost.day,
    this.props.plan.selectedPost.time,
  )

  handleDateChange = date => {
    this.setState({ date })
  }

  handleCheckboxChange = (media, state) => {
    if (state) {
      this.setState(prevState => ({ media: [...prevState.media, media] }))
    } else {
      this.setState(prevState => ({
        media: prevState.media.filter(filterOut(media)),
      }))
    }
  }

  handleInputChange = event => {
    const inputName = event.target.className.split('__')[1]
    this.setState({ [inputName]: event.target.value })
  }

  handleSaveButtonClick = event => {
    event.preventDefault()
    const {
      selectedPost: { id },
    } = this.props.plan
    const type = id ? 'update' : 'add'
    this.updatePostData(type)
  }

  handleDeleteButtonClick = event => {
    event.preventDefault()
    this.updatePostData('delete')
  }

  updatePostData(type) {
    const {
      onPostUpdate,
      selectedPost: { id },
    } = this.props.plan
    const time = `${this.state.hours}:${this.state.minutes}`
    const prevDate = moment(this.props.plan.selectedPost.day).format(
      'YYYY-MM-DD',
    )
    const date = moment(this.state.date).format('YYYY-MM-DD')

    onPostUpdate({
      ...this.state,
      id,
      time,
      prevDate,
      type,
      date,
    })
  }

  renderCheckboxes() {
    return this.props.allMedia.map(
      mapToCheckboxComponent({
        checkedMedia: this.state.media,
        Component: Checkbox,
        cb: this.handleCheckboxChange,
        disabled: this.isPast,
      }),
    )
  }

  render() {
    const { date, text } = this.state
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
            type="date"
            disabled={this.isPast}
          />

          <span>at</span>

          {/* time */}
          <select
            className="PostForm__hours"
            value={this.state.hours}
            onChange={this.handleInputChange}
            disabled={this.isPast}
          >
            {renderHoursOptions()}
          </select>

          <select
            className="PostForm__minutes"
            value={this.state.minutes}
            onChange={this.handleInputChange}
            disabled={this.isPast}
          >
            {renderMinutesOptions()}
          </select>

          <span className="PostForm__timezone">UTC+03:00</span>
        </div>

        {/* social media and text */}
        <div className="PostForm__social">{this.renderCheckboxes()}</div>
        <textarea
          className="PostForm__text"
          value={text}
          onChange={this.handleInputChange}
          placeholder="Text and links"
          disabled={this.isPast}
        />

        {/* buttons */}
        {!this.isPast && (
          <div className="PostForm__buttons">
            <button
              className="PostForm__button-save"
              onClick={this.handleSaveButtonClick}
            >
              Schedule Post<div className="bg" />
            </button>
            <button
              className="PostForm__button-delete"
              onClick={this.handleDeleteButtonClick}
            >
              Delete Post
            </button>
          </div>
        )}
      </form>
    )
  }
}

PostForm.defaultProps = {
  allMedia: ['facebook', 'instagram', 'googleplus', 'twitter'],
}

PostForm.propTypes = {
  allMedia: PropTypes.array, // eslint-disable-line react/forbid-prop-types
}

export default withPlanContext(PostForm)
