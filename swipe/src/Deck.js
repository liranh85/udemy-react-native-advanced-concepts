import React, { Component } from 'react'
import { Animated, View } from 'react-native'

class Deck extends Component {
  renderCards() {
    return this.props.data.map(item => this.props.renderCard(item))
  }

  render() {
    return (
      <View>
        {this.renderCards()}
      </View>
    )
  }
}

export default Deck
