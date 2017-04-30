import React from 'react'
import {
  TouchableHighlight,
  Alert
} from 'react-native'
import {
  Text
} from 'native-base'

export default ({ it }) => {
  return (
    <Text onPress={() => Alert.alert(it)}>{it}</Text>
  )
}