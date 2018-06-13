import React, { Component } from 'react'
import { StyleSheet, View, Image, Button, Text, Linking } from 'react-native'

const github = {
    clientId: 'a7ef19d760ce5f609b1e',
    clientSecret: '61ba249a9b29a985e4944efa976d4670bd82d25e',
    scope: 'user',
    callbackURL: 'gitview://main'
}

class Main extends Component {
    static navigationOptions = {
        title: 'Main'
    }

    state = {
        access_token: '',
        name: 'Stranger',
        email: '',
        image: {
            uri: 'http://octopus-fitness-impossible.github.io/impossible-octopus-fitness/img/octocat.png'
        }
    }

    componentDidMount() {
        Linking.addEventListener('url', this.handleOpenURL.bind(this))
    }

    componentWillUnmount() {
        Linking.removeEventListener('url', this.handleOpenURL.bind(this))
    }

    handleOpenURL = (event: any) => {
        let authTokenIndex = event.url.indexOf('?code=')

        if (authTokenIndex > 0) {
            let authToken = event.url.substring(authTokenIndex + 6)

            this.getAccessToken(authToken)
        }
    }

    getAccessToken = (sessionCode: string) => {
        fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              client_id: github.clientId,
              client_secret: github.clientSecret,
              code: sessionCode
            })
        })
        .then(resp => resp.json())
        .then(resp => {
            this.setState({
                access_token: resp.access_token
            })

            this.getUserInfo(resp.access_token)
        })
    }

    getUserInfo = (accessToken: string) => {
        fetch(`https://api.github.com/user?access_token=${accessToken}`)
            .then(resp => resp.json())
            .then(resp => {
                this.setState({
                    name: resp.login,
                    image: {uri: resp.avatar_url}
                })
            })
    }

    loginHandler = () => {
        let authUrl = `https://github.com/login/oauth/authorize?scope=user:email&client_id=${github.clientId}`

        Linking.canOpenURL(authUrl)
            .then(supported => {
                if (supported) {
                    return Linking.openURL(authUrl)
                } else {
                    console.error('Failed to open URI:', authUrl)
                }
            })
            .catch(error => {
                console.error(error)
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.welcomeMessage}>Welcome, {this.state.name}</Text>
                </View>
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