import React, { Component } from 'react'

class Header extends Component {
  render() {
    return (
      <div>
        <a href="/auth/facebook">Login With facebook</a>
        <a href="/auth/logout">Logout</a>
      </div>
    )
  }
}

export default Header