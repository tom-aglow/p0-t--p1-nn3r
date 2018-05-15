import React, { Component } from 'react'
import Modal from 'react-modal'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'

import Icon from 'components/PlanPage/shared/Icon'
import './styles.css'

import icons from './icons'

moment.updateLocale('en', {
  week: {
    dow: 1,
  },
})

Modal.setAppElement('#root')

class PostModal extends Component {
  state = {
    date: moment(),
  }

  handleDateChange = date => {
    this.setState({ date })
  }

  closeModal = () => {
    this.props.onClose()
  }

  render() {
    const { date } = this.state
    return (
      <div>
        <Modal
          isOpen={this.props.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Post Modal"
          className="PostModal"
          overlayClassName="PostModal__Overlay"
        >
          {/* header */}
          <div className="PostModal__header">
            <p className="PostModal__title">New post</p>
            <Icon svg={icons.cross} onClick={this.closeModal} />
          </div>

          {/* form */}
          <form className="PostForm">
            {/* date & time */}
            <div className="PostForm__date-time">
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
              <span>UTC+03:00</span>
            </div>
            I am a modal
            <button type="submit">Schedule Post</button>
          </form>
        </Modal>
      </div>
    )
  }
}

export default PostModal
