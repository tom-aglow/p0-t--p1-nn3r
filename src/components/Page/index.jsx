import React from 'react'
import Menu from 'components/Menu'
import './styles.css'

const Page = props => (
  <div className="Page">
    <Menu />
    {props.children()}
  </div>
)

export default Page
