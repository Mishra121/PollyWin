import React, { Component } from 'react'
import { connect } from 'react-redux';

import { randUser, likeUser, dislikeUser } from '../../actions/rankAction';
 
class Random extends Component {

    constructor(props) {
        super(props);

        this.handleDislike = this.handleDislike.bind(this);
        this.handleLike = this.handleLike.bind(this);
    }

    componentDidMount() {
        this.props.randUser();
    }

    handleLike() {

        const { random } = this.props.ranks;

        var id = random.randUser.id;

        this.props.likeUser(id);
    }

    handleDislike() {

        const { random } = this.props.ranks;

        var id = random.randUser.id;
        
        this.props.dislikeUser(id);
    }

  render() {

    var contentName = <h1 className="display-5 text-center"></h1>
    var contentInfo = <p className="lead"></p>
    var contentImage = <img className="img-thumbnail rounded" src="http://www.free-icons-download.net/images/commercial-male-user-icon-32765.png"/>;

    const { random } = this.props.ranks;
    //id name info imageURL
    if(random){
        
        if(random.randUser.info){
            var contentInfo = <p className="lead"> {random.randUser.info} </p>
        }

        if(random.randUser.imageURL) {
            var contentImage = <img className="img-thumbnail rounded" src={random.randUser.imageURL}/>
        }
        
        if(random.randUser.name) {
            var contentName = <h1 className="display-5 text-center">{random.randUser.name}</h1>
        }
    }

      
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4  m-auto">
                    <div className="card card-body bg-primary  mt-3 m-auto">
                        {contentImage}
                        <div className="text-center text-white">
                            <br/>
                            {contentName}
                        </div>

                        <div className="buttonslikedislike m-auto">
                            <button onClick={this.handleLike} className="btn btn-lg btn-success mr-3">
                                <a><i className="fas fa-heart"></i></a>
                            </button>
                            <button onClick={this.handleDislike} className="btn btn-lg btn-danger">
                                <a><i className="fas fa-thumbs-down"></i></a>
                            </button>
                        </div>
                    </div>
                    <div className="card card-body m-auto">
                            {contentInfo}
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

export default connect(mapStateToProps, { randUser, likeUser, dislikeUser } )(Random);