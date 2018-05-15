import React, { Component } from 'react'
import Loader from './Loader'
import Day from './Day'
import PostModal from './PostModal'

import './styles.css'

const { Provider, Consumer } = React.createContext(() => {
  throw new Error('PlanPage consumer cannot be rendered outside the provider')
})

class PlanPage extends Component {
  // eslint-disable-next-line react/sort-comp
  onTileClick = params => {
    console.log('doohh', params)
    this.setState(prevState => ({
      modalIsOpen: true,
      context: { ...prevState.context, selectedPost: params },
    }))
  }

  state = {
    context: {
      onTileClick: this.onTileClick,
      selectedPost: {},
    },
    modalIsOpen: false,
  }

  handleModalClose = () => {
    this.setState({ modalIsOpen: false })
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
    const { context, modalIsOpen } = this.state
    const hasData = Object.keys(data).length > 0

    return (
      <Provider value={context}>
        <div className="PlanPage">
          {hasData ? this.renderDays() : <Loader />}
          <PostModal
            onClose={this.handleModalClose}
            modalIsOpen={modalIsOpen}
          />
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
