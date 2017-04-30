import React, { Component } from 'react'
import { connect } from 'react-redux'

import { View, Text, Container, Content, Card, CardItem } from 'native-base'

import Modal from 'react-native-modalbox'

import diccionario from '../content/diccionario'

const ocultarSignificado = () => {
  return {
    type: 'MOSTRAR_SIGNIFICADO',
    palabra: ''
  }
}

const puntuactionMarksRegExp =
  // eslint-disable-next-line max-len
  /[\.’'\[\](){}⟨⟩:,،、‒–—―…!.‹›«»‐\-?‘’“”\'";⁄·\&*@\•^†‡°”¡¿※#№÷×ºª%‰+−=‱¶′″‴§~_|‖¦©℗®℠™¤₳฿₵¢₡₢$₫₯֏₠€ƒ₣₲₴₭₺₾ℳ₥₦₧₱₰£៛₽₹₨₪৳₸₮₩¥]/ig


const significado = p => {
  const palabra = p.replace(puntuactionMarksRegExp, '')
  if (diccionario[palabra] && diccionario[palabra][0]) {
    return (
      <Content padder>
        <Text style={{fontSize: 28}}>{palabra}</Text>
        {_.map(diccionario[palabra][0].acepciones, (a, i) => {
          return (<Text key={i} style={{fontSize: 22}}> - {a}</Text>)
        })}
      </Content>
    )
  } else {
    return (
      <Content padder>
        <Text style={{fontSize: 28}}>{palabra}</Text>
        <Text style={{fontSize: 22}}>Falta definición</Text>
      </Content>
    )
  }
}

class ModalComponent extends Component {
  render() {
    const { palabraMostrando, ocultarSignificado } = this.props
    return (
      <Modal
        isOpen={Boolean(palabraMostrando)}
        style={{height: 300}}
        swipeToClose={true}
        position="bottom"
        onClosed={() => ocultarSignificado()}>
          <Card>
            <CardItem>
              {significado(palabraMostrando)}
            </CardItem>
          </Card>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => ({
  palabraMostrando: state.palabraMostrando
})

const mapDispatchToProps = (dispatch) => ({
  ocultarSignificado: () => dispatch(ocultarSignificado()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalComponent)