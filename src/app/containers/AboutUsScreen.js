import React from 'react'
import { connect } from 'react-redux'
import { Image, Linking } from 'react-native'
import { Card, CardItem, Text, View, Thumbnail, Container, Header, Content, Title, Button, Left, Right, Body, Icon} from 'native-base'
// import Icon from 'react-native-vector-icons/Ionicons'
import Hyperlink from 'react-native-hyperlink'

class AboutUsScreen extends React.Component {
  render () {
    const style = {
      fontSize: 22
    }

    return (
      <Container >
        <Header>
          <Left>
            <Button transparent onPress={()=> this.context.drawer.open()}>
              <Icon name="ios-menu" />
            </Button>
          </Left>
          <Body style={{flex: 3}}>
            <Title>#NadiesLee #terror</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Card style={{flex: 0}}>
            <CardItem>
              <Text style={style}>
                Buscamos promover la lectura a través de los mismos cuentos de terror
                que nos atraparon en nuestra adolescencia.
              </Text>
            </CardItem>
            <CardItem>
              <Text style={style}>
                Facilitando la comprensión lectora a través del acceso
                a un diccionario integrado.
              </Text>
            </CardItem>
            <CardItem>
              <Text style={style}>
                Animamos a todos las portadoras de telefonía e importadores
                de teléfonos, a preinstalar esta aplicación!!!
              </Text>
            </CardItem>
            <CardItem>
              <Text style={style}>
                Somos intranerds, soluciones offline sólidas como la roca
              </Text>
            </CardItem>
            <CardItem>
              <Hyperlink onPress={ url => Linking.openURL(url) }>
                <Text style={style}>http://intranerds.io</Text>
              </Hyperlink>
            </CardItem>
            <CardItem>
              <Image linkText="http://intranerds.io" source={require('../images/logo_intranerds.png')} />
            </CardItem>
          </Card>
        </Content>
      </Container>
    )
  }
}
AboutUsScreen.contextTypes = {drawer: React.PropTypes.object}
const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
  }
}

export default connect(mapStateToProps)(AboutUsScreen)
