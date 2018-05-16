import React, { Component } from 'react'
import Modal from 'react-modal'
import Button from '../Button'
import './styles.css'

Modal.setAppElement('#root')

class ConfirmModal extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.modalIsOpen !== nextProps.modalIsOpen) return true
    return false
  }

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
            <Button onClick={this.props.onClose}>Cancel</Button>
            <Button
              className="Button-red ConfirmModal__button-confirm"
              onClick={this.props.onConfirm}
            >
              Delete
            </Button>
          </div>
        </Modal>
      </div>
    )
  }
}

export default ConfirmModal
