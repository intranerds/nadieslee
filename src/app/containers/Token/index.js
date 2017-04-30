import React from 'react'
import {
  Text
} from 'native-base'
import { connect } from 'react-redux'

const TokenComponent = ({ children, fontSize }) => {
  return (
    <Text style={{ fontSize: 20*fontSize }}>{children}</Text>
  )
}

const mapStateToProps = (state) => ({
  fontSize: state.fontSize
})

export default connect(mapStateToProps, null)(TokenComponent)