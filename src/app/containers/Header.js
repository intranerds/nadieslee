import React, { Component } from 'react'
import {
  Card, CardItem, Text, View, Thumbnail,
  Container, Content, Header as NBHeader, Title, Button,
  Left, Right, Body, Icon
} from 'native-base'

class Header extends Component {
  render() {
    const { titulo } = this.props
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
        <Right />
      </NBHeader>
    )
  }
}

Header.contextTypes = {drawer: React.PropTypes.object}

export default Header
