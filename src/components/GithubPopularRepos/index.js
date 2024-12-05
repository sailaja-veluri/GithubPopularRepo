import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here

class GithubPopularRepos extends Component {
  state = {
    repositoriesData: [],
    apiStatus: apiStatusConstants.initial,
    activeLanguageFilterId: languageFiltersData[0].id,
  }

  componentDidMount() {
    this.getRepositories()
  }

  getRepositories = async () => {
    const {activeLanguageFilterId} = this.state
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeLanguageFilterId}`
    const response = await fetch(apiUrl)
    console.log(response)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.popular_repos.map(eachRepo => ({
        forksCount: eachRepo.forks_count,
        name: eachRepo.name,
        starsCount: eachRepo.stars_count,
        id: eachRepo.id,
        imageUrl: eachRepo.avatar_url,
        issuesCount: eachRepo.issues_count,
      }))
      this.setState({
        repositoriesData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else if (response.status === 401) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderRepositoriesListView = () => {
    const {repositoriesData} = this.state
    return (
      <ul className="repositories-list">
        {repositoriesData.map(eachRepo => (
          <RepositoryItem repositoryDetails={eachRepo} key={eachRepo.id} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="error-message">Something Went Wrong</h1>
    </div>
  )

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  setActiveLanguageFilterId = newFilterId => {
    this.setState({activeLanguageFilterId: newFilterId}, this.getRepositories)
  }

  renderRepositories() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRepositoriesListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderLanguageFilterList = () => {
    const {activeLanguageFilterId} = this.state
    console.log(languageFiltersData)
    if (languageFiltersData.length === 0) {
      return <p>No filters available</p>
    }
    return (
      <ul className="filters-list">
        {languageFiltersData.map(eachLanguageFilter => (
          <LanguageFilterItem
            languageFiltersDetails={eachLanguageFilter}
            key={eachLanguageFilter.id}
            isActive={eachLanguageFilter.id === activeLanguageFilterId}
            setActiveLanguageFilterId={this.setActiveLanguageFilterId}
          />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div className="app-container">
        <div className="responsive-container">
          <h1 className="heading">Popular</h1>
          {this.renderLanguageFilterList()}
          {this.renderRepositories()}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
