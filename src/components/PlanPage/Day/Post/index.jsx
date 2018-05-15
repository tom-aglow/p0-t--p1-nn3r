import React from 'react'
import PropTypes from 'prop-types'
import Icon from 'components/PlanPage/shared/Icon'

import Tile from '../Tile'
import { formatTime } from '../utils'
import icons from './icons'
import './styles.css'

const Post = ({ media, text, time, day }) => {
  const mapToIconElement = name => <Icon svg={icons[name]} key={name} />

  const renderMediaIcon = () => media.map(mapToIconElement)

  const options = {
    type: 'post',
    text,
    time,
    media,
    day,
  }

  return (
    <Tile className="Post" options={options}>
      {() => (
        <div>
          <header className="Post__header">
            <span className="Post__time">{formatTime(time)}</span>
            <div className="Post__socialmedia">{renderMediaIcon()}</div>
          </header>
          <p>{text}</p>
        </div>
      )}
    </Tile>
  )
}

Post.propTypes = {
  media: PropTypes.PropTypes.arrayOf(PropTypes.string).isRequired,
  time: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  day: PropTypes.string.isRequired,
}

export default Post
