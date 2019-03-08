import React, { Component } from 'react'

export default class RankItem extends Component {
  render() {

    const { rank } = this.props;


    return (
        <div className="gaadiex-list-item">
        {(rank.imageURL )? 
            (
                <img className="gaadiex-list-item-img image-rounded" src={rank.imageURL} 
                 style={{maxHeight: '100px', maxWidth: '80px', marginBottom: '9px'}}
                />
            ) : 
            (
                <img 
                    className="gaadiex-list-item-img" 
                    src="http://www.free-icons-download.net/images/commercial-male-user-icon-32765.png" alt={rank.name} 
                />
            )
        }    
        <div className="gaadiex-list-item-text">
            <h4>{rank.name}</h4>
        </div>
        <hr/>
        </div>
    )
  }
}
