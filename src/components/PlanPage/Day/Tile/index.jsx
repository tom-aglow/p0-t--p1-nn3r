import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withPlanContext from 'components/PlanPage/withPlanContext'
import './styles.css'

class Tile extends Component {
  state = {
    modClass: '',
  }

  handleClick = () => {
    const {
      options,
      plan: { onTileClick },
    } = this.props
    onTileClick(options)
  }

  handleMouseLeave = () => {
    this.setState({ modClass: 'hover-end' }, () => {
      setTimeout(() => {
        this.setState({ modClass: '' })
      }, 500)
    })
  }

  handleMouseEnter = () => {
    this.setState({ modClass: '' })
  }

  render() {
    const { children, className } = this.props
    return (
      <article
        className={`Tile ${this.state.modClass} ${className}`}
        onClick={this.handleClick}
        onMouseLeave={this.handleMouseLeave}
        onMouseEnter={this.handleMouseEnter}
        role="button"
      >
        {children()}
      </article>
    )
  }
}

Tile.propTypes = {
  children: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  plan: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  options: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
}

export default withPlanContext(Tile)
