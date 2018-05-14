import React from 'react'
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

const Day = ({ posts, stats, day: dayStr, slots }) => {
  const day = new Date(dayStr)

  const slotsObj = slots.reduce(reduceToSlotsObject, {})
  const newPostObj = getNewPostObj()
  const slotsAndPosts = { ...slotsObj, ...posts, ...newPostObj }

  const mapToSlotOrPost = key => {
    const Component = slotsAndPosts[key].type === 'slot' ? Slot : Post
    return <Component {...slotsAndPosts[key]} key={key} time={key} />
  }

  const renderPosts = () =>
    Object.keys(slotsAndPosts)
      .sort(sortStringsAsc)
      .map(mapToSlotOrPost)

  return (
    <section className="Day">
      <header className="Day__header">
        <h1 className="Day__title">
          {formatDay(day)}{' '}
          <span className="Day__dayname">{getWeekdayName(day)}</span>
        </h1>
        {stats && <Stats params={stats} />}
      </header>
      <div className="Day__content">{renderPosts()}</div>
    </section>
  )
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
