import React from 'react'
import PropTypes from 'prop-types'

import Menu from 'components/Menu'
import './styles.css'

const Page = props => (
  <div className="Page">
    <Menu />
    {props.children()}
  </div>
)

Page.propTypes = {
  children: PropTypes.func.isRequired,
}

export default Page
