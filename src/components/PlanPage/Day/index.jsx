import React, { Component } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import PropTypes from 'prop-types'
import { isInThePast } from 'components/PlanPage/utils'

import Stats from './Stats'
import Post from './Post'
import Slot from './Slot'
import {
  getWeekdayName,
  formatDay,
  reduceToSlotsObject,
  sortStringsAsc,
  getNewPostObj,
  reduceToTimeKey,
  isToday,
} from './utils'
import { isObjEmpty } from '../utils'
import './styles.css'

class Day extends Component {
  state = {
    spots: {},
  }

  static getDerivedStateFromProps(nextProps) {
    if (isObjEmpty(nextProps.posts) || nextProps.slots.length === 0) return null
    const { posts, slots, day } = nextProps
    const isPast = isInThePast(day)

    const postsRemapped = Object.keys(posts).reduce(reduceToTimeKey(posts), {})
    const slotsObj =
      !isPast || isToday(day) ? slots.reduce(reduceToSlotsObject(day), {}) : {}
    const newPostObj = !isPast || isToday(day) ? getNewPostObj() : {}
    return {
      spots: {
        ...slotsObj,
        ...postsRemapped,
        ...newPostObj,
      },
    }
  }

  mapToSlotOrPost = key => {
    const Element = this.state.spots[key].type === 'slot' ? Slot : Post
    return (
      this.state.spots[key].time && (
        <CSSTransition key={key} timeout={1000} classNames="tile">
          <Element {...this.state.spots[key]} key={key} day={this.props.day} />
        </CSSTransition>
      )
    )
  }

  addPost = () => {
    const d = new Date()
    const time = `${d.getHours()}:${d.getSeconds()}`
    const foo = {
      [time]: {
        media: ['facebook', 'twitter'],
        text: 'Bazzz',
        time,
        id: '12412',
      },
    }
    this.setState(prevState => ({ spots: { ...prevState.spots, ...foo } }))
  }

  removePost = () => {
    const [firstKey] = Object.keys(this.state.spots).sort(sortStringsAsc)
    const newTiles = Object.keys(this.state.spots).reduce((result, key) => {
      if (key !== firstKey) {
        result[key] = this.state.spots[key]
      }
      return result
    }, {})
    this.setState({ spots: newTiles })
  }

  renderPosts() {
    return Object.keys(this.state.spots)
      .sort(sortStringsAsc)
      .map(this.mapToSlotOrPost)
  }

  render() {
    const { stats, day } = this.props
    return (
      <section className="Day">
        <header className="Day__header">
          <div className="Day__title">
            <h1 className="Day__name">{formatDay(day)}</h1>
            <span className="Day__weekday">{getWeekdayName(day)}</span>
          </div>
          {stats && <Stats params={stats} />}
        </header>
        <TransitionGroup className="Day__content">
          {this.renderPosts()}
        </TransitionGroup>
        <button onClick={this.addPost}>add</button>
        <button onClick={this.removePost}>delete</button>
      </section>
    )
  }
}

Day.defaultProps = {
  stats: null,
  slots: ['10:00', '15:00', '19:00'],
  posts: null,
}

Day.propTypes = {
  day: PropTypes.string.isRequired,
  stats: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  slots: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  posts: PropTypes.object, // eslint-disable-line react/forbid-prop-types
}

export default Day
