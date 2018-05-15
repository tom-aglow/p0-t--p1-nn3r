import React, { Component } from 'react'
import Loader from './Loader'
import Day from './Day'
import './styles.css'

const { Provider, Consumer } = React.createContext()

class PlanPage extends Component {
  onTileClick = () => {
    console.log('doohh')
  }

  state = {
    context: {
      onTileClick: this.onTileClick,
    },
  }

  renderDays() {
    const { data } = this.props
    const mapToDayComponent = day => (
      <Day
        posts={data[day].posts}
        stats={data[day].stats}
        key={day}
        day={day}
      />
    )

    return Object.keys(data).map(mapToDayComponent)
  }

  render() {
    const { data } = this.props
    const { context } = this.state
    const hasData = Object.keys(data).length > 0

    return (
      <Provider value={context}>
        <div className="PlanPage">
          {hasData ? this.renderDays() : <Loader />}
        </div>
      </Provider>
    )
  }
}

export default PlanPage
export { Consumer }

// const PlanPage = props => {
//   const { data } = props
//   const hasData = Object.keys(data).length > 0
//
//   const mapToDayComponent = day => (
//     <Day posts={data[day].posts} stats={data[day].stats} key={day} day={day} />
//   )
//
//   const renderDays = () => Object.keys(data).map(mapToDayComponent)
//
//   return <div className="PlanPage">{hasData ? renderDays() : <Loader />}</div>
// }
