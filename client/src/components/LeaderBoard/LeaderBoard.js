import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Spinner from '../Spinner'

import RankElement from './RankElement';

import { getRanks } from '../../actions/rankAction'
 
class LeaderBoard extends Component {

    componentDidMount() {
        this.props.getRanks();
    }

  render() {

    const { ranks, loading } = this.props.ranks;

    let rankContent;

    if(ranks === null || loading) {
        rankContent = <Spinner/>
    } else{
        rankContent = <RankElement ranks={ranks} />
    }


    return (
        <div className="container">
        <div className="row">
                <div className="col-md-6 m-auto">
                    <div className="card">
                        <div className="card-header text-center">
                            <h4>Current Top Profiles...</h4>
                        </div>
                        <br/>
                        <div className="gaadiex-list m-auto">
                            {rankContent}
                            <hr/>
                            <button className="btn btn-outline-dark" ><Link to="/vote">Poll Now <i className="fas fa-angle-double-right"></i></Link></button>
                            <hr/>
                        </div>
                    </div>
                </div>
        </div>
    </div>
    )
  }
}

const mapStateToProps = state => ({
    ranks: state.ranks
});

export default connect(mapStateToProps, { getRanks })(LeaderBoard);