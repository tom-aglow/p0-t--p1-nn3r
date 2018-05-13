import React from 'react'
import Stats from './Stats'
import './styles.css'

const Day = ({ posts, stats, day }) => {
  console.log('hey')
  return (
    <section className="Day">
      <header className="Day__header">
        <h1 className="Day__title">
          Today <span className="Day__dayname">Friday</span>
        </h1>
        {stats && <Stats params={stats} />}
      </header>
      <article className="Post">{posts[0].text}</article>
      <article className="Post">{posts[1].text}</article>
    </section>
  )
}

export default Day
