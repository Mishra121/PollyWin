import React, { Component } from 'react';
import './Profile.css';
import { connect } from 'react-redux';

import { findDOMNode } from 'react-dom'
import { editBio, updateImg} from '../../actions/authActions';

class Profile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      imageValid: false,
      bio: '',
      errors: {}
    }

    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.onChangeImg = this.onChangeImg.bind(this);
  }


  onChange(e) {
    this.setState({ bio: e.target.value });
  }  

  onClick() {
    const { bio } = this.state;

    const info = bio;

    const newInfo = {
      info
    }

    this.props.editBio(newInfo);
    this.setState({ bio: ''});
  }

  handleImageUpload() {

    if(!this.state.imageValid){
      document.getElementById('image').click();
    }
    else if(this.state.imageValid){

      const myFile = findDOMNode(this.refs.myFile).files[0];

      console.log(myFile);

      this.props.updateImg(myFile);
    }
  }

  onChangeImg(e) {
    
    if (e.target.files[0]) {
      this.setState( {imageValid: true} )
    } else {
      this.setState( {imageValid: false} )
    } 

  }

  render() {

    const { user } = this.props.auth;


    return (

        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="row">
              
              </div>    
              <div className="row">
                <div className="col-md-12">
                  <div className="card card-body bg-primary text-white mb-3">
                    <div className="row">
                        <div className="pt-3 m-auto image-container">
                            <img className="img-thumbnail rounded" src={user.imageURL} />
                            <br/>
                            <div className="overlay">
                              <label className="btn-upload">
                                <input type="file" name="image" ref='myFile' id="image" onChange={this.onChangeImg} />
                                <button onClick={this.handleImageUpload} className="btn"><i className="fas fa-user-edit"></i> Edit</button>
                              </label>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className="text-center">
                      <hr/>
                      <h3 className="display-4 text-center">{user.name}</h3>
                    </div>
                  </div>
                </div>
            </div>
    
              <div className="row">
                <div className="col-md-12">
                  <div className="card card-body bg-light mb-3">
                    <div>
                    <h3 className="text-primary">Bio</h3>
                    <button onClick={this.onClick} className="btn btn-sm btn-outline-dark">Edit Bio</button>
                    <button className="btn btn-sm btn-danger">Vote others</button>
                    </div>
                    <hr/>
                    {
                      user.info ?
                        ( 
                          <p className="lead">
                            <textarea onChange={this.onChange} className="form-control" 
                              rows="5" id="bio" name="bio"
                              defaultValue={user.info}
                            >
                            </textarea>
                          </p>
                        ) :
                        (
                          <p className="lead">
                            <textarea onChange={this.onChange} className="form-control" 
                              rows="5" id="bio" name="bio"
                              placeholder="Edit your Status/Bio here..."
                              >
                            </textarea>
                          </p>
                        )
                    }
                  </div>
                </div>
              </div>

              
          </div>
        </div>
    )
  }
}

const mapStateProps = state => ({
  auth: state.auth
});

export default connect(mapStateProps, { editBio, updateImg })(Profile);