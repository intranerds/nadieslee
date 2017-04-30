import React from 'react'
import { connect } from 'react-redux'
import { Alert, TouchableHightlight, View, Image } from 'react-native'
import Header from '../Header'
import { Card, CardItem, Text, Thumbnail, Container, Content, Title, Button, Left, Right, Body, Icon} from 'native-base'
// import Icon from 'react-native-vector-icons/Ionicons'
import Textos from '../../content/textos/index'
import _ from 'lodash'
import { Actions as NavigationActions } from 'react-native-router-flux'

class IndiceScreen extends React.Component {
  render () {
    return (
      <Container >
        <Header titulo="Cuentos" />
        <Content padder>
          {Textos && _.map(_.keys(Textos), id => {
            const t = Textos[id]
            
            return (
                  <Card key={id} style={{flex: 0}}>
                    <CardItem>
                        <Left>
                            <Body>
                                <Text  style={{fontSize: 28}}>{t.titulo}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem>
                      <Image style={{ resizeMode: 'cover', height: 700,flex: 1 }} source={t.image} />
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Text style={{fontSize: 22}}>{t.autor}</Text>
                            <Text style={{fontSize: 22, marginTop: 10}}>{t.anio}</Text>
                            <Text style={{fontSize: 18, marginTop: 10}}>{t.palabrasCount} palabras</Text>
                        </Body>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Button transparent textStyle={{color: '#900'}} onPress={() => {
                                NavigationActions.textoScreen({ texto: id})
                              }}>
                                <Text style={{fontSize: 30, marginTop: 10}}>Leer</Text>
                            </Button>
                        </Body>
                    </CardItem>

                  </Card>
            )
          })}
        </Content>
      </Container>
    )
  }
}
IndiceScreen.contextTypes = {drawer: React.PropTypes.object}
const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
  }
}

export default connect(mapStateToProps)(IndiceScreen)
