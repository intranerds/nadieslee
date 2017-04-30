import React from 'react'
import { connect } from 'react-redux'
import {
  TouchableHighlight,
  Alert
} from 'react-native'
import {
  Text
} from 'native-base'

import diccionario from '../../content/diccionario'

const mostrarSignificado = (palabra) => {
  return {
    type: 'MOSTRAR_SIGNIFICADO',
    palabra
  }
}

const style = (fontSize) => ({
  textDecorationLine: "underline",
  textDecorationStyle: "dotted",
  textDecorationColor: "#ccc",
  fontSize
})

const PalabraComponent = ({ it,  mostrarSignificado, fontSize}) => {
  return (
    <Text style={style(20*fontSize)} onPress={() => mostrarSignificado(it)}>{it}</Text>
  )
}

const mapStateToProps = (state) => ({
  palabraMostrando: state.palabraMostrando,
  fontSize: state.fontSize
})

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  mostrarSignificado: (palabra) => {
    dispatch(mostrarSignificado(palabra))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(PalabraComponent)