import React, { Component } from 'react'
import { StyleSheet, View, Image, Button, Text } from 'react-native'

class Main extends Component {
    static navigationOptions = {
        title: 'Main'
    }

    state = {
        name: 'Stranger',
        image: {
            uri: 'http://octopus-fitness-impossible.github.io/impossible-octopus-fitness/img/octocat.png'
        }
    }

    loginHandler = () => {
        alert('Login to be done')
    }

    render() {
        return (
            <View style={styles.container}>
                <View><Text style={styles.welcomeMessage}>Welcome, {this.state.name}</Text></View>
                <Image
                    source={this.state.image}
                    style={styles.image}
                />
                <View style={styles.buttonWrapper}>
                    <Button
                        onPress={this.loginHandler}
                        title='Login'
                        style={styles.button}
                    />
                </View>
                <View style={styles.buttonWrapper}>
                <Button
                        onPress={() => this.props.navigation.navigate('List')}
                        title='Show top repos'
                        style={styles.button}
                    />
                </View>
                <View style={styles.buttonWrapper}>
                    <Button
                        onPress={() => this.props.navigation.navigate('Search')}
                        title='Search for repos'
                        buttonStyle={styles.button}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: 175,
        height: 175,
        marginBottom: 25
    },
    buttonWrapper: {
        marginBottom: 15
    },
    welcomeMessage: {
        padding: 20,
        fontSize: 20,
        fontWeight: 'bold'
    }
})

export default Main