import React from 'react'
import { Text } from 'react-native'
import {
  Container, Header, Title, Content, Footer, FooterTab, Button,
  Left, Right, Body
} from 'native-base'

const Index = () => {
  return (
    <Container>
      <Header>
        <Left />
        <Body>
          <Title>Header</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <Text>Content</Text>
      </Content>
      <Footer>
        <FooterTab>
          <Button full>
            <Text>Footer</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  )
}

export default Index
