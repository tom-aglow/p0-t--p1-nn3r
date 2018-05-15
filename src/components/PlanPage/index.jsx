import React, { Component } from 'react'
import Loader from './Loader'
import Day from './Day'
import PostModal from './PostModal'
import { isObjEmpty } from './utils'

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

  onPostSave = async params => {
    console.log('woow', params)
    await this.props.updatePost(params)

    const date = params.date.format('YYYY-MM-DD')
    const prevDate = params.prevDate.format('YYYY-MM-DD')
    const { text, time, media } = params

    this.setState(prevState => ({
      data: {
        ...prevState.data,
        [prevDate]: {
          ...(prevState.data[prevDate] || {}),
          posts: {
            ...(prevState.data[prevDate] ? prevState.data[prevDate].posts : {}),
            [params.id]: {},
          },
        },
        [date]: {
          ...(prevState.data[date] || {}),
          posts: {
            ...(prevState.data[date] ? prevState.data[date].posts : {}),
            [params.id]: {
              text,
              time,
              media,
            },
          },
        },
      },
    }))
    this.setState({ modalIsOpen: false })
  }

  state = {
    context: {
      onTileClick: this.onTileClick,
      onPostSave: this.onPostSave,
      selectedPost: {},
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

    return Object.keys(data).map(mapToDayComponent)
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

export default PlanPage
export { Consumer }
