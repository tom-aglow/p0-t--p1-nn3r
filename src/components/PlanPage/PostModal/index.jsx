import React, { Component } from 'react'
import Modal from 'react-modal'

import Icon from 'components/PlanPage/shared/Icon'
import PostForm from './PostForm'
import './styles.css'

import icons from './icons'

Modal.setAppElement('#root')

class PostModal extends Component {
  closeModal = () => {
    this.props.onClose()
  }

  render() {
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
          <PostForm />
        </Modal>
      </div>
    )
  }
}

export default PostModal
