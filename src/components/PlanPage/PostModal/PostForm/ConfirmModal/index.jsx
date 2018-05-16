import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Modal from 'components/PlanPage/shared/Modal'
import Button from 'components/PlanPage/shared/Button'
import './styles.css'

class ConfirmModal extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.modalIsOpen !== nextProps.modalIsOpen) return true
    return false
  }

  render() {
    const { modalIsOpen, onClose, onConfirm } = this.props
    return (
      <div>
        <Modal
          isOpen={modalIsOpen}
          onClose={onClose}
          label="Confirm Modal"
          className="ConfirmModal"
        >
          <p className="ConfirmModal__text">
            Do you really want to delete this post?
          </p>
          <div className="ConfirmModal__buttons">
            <Button onClick={onClose}>Cancel</Button>
            <Button
              className="Button-red ConfirmModal__button-confirm"
              onClick={onConfirm}
            >
              Delete
            </Button>
          </div>
        </Modal>
      </div>
    )
  }
}

ConfirmModal.defaultProps = {
  modalIsOpen: false,
}

ConfirmModal.propTypes = {
  modalIsOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
}

export default ConfirmModal
