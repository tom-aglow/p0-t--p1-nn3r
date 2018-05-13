//  eslint-disable jsx-a11y/click-events-have-key-events
import React, { Component } from 'react'
import './styles.css'

class Menu extends Component {
  state = {
    isOpen: false,
  }

  handleTogglerClick = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }))
  }
  render() {
    const { isOpen } = this.state
    return (
      <div className={`Menu ${isOpen ? 'Menu-open' : ''}`}>
        <div
          className={`Menu__toggler ${isOpen ? 'Menu__toggler-open' : ''}`}
          onClick={this.handleTogglerClick}
          role="button"
          tabIndex="0"
        />
      </div>
    )
  }
}

export default Menu
