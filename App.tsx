import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import PlaceInput from './components/PlaceInput/PlaceInput'
import PlaceList from './components/PlaceList/PlaceList'
import PlaceDetail from './components/PlaceDetail/PlaceDetail'

import placeImage from './assets/place.jpg'

export default class App extends Component {
  state = {
    places: [],
    selectedPlace: undefined
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

  placeSelectedHandler = (key: number) => {
    this.setState(prevState => {
      return {
        selectedPlace: prevState.places.find(place => {
          return place.key === key
        })
      }
    })
  }

  placeDeletedHandler = () => {
    this.setState(prevState => {
      return {
        places: prevState.places.filter(place => {
          return place.key !== prevState.selectedPlace.key
        }),
        selectedPlace: undefined
      }
    })
  }

  modalClosedHandler = () => {
    this.setState({
      selectedPlace: undefined
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <PlaceDetail
          selectedPlace={this.state.selectedPlace}
          onItemDeleted={this.placeDeletedHandler}
          onModalClosed={this.modalClosedHandler}
        />
        <PlaceInput onPlaceAdded={this.placeAddedHandler} />
        <PlaceList
          places={this.state.places}
          onItemSelected={this.placeSelectedHandler} />
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