import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import ProjectInput from './ProjectInput/ProjectInput'
import ProjectList from './ProjectList/ProjectList'
import ProjectDetail from './ProjectDetail/ProjectDetail'
import Loading from './Loading/Loading'

class Search extends Component {
  static navigationOptions = {
    title: 'Search'
  }

  state = {
    loading: true,
    refreshing: false,
    page: 1,
    selectedProject: undefined,
    gitProjects: [],
    query: 'created:>2018-01-01',
    searchQuery: ''
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
    let searchQuery = this.state.query

    if (this.state.refreshing) {
      searchQuery += (this.state.searchQuery !== '' ? '+' + this.state.searchQuery : '')
    }

    return fetch(`https://api.github.com/search/repositories?q=${searchQuery}&sort=stars&order=desc`, {
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
    let searchQuery = this.state.query + (this.state.searchQuery !== '' ? '+' + this.state.searchQuery : '')

    return fetch(`https://api.github.com/search/repositories?q=${searchQuery}&sort=stars&order=desc&page=${this.state.page}`, {
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

  searchGitHubProject = (query: string) => {
    this.setState(
      {
        searchQuery: query
      }
    )

    let searchQuery = this.state.query + '+' + query

    return fetch(`https://api.github.com/search/repositories?q=${searchQuery}&sort=stars&order=desc`, {
      headers: {
        Accept: 'application/vnd.github.mercy-preview+json'
      }
    })
      .then(response => response.json())
      .then(response => {
        this.setState(
          {
            loading: false,
            gitProjects: response.items
          }
        )
      })
  }

  projectSearchHandler = (projectName: string) => {
    this.setState(
      {
        loading: true
      },
      () => this.searchGitHubProject(projectName)
    )
  }

  projectSelectedHandler = (key: number) => {
    this.setState(
      {
        selectedProject: this.state.gitProjects.find(project => {
          return project.id === key
        }
        )
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
        <ProjectInput
          onProjectSearch={this.projectSearchHandler}
          onLoadAll={this.getFirstState}
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

export default Search