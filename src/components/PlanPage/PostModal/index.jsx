import React, { Component } from 'react'

import Icon from 'components/PlanPage/shared/Icon'
import Modal from 'components/PlanPage/shared/Modal'
import PostForm from './PostForm'
import './styles.css'

import icons from './icons'

class PostModal extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.modalIsOpen !== nextProps.modalIsOpen) return true
    return false
  }

  closeModal = () => {
    this.props.onClose()
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.modalIsOpen}
          onClose={this.closeModal}
          label="Post Modal"
          className="PostModal"
        >
          {/* header */}
          <div className="PostModal__header">
            <p className="PostModal__title">New post</p>
            <Icon
              svg={icons.cross}
              onClick={this.closeModal}
              className="PostModal__btn-close"
            />
          </div>

          {/* form */}
          <PostForm />
        </Modal>
      </div>
    )
  }
}

export default PostModal
