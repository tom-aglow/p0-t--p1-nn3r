import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Icon from 'components/PlanPage/shared/Icon'
import withPlanContext from 'components/PlanPage/withPlanContext'

import Tile from '../Tile'
import { formatTime } from '../utils'
import icons from './icons'
import './styles.css'

class Post extends Component {
  state = { wasUpdated: false, wasAnimated: false }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.plan.updatedPost.date === nextProps.day &&
      nextProps.plan.updatedPost.time === nextProps.time &&
      !prevState.wasUpdated
    ) {
      return { ...prevState, wasUpdated: true }
    }

    if (prevState.wasUpdated && !prevState.wasAnimated) {
      return { ...prevState, wasAnimated: true }
    }

    return null
  }

  mapToIconElement = name => <Icon svg={icons[name]} key={name} />

  renderMediaIcon = () => this.props.media.map(this.mapToIconElement)

  render() {
    const { media, text, time, day, id } = this.props
    const { wasUpdated, wasAnimated } = this.state
    const options = {
      type: 'post',
      text,
      time,
      media,
      day,
      id,
    }

    return (
      <Tile
        className={`Post ${wasUpdated && !wasAnimated ? 'tile-update' : ''}`}
        options={options}
      >
        {() => (
          <div>
            <header className="Post__header">
              <span className="Post__time">{formatTime(time)}</span>
              <div className="Post__socialmedia">{this.renderMediaIcon()}</div>
            </header>
            <p>{text}</p>
          </div>
        )}
      </Tile>
    )
  }
}

Post.propTypes = {
  media: PropTypes.PropTypes.arrayOf(PropTypes.string).isRequired,
  time: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  day: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
}

export default withPlanContext(Post)
