import React from 'react'
import {
  TouchableHighlight,
  Alert
} from 'react-native'
import {
  Text
} from 'native-base'

const style = {
  textDecorationLine: "underline",
  textDecorationStyle: "dotted",
  textDecorationColor: "#ccc",
  fontSize: 20
}

export default ({ it }) => {
  return (
    <Text style={style} onPress={() => Alert.alert(it)}>{it}</Text>
  )
}