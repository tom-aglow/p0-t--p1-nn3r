import React, { Component } from 'react'
import Modal from 'react-modal'
import './styles.css'

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
          <h2>Hello</h2>
          <button onClick={this.closeModal}>close</button>
          <div>I am a modal</div>
          <form>
            <input />
            <button>tab navigation</button>
            <button>stays</button>
            <button>inside</button>
            <button>the modal</button>
          </form>
        </Modal>
      </div>
    )
  }
}

export default PostModal
