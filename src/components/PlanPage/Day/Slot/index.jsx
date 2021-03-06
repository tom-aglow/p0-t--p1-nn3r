import React from 'react'
import PropTypes from 'prop-types'
import Icon from 'components/PlanPage/shared/Icon'

import Tile from '../Tile'
import icons from '../icons'
import { formatTime } from '../utils'
import './styles.css'

const Slot = ({ time, text, day }) => {
  const isNew = time === 'new'
  const type = isNew ? 'new' : 'slot'

  const options = { type, time, day }

  return (
    <Tile className="Slot" options={options}>
      {() => (
        <div>
          {!isNew && <p className="Slot__time">{formatTime(time)}</p>}
          <p className="Slot__text">{text}</p>
          <Icon className="Slot__icon" svg={icons.plus} />
        </div>
      )}
    </Tile>
  )
}

Slot.propTypes = {
  time: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  day: PropTypes.string.isRequired,
}

export default Slot
