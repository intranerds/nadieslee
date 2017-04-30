import React, { Component } from 'react';
import { AppRegistry, Alert } from 'react-native';
import AppIntro from 'react-native-app-intro';
import { connect } from 'react-redux'

class IntroComponent extends Component {
  render() {
    const { onSkip, onDone, onNext, onSlide } = this.props
    const pageArray = [{
      title: 'Lee cuentos clásicos de terror',
      img: require('../../images/intro/1.png'),
      imgStyle: {
        height: 103 * 4,
        width: 103 * 4,
      },
      backgroundColor: '#bbb',
      fontColor: 'black',
      level: 10,
    }, {
      title: 'Sin necesidad de un diccionario',
      img: require('../../images/intro/2.png'),
      imgStyle: {
        height: 115 * 4,
        width: 103 * 4,
      },
      backgroundColor: '#666',
      fontColor: 'white',
      level: 10,
    }, {
      title: 'Ni conección a internet',
      img: require('../../images/intro/3.png'),
      imgStyle: {
        height: 105 * 3,
        width: 130 * 3,
      },
      backgroundColor: 'black',
      fontColor: 'red',
      level: 10,
    }];
    return (
      <AppIntro
        skipBtnLabel="Saltar"
        doneBtnLabel="Listo!"
        onNextBtnClick={onNext}
        onDoneBtnClick={onDone}
        onSkipBtnClick={onSkip}
        onSlideChange={onSlide}
        pageArray={pageArray}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  palabraMostrando: state.palabraMostrando,
  fontSize: state.fontSize
})

const introSkiped = () => {
  return {
    type: 'INTRO_SKIPED'
  }
}

const introVista = () => {
  return {
    type: 'INTRO_VISTA'
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  onSkip() {
    dispatch(dispatch(introSkiped()))
  },
  onDone() {
    dispatch(introVista())
  },
  onNext() {
    
  },
  onSlide() {
    
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(IntroComponent)
