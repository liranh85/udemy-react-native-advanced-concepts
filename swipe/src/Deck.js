import React, { Component } from 'react'
import {
  Animated,
  Dimensions,
  PanResponder,
  View
} from 'react-native'

const SCREEN_WIDTH = Dimensions.get('window').width

class Deck extends Component {
  constructor(props) {
    super(props)

    const position = new Animated.ValueXY()
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx })
      },
      onPanResponderRelease: this.resetPosition.bind(this)
    })

    // The documentation places the panResponder in the state, so we're following that. Although in practice, it doesn't make a lot of sense to put this instance in the state, because it doesn't change. It should just be put as `this.panResponder`.
    // Same goes for position
    this.state = { panResponder, position }
  }

  resetPosition () {
    Animated.spring(this.state.position, {
      toValue: { x: 0, y: 0 }
    }).start()
  }

  getCardStyle () {
    const { position } = this.state
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-120deg', '0deg', '120deg']
    })

    return {
      ...position.getLayout(),
      transform: [{ rotate }]
    }
  }

  renderCards () {
    const { panResponder } = this.state
    return this.props.data.map((item, index) => {
      if (index === 0) {
        return (
          <Animated.View
            key={item.id}
            style={this.getCardStyle()}
            {...panResponder.panHandlers}
          >
            {this.props.renderCard(item)}
          </Animated.View>
        )
      }

      return this.props.renderCard(item)
    })
  }

  render() {
    return (
      <View>{this.renderCards()}</View>
    )
  }
}

export default Deck
