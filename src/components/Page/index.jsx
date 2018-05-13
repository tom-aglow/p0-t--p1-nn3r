import React from 'react'
import Menu from 'components/Menu'

const Page = props => (
  <div>
    <Menu />
    {props.children()}
  </div>
)

export default Page
