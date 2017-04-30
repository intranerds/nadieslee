import React, { Component } from 'react'
import {
  Card, CardItem, Text, View, Thumbnail,
  Container, Content, Header as NBHeader, Title, Button,
  Left, Right, Body, Icon
} from 'native-base'
import { connect } from 'react-redux'

class HeaderComponent extends Component {
  render() {
    const { titulo, reducirFont, agrandarFont } = this.props
    return (
      <NBHeader>
        <Left>
          <Button transparent onPress={()=> this.context.drawer.open()}>
            <Icon name="ios-menu" />
          </Button>
        </Left>
        <Body style={{flex: 3}}>
          <Title>{titulo}</Title>
        </Body>
        <Left>
            <Button transparent onPress={() => reducirFont()}>
              <Icon style={{fontSize: 30}} name="ios-remove" />
            </Button>
        </Left>
        <Left>
          <Button transparent onPress={() => agrandarFont()}>
            <Icon style={{fontSize: 30}} name="ios-add" />
          </Button>
        </Left>
      </NBHeader>
    )
  }
}

HeaderComponent.contextTypes = {drawer: React.PropTypes.object}

const reducirFont = (palabra) => {
  return {
    type: 'REDUCIR_FONT'
  }
}

const agrandarFont = (palabra) => {
  return {
    type: 'AGRANDAR_FONT'
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  reducirFont: () => {
    dispatch(reducirFont())
  },
  agrandarFont: () => {
    dispatch(agrandarFont())
  }
})

export default connect(null, mapDispatchToProps)(HeaderComponent)
