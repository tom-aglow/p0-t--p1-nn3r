import React from 'react'
import PropTypes from 'prop-types'
import './styles.css'

const PieChart = ({ value, children }) => (
  <div className="PieChart">
    <svg viewBox="0 0 32 32" className="PieChart__chart">
      <circle r="16" cx="16" cy="16" strokeDasharray={`${value} 100`} />
    </svg>
    {children()}
  </div>
)

PieChart.defaultProps = {
  children: () => {},
}

PieChart.propTypes = {
  children: PropTypes.func,
  value: PropTypes.number.isRequired,
}

export default PieChart
