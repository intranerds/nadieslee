import React, { Component } from 'react'
import { StatusBar, Alert } from 'react-native'
import NavigationRouter from '../../navigation/NavigationRouter'
import { connect } from 'react-redux'
import StartupActions from '../../redux/StartupRedux'
import ReduxPersist from '../../config/ReduxPersist'
import ComponentInner from '../../content/textos/index'
import Header from '../../containers/Header.js'
import {
  Card, CardItem, Text, View, Thumbnail,
  Container, Content, Title, Button,
  Left, Right, Body, Icon
} from 'native-base'

import Modal from '../Modal'

class TextoScreen extends Component {
  render() {
    const { texto } = this.props
    const Texto = ComponentInner[texto].component
    return (
      <Container style={{ marginBottom: 20 }}>
        <Header titulo={ComponentInner[texto].titulo} />
        <Content padder style={{ marginBottom: 20 }}>
          <Card style={{flex: 0}}>
            <CardItem>
              <Texto />
            </CardItem>
          </Card>
        </Content>
        <Modal />
      </Container>
    )
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup()),
})

export default connect(null, mapDispatchToProps)(TextoScreen)