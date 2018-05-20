import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Loader from './Loader'
import Day from './Day'
import PostModal from './PostModal'
import { isObjEmpty, reduceToNewDataState, sortStringsAsc } from './utils'

import './styles.css'

const { Provider, Consumer } = React.createContext(() => {
  throw new Error('PlanPage consumer cannot be rendered outside the provider')
})

class PlanPage extends Component {
  // eslint-disable-next-line react/sort-comp
  onTileClick = params => {
    this.setState(prevState => ({
      modalIsOpen: true,
      context: { ...prevState.context, selectedPost: params },
    }))
  }

  onPostUpdate = async params => {
    const { type, ...payload } = params
    this.setState({ modalIsOpen: false }, () => {
      this.setState(prevState =>
        reduceToNewDataState(prevState, { payload, type }),
      )
      this.setState(prevState => ({
        context: { ...prevState.context, updatedPost: payload },
      }))
    })
  }

  state = {
    context: {
      onTileClick: this.onTileClick,
      onPostUpdate: this.onPostUpdate,
      selectedPost: {},
      updatedPost: {},
      api: this.props.api,
    },
    modalIsOpen: false,
    data: {},
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (isObjEmpty(nextProps.data)) return null
    return {
      ...prevState,
      data: nextProps.data,
    }
  }

  handleModalClose = () => {
    this.setState({ modalIsOpen: false })
  }

  renderDays() {
    const { data } = this.state
    const mapToDayComponent = day => (
      <Day
        posts={data[day].posts}
        stats={data[day].stats}
        key={day}
        day={day}
      />
    )

    return Object.keys(data)
      .sort(sortStringsAsc)
      .map(mapToDayComponent)
  }

  render() {
    const { context, modalIsOpen, data } = this.state
    const hasData = !isObjEmpty(data)

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

PlanPage.propTypes = {
  api: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
}

export default PlanPage
export { Consumer }
