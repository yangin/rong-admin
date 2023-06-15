import React from 'react'

class Son extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    console.log('son constructor')
  }
  static getDerivedStateFromProps () {
    console.log('son getDerivedStateFromProps')
    return {}
  }
  componentWillUnmount () {
    console.log('son willUnmount')
  }

  componentDidMount () {
    console.log('son didMount')
  }
  shouldComponentUpdate () {
    console.log('son scu')
    return true
  }
  render () {
    console.log('son render')
    return <h3>son</h3>
  }
}

export default Son
