import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import { isInThePast } from 'components/PlanPage/utils'

import withPlanContext from 'components/PlanPage/withPlanContext'
import Checkbox from './Checkbox'
import ConfirmModal from './ConfirmModal'
import {
  renderHoursOptions,
  renderMinutesOptions,
  mapToCheckboxComponent,
  getHours,
  getMinutes,
  filterOut,
  getApiCallback,
} from './utils'
import './styles.css'

moment.updateLocale('en', {
  week: {
    dow: 1,
  },
})

class PostForm extends PureComponent {
  state = {
    date: moment(this.props.plan.selectedPost.day),
    media: this.props.plan.selectedPost.media || [],
    text: this.props.plan.selectedPost.text || '',
    hours: getHours(this.props.plan.selectedPost.time),
    minutes: getMinutes(this.props.plan.selectedPost.time),
    status: '',
  }

  isPast = isInThePast(
    this.props.plan.selectedPost.day,
    this.props.plan.selectedPost.time,
  )

  handleDateChange = date => {
    this.setState({ date })
  }

  handleDateChangeMobile = ({ target: { value } }) => {
    this.setState({ date: moment(value) })
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
    const type = this.props.plan.selectedPost.id ? 'update' : 'add'

    this.updatePostData(type, 'loading')
  }

  handleDeleteButtonClick = event => {
    event.preventDefault()
    this.setState({ status: 'confirming' })
  }

  handleConfirmModalClose = () => {
    this.setState({ status: '' })
  }

  handleDeleteConfirm = () => {
    this.updatePostData('delete', 'deleting')
  }

  updatePostData(type, status) {
    this.setState({ status }, async () => {
      const {
        onPostUpdate,
        selectedPost: { id },
        api,
      } = this.props.plan
      const time = `${this.state.hours}:${this.state.minutes}`
      const date = this.state.date.format('YYYY-MM-DD')
      const { text, media } = this.state
      const payload = {
        id,
        time,
        date,
        text,
        media,
      }

      await getApiCallback(api, type)(payload)

      this.setState({ status: '' })

      const prevDate = moment(this.props.plan.selectedPost.day).format(
        'YYYY-MM-DD',
      )

      onPostUpdate({
        ...payload,
        prevDate,
        type,
      })
    })
  }

  renderCheckboxes() {
    return this.props.allMedia.map(
      mapToCheckboxComponent({
        checkedMedia: this.state.media,
        Component: Checkbox,
        cb: this.handleCheckboxChange,
        disabled:
          this.isPast || ['loading', 'deleting'].includes(this.state.status),
      }),
    )
  }

  render() {
    const { date, text, status } = this.state
    const { type } = this.props.plan.selectedPost
    const disabled = this.isPast || ['loading', 'deleting'].includes(status)

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
            disabled={disabled}
          />
          <input
            type="date"
            className="PostForm__date_m"
            value={date.format('YYYY-MM-DD')}
            onChange={this.handleDateChangeMobile}
            disabled={disabled}
          />

          {/* time */}
          <div className="PostForm__time">
            <span>at</span>
            <select
              className="PostForm__hours"
              value={this.state.hours}
              onChange={this.handleInputChange}
              disabled={disabled}
            >
              {renderHoursOptions()}
            </select>

            <select
              className="PostForm__minutes"
              value={this.state.minutes}
              onChange={this.handleInputChange}
              disabled={disabled}
            >
              {renderMinutesOptions()}
            </select>

            <span className="PostForm__timezone">UTC+03:00</span>
          </div>
        </div>

        {/* social media and text */}
        <div className="PostForm__social">{this.renderCheckboxes()}</div>
        <textarea
          className="PostForm__text"
          value={text}
          onChange={this.handleInputChange}
          placeholder="Text and links"
          disabled={disabled}
          autoFocus
        />

        {/* buttons */}
        {!this.isPast && (
          <div className="PostForm__buttons">
            <button
              className={`PostForm__button-save ${
                status === 'loading' ? 'loading' : ''
              }`}
              onClick={this.handleSaveButtonClick}
              disabled={disabled}
            >
              {`${type === 'post' ? 'Edit' : 'Schedule'}`} Post<div className="bg" />
            </button>
            {type === 'post' && (
              <button
                className={`PostForm__button-delete  ${
                  status === 'deleting' ? 'loading' : ''
                }`}
                onClick={this.handleDeleteButtonClick}
                disabled={disabled}
              >
                Delete Post<div className="bg" />
              </button>
            )}
          </div>
        )}

        <ConfirmModal
          onClose={this.handleConfirmModalClose}
          onConfirm={this.handleDeleteConfirm}
          modalIsOpen={status === 'confirming'}
        />
      </form>
    )
  }
}

PostForm.defaultProps = {
  allMedia: ['facebook', 'instagram', 'googleplus', 'twitter'],
}

PostForm.propTypes = {
  allMedia: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  plan: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
}

export default withPlanContext(PostForm)
