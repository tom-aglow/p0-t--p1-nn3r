import React from 'react'
import PropTypes from 'prop-types'
import Icon from 'components/PlanPage/shared/Icon'

import PieChart from './PieChart'
import icons from './icons'
import './styles.css'

const Stats = ({ params }) => {
  const mapToParamElement = key => (
    <div className="Stats__param" key={key}>
      <PieChart value={params[key].rate * 100}>
        {() => <Icon className="Stats__icon" svg={icons[key]} />}
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
