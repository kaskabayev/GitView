import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import ProjectList from './ProjectList/ProjectList'
import ProjectDetail from './ProjectDetail/ProjectDetail'
import Loading from './Loading/Loading'

class List extends Component {
  static navigationOptions = {
    title: 'List'
  }

  state = {
    loading: true,
    refreshing: false,
    page: 1,
    selectedProject: undefined,
    gitProjects: [],
    query: 'created:>2018-01-01'
  }

  componentDidMount() {
    this.getGitHubProjects()
  }

  getFirstState = () => {
    this.setState(
      {
        loading: true
      },
      () => this.getGitHubProjects()
    )
  }

  getGitHubProjects = () => {
    return fetch(`https://api.github.com/search/repositories?q=${this.state.query}&sort=stars&order=desc`, {
      headers: {
        Accept: 'application/vnd.github.mercy-preview+json'
      }
    })
      .then(response => response.json())
      .then(response => {
        this.setState(
          {
            loading: false,
            refreshing: false,
            gitProjects: response.items
          }
        )
      })
  }

  loadGitHubProject = () => {
    return fetch(`https://api.github.com/search/repositories?q=${this.state.query}&sort=stars&order=desc&page=${this.state.page}`, {
      headers: {
        Accept: 'application/vnd.github.mercy-preview+json'
      }
    })
      .then(response => response.json())
      .then(response => {
        this.setState(
          {
            loading: false,
            gitProjects: [...this.state.gitProjects, ...response.items]
          }
        )
      })
  }

  projectSelectedHandler = (key: number) => {
    this.setState(
      {
        selectedProject: this.state.gitProjects.find(project => {
          return project.id === key
        })
      })
  }

  modalClosedHandler = () => {
    this.setState(
      {
        selectedProject: undefined
      }
    )
  }

  handleRefresh = () => {
    this.setState(
      {
        refreshing: true
      },
      () => this.getGitHubProjects()
    )
  }

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1,
        loading: true
      },
      () => this.loadGitHubProject()
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Loading loading={this.state.loading} />
        <ProjectDetail
          selectedProject={this.state.selectedProject}
          onModalClosed={this.modalClosedHandler}
        />
        <ProjectList
          projects={this.state.gitProjects}
          refreshing={this.state.refreshing}

          onRefresh={this.handleRefresh}
          onLoadMore={this.handleLoadMore}
          onItemSelected={this.projectSelectedHandler}
        />
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
    justifyContent: 'flex-start'
  }
})

export default List