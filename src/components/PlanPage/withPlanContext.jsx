import React from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { Consumer } from './index'

function withPlanContext(Component) {
  function Wrapper(props, ref) {
    return (
      <Consumer>
        {plan => <Component {...props} plan={plan} ref={ref} />}
      </Consumer>
    )
  }
  Wrapper.displayName = `withPlanContext(${Component.displayName ||
    Component.name})`
  return hoistNonReactStatics(React.forwardRef(Wrapper), Component)
}

export default withPlanContext
