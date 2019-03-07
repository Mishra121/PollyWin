import React, { Component } from 'react'
import './Landing.css'
import { connect } from 'react-redux'
import { loginUser } from '../../actions/authActions';

import FacebookLogin from 'react-facebook-login';

class Landing extends Component {

    constructor() {
        super();

        this.state = {
            errors: {}
        }
    }


    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/leaderboard');
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated) {
            this.props.history.push('/leaderboard');
        }

        if(nextProps.errors) {
            this.setState({errors: nextProps})
        }
    }

  render() {
    
    const { errors } = this.state;

    const responseFacebook = (response) => {
        var {name, id, email} = response;

        this.props.loginUser({name, id, email});
    }

    return (
        <header className="masthead img-fluid">
            <div className="container h-100 ">
            <div className="row h-100">
                <div className="col-12 align-self-center">
                    <h1 className="font-weight-light">Vote To Win</h1>
                    <FacebookLogin
                        appId="552016471966082"
                        fields="name,email"
                        callback={responseFacebook} 
                    />  
                </div>
            </div>
            </div>
        </header>
    )
  }
}



const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, {loginUser})(Landing);