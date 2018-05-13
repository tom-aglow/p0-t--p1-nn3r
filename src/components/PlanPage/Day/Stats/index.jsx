import React from 'react'
import PropTypes from 'prop-types'

import PieChart from './PieChart'
import seenIcon from './seen-icon'
import shareIcon from './share-icon'
import commentIcon from './comment-icon'
import likeIcon from './like-icon'
import './styles.css'

const icons = {
  seen: seenIcon,
  shares: shareIcon,
  comments: commentIcon,
  likes: likeIcon,
}

const Stats = ({ params }) => {
  const mapToParamElement = key => (
    <div className="Stats__param" key={key}>
      <PieChart value={params[key].rate * 100}>
        {() => (
          <span
            className="Stats__icon"
            dangerouslySetInnerHTML={{ __html: icons[key] }}
          />
        )}
      </PieChart>
      <div className="Stats__value">{params[key].value}</div>
    </div>
  )

  const renderParams = () => Object.keys(params).map(mapToParamElement)

  return <div className="Stats">{renderParams()}</div>
}

const StatParamType = PropTypes.shape({
  rate: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
})

Stats.propTypes = {
  params: PropTypes.shape({
    seen: StatParamType,
    shares: StatParamType,
    comments: StatParamType,
    likes: StatParamType,
  }).isRequired,
}

export default Stats
