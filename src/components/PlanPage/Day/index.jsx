import React, { Component } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import PropTypes from 'prop-types'

import Stats from './Stats'
import Post from './Post'
import Slot from './Slot'
import {
  getWeekdayName,
  formatDay,
  reduceToSlotsObject,
  sortStringsAsc,
  getNewPostObj,
} from './utils'
import './styles.css'

class Day extends Component {
  state = {
    spots: {},
  }

  componentDidMount() {
    const { posts, slots } = this.props
    const slotsObj = slots.reduce(reduceToSlotsObject, {})
    const newPostObj = getNewPostObj()
    this.setState({ spots: { ...slotsObj, ...posts, ...newPostObj } })
  }

  day = new Date(this.props.day)

  mapToSlotOrPost = key => {
    const Element = this.state.spots[key].type === 'slot' ? Slot : Post
    return (
      <CSSTransition key={key} timeout={500} classNames="fade">
        <Element {...this.state.spots[key]} key={key} time={key} />
      </CSSTransition>
    )
  }

  addPost = () => {
    const d = new Date()
    const foo = {
      [`${d.getHours()}:${d.getSeconds()}`]: {
        media: ['facebook', 'twitter'],
        text: 'Bazzz',
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
    const { stats } = this.props
    return (
      <section className="Day">
        <header className="Day__header">
          <div className="Day__title">
            <h1 className="Day__name">{formatDay(this.day)}</h1>
            <span className="Day__weekday">{getWeekdayName(this.day)}</span>
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
