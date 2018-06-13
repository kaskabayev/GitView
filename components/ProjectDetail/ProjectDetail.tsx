import React from 'react'
import { Modal, View, Text, Image, Button, StyleSheet } from 'react-native'

const projectDetail = props => {
    let modalContent = undefined

    if (props.selectedProject) {
        modalContent = (
            <View style={styles.infoWrapper}>
                <Image source={{uri: props.selectedProject.owner.avatar_url}} style={styles.projectImage}/>
                <Text style={styles.ownerName}>{props.selectedProject.owner.login}</Text>
                <Text style={styles.projectName}>Project name: {props.selectedProject.full_name}</Text>
            </View>
        )
    }

    return (
        <Modal
            onRequestClose={props.onModalClosed}
            visible={props.selectedProject !== undefined}
            animationType='slide' >
            <View style={styles.modalContainer}>
                {modalContent}
                <View style={styles.buttonContainer}>
                    <Button title='Close' onPress={props.onModalClosed} />
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        margin: 22
    },
    infoWrapper: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    projectImage: {
        width: 150,
        height: 150
    },
    projectName: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 22
    },
    ownerName: {
        fontSize: 18,
        textAlign: 'center'
    },
    buttonContainer: {
        marginTop: 10
    }
})

export default projectDetail