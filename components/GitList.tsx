import React, { Component } from 'react'
import { AppRegistry, Text, Image } from 'react-native'

export default class GitList extends Component {
    render() {
        let pic = {
            uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
        }
        return (
            <Image source={pic} style={{width: 193, height: 110}}/>
        )
    }
}

AppRegistry.registerComponent('AwesomeProject', () => GitList)