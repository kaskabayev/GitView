import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import PlaceInput from './components/PlaceInput/PlaceInput'
import PlaceList from './components/PlaceList/PlaceList'


import placeImage from './assets/place.jpg'

export default class App extends Component {
  state = {
    places: []
  }

  placeAddedHandler = (placeName: string) => {
    this.setState(prevState => {
      return {
        places: prevState.places.concat({
          key: Math.random(),
          name: placeName,
          image: placeImage
        })
      }
    })
  }

  placeDeletedHandler = (key: number) => {
    this.setState(prevState => {
      return {
        places: prevState.places.filter(place => {
          return place.key !== key
        })
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <PlaceInput onPlaceAdded={this.placeAddedHandler} />
        <PlaceList places={this.state.places} onItemDeleted={this.placeDeletedHandler} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 26,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
})