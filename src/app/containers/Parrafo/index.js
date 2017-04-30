import React from 'react'
import {
  View,
  Text
} from 'react-native'

export default ({ children }) => {
  return (
    <Text style={{marginTop: 20}}>{children}</Text>
  )
}