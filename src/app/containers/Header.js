import React from 'react'
import {
  Card, CardItem, Text, View, Thumbnail,
  Container, Content, Header, Title, Button,
  Left, Right, Body, Icon
} from 'native-base'

export default ({ titulo }) => {
  return (
    <Header>
      <Left>
        <Button transparent onPress={()=> this.context.drawer.open()}>
          <Icon name="ios-menu" />
        </Button>
      </Left>
      <Body style={{flex: 3}}>
        <Title>{titulo}</Title>
      </Body>
      <Right />
    </Header>
  )
}
