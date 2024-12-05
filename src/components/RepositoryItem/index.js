// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repositoryDetails} = props
  const {
    name,
    imageUrl,
    starsCount,
    forksCount,
    issuesCount,
  } = repositoryDetails
  return (
    <li className="repository-item">
      <img src={imageUrl} className="repository-image" alt={name} />
      <h1 className="repository-name">{name}</h1>
      <div className="stars-container">
        <img
          className="stars-icon"
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
        />
        <p className="stars-text">{starsCount}</p>
      </div>
      <div className="stars-container">
        <img
          className="stars-icon"
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png "
          alt="forks"
        />
        <p className="stars-text">{forksCount}</p>
      </div>
      <div className="stars-container">
        <img
          className="stars-icon"
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png "
          alt="open issues"
        />
        <p className="stars-text">{issuesCount}</p>
      </div>
    </li>
  )
}
export default RepositoryItem
