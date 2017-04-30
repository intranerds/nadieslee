import React, { Component } from 'react';
import { AppRegistry, Alert } from 'react-native';
import AppIntro from 'react-native-app-intro';
import { connect } from 'react-redux'

class IntroComponent extends Component {
  render() {
    const { onSkip, onDone, onNext, onSlide } = this.props
    const pageArray = [{
      title: 'Page 1',
      description: 'Description 1',
      img: '../../images/intro/1.png',
      imgStyle: {
        height: 80 * 2.5,
        width: 109 * 2.5,
      },
      backgroundColor: '#fa931d',
      fontColor: '#fff',
      level: 10,
    }, {
      title: 'Page 2',
      description: 'Description 2',
      img: require('../../images/intro/2.png'),
      imgStyle: {
        height: 93 * 2.5,
        width: 103 * 2.5,
      },
      backgroundColor: '#a4b602',
      fontColor: '#fff',
      level: 10,
    }, {
      title: 'Page 3',
      description: 'Description 3',
      img: require('../../images/intro/2.png'),
      imgStyle: {
        height: 93 * 2.5,
        width: 103 * 2.5,
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
