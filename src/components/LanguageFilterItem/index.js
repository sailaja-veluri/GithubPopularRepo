// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {isActive, languageFiltersDetails, setActiveLanguageFilterId} = props

  console.log(languageFiltersDetails)

  const {id, language} = languageFiltersDetails

  const btnClassName = isActive
    ? 'language-btn active-language-btn'
    : 'language-btn'
  const onClickLanguageFilter = () => {
    setActiveLanguageFilterId(id)
  }
  return (
    <li>
      <button
        className={btnClassName}
        onClick={onClickLanguageFilter}
        type="button"
      >
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
