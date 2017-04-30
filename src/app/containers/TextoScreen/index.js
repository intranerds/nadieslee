import React from 'react'
import { StatusBar } from 'react-native'
import NavigationRouter from '../../navigation/NavigationRouter'
import { connect } from 'react-redux'
import StartupActions from '../../redux/StartupRedux'
import ReduxPersist from '../../config/ReduxPersist'
import ComponentInner from '../../content/textos/el-corazon-delator'
import Header from '../../containers/Header.js'
import {
  Card, CardItem, Text, View, Thumbnail,
  Container, Content, Title, Button,
  Left, Right, Body, Icon
} from 'native-base'

const Component = () => {
  return (
    <Container >
      <Header titulo="Card example" />
      <Content padder>
        <Card style={{flex: 0}}>
          <CardItem>
            <ComponentInner />
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