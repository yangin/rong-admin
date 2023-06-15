import React from 'react'
import Son from './Son'

class Parent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    console.log('parent constructor')
  }
  static getDerivedStateFromProps () {
    console.log('parent getDerivedStateFromProps')
    return {}
  }
  componentDidMount () {
    console.log('parent didMount')
  }
  componentWillUnmount () {
    console.log('parent willUnmount')
  }
  shouldComponentUpdate () {
    console.log('parent scu')
    return true
  }
  render () {
    console.log('parent render')
    return (<div>
      <h3>parent</h3>
      <Son></Son>
    </div>)
  }
}

export default Parent
