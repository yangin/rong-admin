// React 事件和原生事件的执行顺序
import React from 'react'

class EventRunOrder extends React.Component {
  constructor (props) {
    super(props)
    this.parent = null
    this.child = null
  }

  componentDidMount () {
    this.parent.addEventListener('click', (e) => {
      console.log('dom parent')
    })

    this.child.addEventListener('click', (e) => {
      console.log('dom child')
    })

    document.addEventListener('click', (e) => {
      console.log('document')
    })
  }

  childClick = (e) => {
    console.log('react child')
  }

  parentClick = (e) => {
    console.log('react parent')
  }

  render () {
    return (
      <div ref={ref => this.parent = ref} onClick={this.parentClick}>
        <div ref={ref => this.child = ref} onClick={this.childClick}>
                    test3
        </div>
      </div>
    )
  }
}

export default EventRunOrder
