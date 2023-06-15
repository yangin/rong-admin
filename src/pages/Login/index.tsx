import React, { useState } from 'react'
import Parent from '../Parent'
import EventRunOrder from '../EventRunOrder'
import styles from './style.less'

// const Login = () => <div className={styles.container}>login</div>
// const Login = () => {
//   const [login, setLogin] = useState(true)

//   return (
//     <div className={styles.container} onClick={() => { setLogin(!login) }}>
//       {login ? <Parent/> : 'login'}
//     </div>
//   )
// }

const Login = () => (
  <div className={styles.container}>
    <EventRunOrder />
  </div>
)

export default Login
