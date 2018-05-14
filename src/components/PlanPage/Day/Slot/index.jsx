import React from 'react'
import PropTypes from 'prop-types'
import Icon from 'components/PlanPage/shared/Icon'

import icons from '../icons'
import { formatTime } from '../utils'
import './styles.css'

const Slot = ({ time, text }) => {
  const isNew = time === 'new'
  return (
    <div className="Slot __tile__">
      {!isNew && <p className="Slot__time">{formatTime(time)}</p>}
      <p className="Slot__text">{text}</p>
      <Icon className="Slot__icon" svg={icons.plus} />
    </div>
  )
}

Slot.propTypes = {
  time: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export default Slot
