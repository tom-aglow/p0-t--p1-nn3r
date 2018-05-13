import React, { Component } from 'react'
import api from 'db/api'
import PlanPage from './index'

class PlanPageContainer extends Component {
  state = {
    data: {},
  }
  async componentDidMount() {
    const data = await api.getData()
    this.setState({ data })
  }
  render() {
    const { data } = this.state
    return <PlanPage data={data} />
  }
}

export default PlanPageContainer
