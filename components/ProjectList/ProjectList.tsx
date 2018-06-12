import React from 'react'
import { StyleSheet, FlatList, RefreshControl } from 'react-native'

import ListItem from '../ListItem/ListItem'

const projectList = props => {
    return <FlatList
        style={styles.listContainer}
        data={props.projects}
        refreshing={props.refreshing}
        onRefresh={props.onRefresh}
        onEndReached={props.onLoadMore}
        onEndReachedThreshold={1}
        renderItem={(info) => (
            <ListItem
                projectName={info.item.name}
                projectDescription={info.item.description}
                projectOwner={info.item.owner.login}
                projectOwnerAvatar={{uri: info.item.owner.avatar_url}}
                projectNoStars={info.item.stargazers_count}
                projectNoForks={info.item.forks}

                onItemPressed={() => props.onItemSelected(info.item.id)}
            />
        )}
    />
}

const styles = StyleSheet.create({
    listContainer: {
      width: '100%'
    }
})

export default projectList