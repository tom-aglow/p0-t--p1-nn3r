import React, { Component } from 'react'
import Modal from 'react-modal'
import './styles.css'

Modal.setAppElement('#root')

class ConfirmModal extends Component {
  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.modalIsOpen}
          onRequestClose={this.props.onClose}
          contentLabel="Post Modal"
          className="ConfirmModal"
          overlayClassName="ConfirmModal__Overlay"
        >
          <p className="ConfirmModal__text">
            Do you really want to delete this post?
          </p>
          <div className="ConfirmModal__buttons">
            <button
              className="ConfirmModal__button-cancel"
              onClick={this.props.onClose}
            >
              Cancel
            </button>
            <button
              className="ConfirmModal__button-confirm"
              onClick={this.props.onConfirm}
            >
              Delete
            </button>
          </div>
        </Modal>
      </div>
    )
  }
}

export default ConfirmModal
