import React from 'react'

import Stats from './Stats'
import Post from './Post'
import { getWeekdayName, formatDay } from './utils'
import './styles.css'

const Day = ({ posts, stats, day: dayStr }) => {
  const day = new Date(dayStr)

  const mapToPostComponent = key => (
    <Post {...posts[key]} key={key} time={key} />
  )

  const renderPosts = () => Object.keys(posts).map(mapToPostComponent)

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

export default Day
