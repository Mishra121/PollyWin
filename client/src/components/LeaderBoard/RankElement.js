import React, { Component } from 'react'

import RankItem from './RankItem'

export default class RankElement extends Component {
  render() {
    
    const { ranks } = this.props;

    return ranks.map(rank => <RankItem key={rank._id} rank={rank} />)
  }
}
