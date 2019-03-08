import React, { Component } from 'react'
import imageBrand from '../../img/favicon-32x32.png';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

class Navbar extends Component {

  onLogoutClick(e) {
    e.preventDefault();

    this.props.logoutUser();
  }

  render() {

    const { isAuthenticated, user } = this.props.auth;

    const imageForProfile = (
      <img className="rounded-circle" 
        src={user.imageURL} 
        alt={user.name} 
        style={{width: '25px', marginRight: '5px'}}
      />
    )

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to='/leaderboard'>Leaderboard</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/vote">Vote Now</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/profile">
            {user.imageURL ? imageForProfile : ''}
            {user.name}
          </Link>
        </li>
        <li className="nav-item">
          <a  
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link" href="">
            Logout
          </a>
        </li>
      </ul>
    );

    return (
        <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="/"><img src={imageBrand} alt=""/> PollyWin</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              {isAuthenticated ? 
                authLinks : 
                (
                  <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <Link className="nav-link" to='/leaderboard'>Leaderboard</Link>
                    </li>
                  </ul>
                )
              }
            </div>
        </nav>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Navbar);