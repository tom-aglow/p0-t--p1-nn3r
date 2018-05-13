import React from 'react'

import Stats from './Stats'
import { getWeekdayName, formatDay } from './utils'
import './styles.css'

const Day = ({ posts, stats, day: dayStr }) => {
  const day = new Date(dayStr)
  console.log(day)
  return (
    <section className="Day">
      <header className="Day__header">
        <h1 className="Day__title">
          {formatDay(day)}{' '}
          <span className="Day__dayname">{getWeekdayName(day)}</span>
        </h1>
        {stats && <Stats params={stats} />}
      </header>
      <article className="Post">{posts[0].text}</article>
      <article className="Post">{posts[1].text}</article>
    </section>
  )
}

export default Day
