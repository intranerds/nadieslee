import React from 'react'
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

const Component = ({ texto }) => {
  const Texto = ComponentInner[texto].component
  return (
    <Container >
      <Header titulo={ComponentInner[texto].titulo} />
      <Content padder>
        <Card style={{flex: 0}}>
          <CardItem>
            <Texto />
          </CardItem>
        </Card>
      </Content>
    </Container>
  )
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup())
})

export default connect(null, mapDispatchToProps)(Component)