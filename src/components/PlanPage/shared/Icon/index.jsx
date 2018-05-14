import React from 'react'
import PropTypes from 'prop-types'

const Icon = ({ svg, ...props }) => (
  <div dangerouslySetInnerHTML={{ __html: svg }} {...props} />
)

Icon.propTypes = {
  svg: PropTypes.node.isRequired,
}

export default Icon
