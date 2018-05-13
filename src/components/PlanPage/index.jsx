import React from 'react'
import Loader from './Loader'
import Day from './Day'
import './styles.css'

const PlanPage = props => {
  const { data } = props
  const hasData = Object.keys(data).length > 0

  const mapToDayComponent = day => (
    <Day posts={data[day].posts} stats={data[day].stats} key={day} day={day} />
  )

  const renderDays = () => Object.keys(data).map(mapToDayComponent)

  return <div className="PlanPage">{hasData ? renderDays() : <Loader />}</div>
}

export default PlanPage
