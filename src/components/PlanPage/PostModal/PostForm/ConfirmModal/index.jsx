import React, { Component } from 'react'
import Modal from 'components/PlanPage/shared/Modal'
import Button from 'components/PlanPage/shared/Button'
import './styles.css'

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
          onClose={this.props.onClose}
          label="Confirm Modal"
          className="ConfirmModal"
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
