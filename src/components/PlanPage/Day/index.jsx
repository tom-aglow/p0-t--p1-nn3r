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

const LIST_ITEM_DELETE_TIME = 500

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

  shouldComponentUpdate(nextProps) {
    if (this.props.posts === nextProps.posts) return false
    return true
  }

  onPostEntering = node => {
    setTimeout(() => {
      node.scrollIntoView({ behavior: 'smooth' })
      node.classList.add('tile-enter-custom')
    }, LIST_ITEM_DELETE_TIME)
  }

  mapToSlotOrPost = key => {
    const { type } = this.state.spots[key]
    const Element = type === 'slot' ? Slot : Post
    return (
      this.state.spots[key].time && (
        <CSSTransition
          key={key}
          timeout={LIST_ITEM_DELETE_TIME}
          classNames="tile"
          onEnter={this.onPostEntering}
        >
          <Element {...this.state.spots[key]} key={key} day={this.props.day} />
        </CSSTransition>
      )
    )
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
