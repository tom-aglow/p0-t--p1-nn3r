import React from 'react'
import PropTypes from 'prop-types'
import withPlanContext from 'components/PlanPage/withPlanContext'
import './styles.css'

const Tile = withPlanContext(
  ({ children, className, options, plan: { onTileClick } }) => {
    const handleClick = () => {
      onTileClick(options)
    }

    return (
      <article
        className={`Tile ${className}`}
        onClick={handleClick}
        role="button"
      >
        {children()}
      </article>
    )
  },
)

Tile.propTypes = {
  children: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
}

export default Tile
