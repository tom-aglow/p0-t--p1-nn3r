import React from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import './styles.css'

ReactModal.setAppElement('#root')

const Modal = ({ isOpen, onClose, children, label, className }) => (
  <div>
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel={label}
      className={`Modal ${className}`}
      overlayClassName="Modal__Overlay"
    >
      {children}
    </ReactModal>
  </div>
)

Modal.defaultProps = {
  className: '',
  label: 'Awesome Modal',
}

Modal.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
}

export default Modal
