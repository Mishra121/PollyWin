import React, { Component } from 'react'
import imageBrand from '../../img/favicon-32x32.png';

class Navbar extends Component {
  render() {
    return (
        <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="/"><img src={imageBrand} alt=""/> PollyWin</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <a className="nav-link" href="#">Vote Now</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">LeaderBoard</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Profile</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Logout</a>
                </li>
              </ul>
            </div>
        </nav>
    )
  }
}

export default Navbar;