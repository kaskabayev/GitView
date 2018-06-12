import React from 'react'
import { Modal, View, Text, Image } from 'react-native'

const placeDetail = props => (
    <Modal>
        <View>
            <Image source={props.placeImage}/>
            <Text>{props.placeName}</Text>
            <View>
                <Button />
                <Button />
            </View>
        </View>
    </Modal>
)

export default placeDetail