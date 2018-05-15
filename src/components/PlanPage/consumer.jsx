import React from 'react'
import PropTypes from 'prop-types'

import { Consumer } from './index'

function PlanPageConsumer(props) {
  return (
    <Consumer {...props}>
      {context => {
        if (!context) {
          throw new Error(
            'PlanPage consumer cannot be rendered outside the provider',
          )
        }
        return props.children(context)
      }}
    </Consumer>
  )
}

PlanPageConsumer.propTypes = {
  children: PropTypes.func.isRequired,
}

export default PlanPageConsumer
