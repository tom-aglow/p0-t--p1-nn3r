import React from 'react'

import icons from '../icons'
import { formatTime } from '../utils'
import './styles.css'

const Slot = ({ time, text }) => (
  <div className="Slot __tile__">
    <p className="Slot__time">{formatTime(time)}</p>
    <p className="Slot__text">{text}</p>
    <div
      className="Slot__icon"
      dangerouslySetInnerHTML={{ __html: icons.plus }}
    />
  </div>
)

export default Slot
