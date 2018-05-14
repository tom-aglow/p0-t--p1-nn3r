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
    tiles: {},
  }

  componentDidMount() {
    const { posts, slots } = this.props
    const slotsObj = slots.reduce(reduceToSlotsObject, {})
    const newPostObj = getNewPostObj()
    this.setState({ tiles: { ...slotsObj, ...posts, ...newPostObj } })
  }

  day = new Date(this.props.day)

  mapToSlotOrPost = key => {
    const Element = this.state.tiles[key].type === 'slot' ? Slot : Post
    return (
      <CSSTransition key={key} timeout={500} classNames="fade">
        <Element {...this.state.tiles[key]} key={key} time={key} />
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
    this.setState(prevState => ({ tiles: { ...prevState.tiles, ...foo } }))
  }

  removePost = () => {
    const [firstKey] = Object.keys(this.state.tiles).sort(sortStringsAsc)
    const newTiles = Object.keys(this.state.tiles).reduce((result, key) => {
      if (key !== firstKey) {
        result[key] = this.state.tiles[key]
      }
      return result
    }, {})
    console.log(newTiles)
    this.setState({ tiles: newTiles })
  }

  renderPosts() {
    return Object.keys(this.state.tiles)
      .sort(sortStringsAsc)
      .map(this.mapToSlotOrPost)
  }

  render() {
    const { stats } = this.props
    return (
      <section className="Day">
        <header className="Day__header">
          <h1 className="Day__title">
            {formatDay(this.day)}{' '}
            <span className="Day__dayname">{getWeekdayName(this.day)}</span>
          </h1>
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
