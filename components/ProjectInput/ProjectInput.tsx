import React, { Component } from 'react'
import { View, TextInput, Button, StyleSheet } from 'react-native'

class ProjectInput extends Component {
  state = {
    projectName: ''
  }

  projectNameChangedHandler = (val: string) => {
    this.setState(
      {
        projectName: val
      }
    )
  }

  projectSubmitHandler = () => {
    if (this.state.projectName.trim() === '') {
      this.props.onLoadAll()
    }

    this.props.onProjectSearch(this.state.projectName)
  }

  render() {
    return (
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Search for repos'
          value={this.state.projectName}
          onChangeText={this.projectNameChangedHandler}
          style={styles.projectInput}
        />
        <Button
          title='Search'
          style={styles.projectButton}
          onPress={this.projectSubmitHandler}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  projectInput: {
    width: '70%'
  },
  projectButton: {
    width: '30%'
  }
})

export default ProjectInput