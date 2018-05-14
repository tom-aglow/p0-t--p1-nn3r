import React from 'react'

import { formatTime } from '../utils'
import icons from './icons'
import './styles.css'

const Post = ({ media, text, time }) => {
  const mapToIconElement = name => (
    <div dangerouslySetInnerHTML={{ __html: icons[name] }} key={name} />
  )

  const renderMediaIcon = () => media.map(mapToIconElement)

  return (
    <article className="Post __tile__">
      <header className="Post__header">
        <span className="Post__time">{formatTime(time)}</span>
        <div className="Post__socialmedia">{renderMediaIcon()}</div>
      </header>
      <p>{text}</p>
    </article>
  )
}

export default Post
