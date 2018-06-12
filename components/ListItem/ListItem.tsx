import React from 'react'
import { View, Text, StyleSheet, TouchableNativeFeedback, Image } from 'react-native'

interface Projects {
    projectName: string,
    projectDescription: object,
    projectOwner: string,
    projectOwnerAvatar: object,
    projectNoStars: number,
    projectNoForks: number
}

const listItem = (props: Projects) => (
    <TouchableNativeFeedback onPress={props.onItemPressed}>
        <View style={styles.listItem}>
            <Text style={styles.projectName}>{props.projectName}</Text>
            <Text style={styles.projectDesc}>{props.projectDescription}</Text>
            <View style={styles.ownerInfo}>
                <Image source={props.projectOwnerAvatar} style={styles.ownerImage} />
                <Text>{props.projectOwner}</Text>
            </View>
            <View style={styles.footerWrapper}>
                <View style={styles.footerItems}>
                    <Image source={{uri: 'https://raw.githubusercontent.com/okmr-d/okmr-d.github.io/master/img/DOFavoriteButton/flatIconImage.png'}} 
                        style={styles.footerImage} />
                    <Text>{props.projectNoStars}</Text>
                </View>
                <View style={styles.footerItems}>
                    <Image source={{uri: 'https://maxcdn.icons8.com/windows10/PNG/512/Programming/git_fork-512.png'}} style={styles.footerImage} />
                    <Text>{props.projectNoForks}</Text>
                </View>
            </View>
        </View>
    </ TouchableNativeFeedback>
)

const styles = StyleSheet.create({
    listItem: {
        width: '100%',
        padding: 10,
        backgroundColor: '#eee',
        marginBottom: 10,
        alignItems: 'flex-start'
    },
    placeImage: {
        marginRight: 8,
        height: 30,
        width: 30
    },
    projectName: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    projectDesc: {
        fontStyle: 'italic'
    },
    ownerImage: {
        width: 25,
        height: 25,
        marginRight: 10
    },
    ownerInfo: {
        marginTop: 10,
        marginBottom: 7,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    footerWrapper: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    footerItems: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 30
    },
    footerImage: {
        width: 20,
        height: 20,
        marginRight: 5
    }
})

export default listItem