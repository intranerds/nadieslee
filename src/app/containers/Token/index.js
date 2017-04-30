import React from 'react'
import {
  Text
} from 'native-base'

export default ({ children }) => {
  return (
    <Text style={{fontSize: 20}}>{children}</Text>
  )
}