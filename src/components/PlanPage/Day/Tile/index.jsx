import React from 'react'
import PropTypes from 'prop-types'
import Consumer from 'components/PlanPage/consumer'
import './styles.css'

const Tile = ({ children, className }) => {
  const handleClick = cb => () => {
    cb()
    console.log('hey')
  }

  return (
    <Consumer>
      {({ onTileClick }) => (
        <article
          className={`Tile ${className}`}
          onClick={handleClick(onTileClick)}
          role="button"
        >
          {children()}
        </article>
      )}
    </Consumer>
  )
}

Tile.propTypes = {
  children: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
}

export default Tile
