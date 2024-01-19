import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]
const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]
class FiltersGroup extends Component {
  state = {
    isProfileDetails: [],
    isProfileLoading: true,
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const profileDetails = await fetch('https://apis.ccbp.in/profile', options)
    if (profileDetails.ok) {
      const profileDetailsData = await profileDetails.json()
      const profileDetailsDict = {
        name: profileDetailsData.profile_details.name,
        profileImageUrl: profileDetailsData.profile_details.profile_image_url,
        shortBio: profileDetailsData.profile_details.short_bio,
      }
      this.setState({
        isProfileDetails: profileDetailsDict,
        isProfileLoading: false,
      })
    } else {
      this.setState({
        isProfileLoading: false,
      })
    }
  }

  profileDetailsLoader = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderProductDetailsList = () => {
    const {isProfileDetails} = this.state
    if (isProfileDetails.length !== 0) {
      const {name, profileImageUrl, shortBio} = isProfileDetails
      return (
        <div className="profile">
          <img src={profileImageUrl} alt="profile" />
          <h1>{name}</h1>
          <p>{shortBio}</p>
        </div>
      )
    }
    return (
      <button type="button" onClick={this.getProfileDetails}>
        Retry
      </button>
    )
  }

  render() {
    const {
      ratingsListFilter,
      categoryOptionsFilter,
      categoryFilterId,
      ratingsListId,
    } = this.props
    const {isProfileLoading} = this.state

    return (
      <div className="filters-group-container">
        {isProfileLoading
          ? this.profileDetailsLoader()
          : this.renderProductDetailsList()}
        <hr />
        <h1 className="topics-names">Type of Employment</h1>
        <ol>
          {employmentTypesList.map(eachCategory => (
            <li className="category-name" key={eachCategory.employmentTypeId}>
              <label>
                <input
                  type="checkbox"
                  checked={categoryFilterId
                    .join(',')
                    .includes(eachCategory.employmentTypeId)}
                  onChange={() =>
                    categoryOptionsFilter(eachCategory.employmentTypeId)
                  }
                />
                <span
                  className={`button-style ${
                    categoryFilterId.includes(eachCategory.employmentTypeId)
                      ? 'category-styles'
                      : ''
                  }`}
                >
                  {eachCategory.label}
                </span>
              </label>
            </li>
          ))}
        </ol>
        <hr />
        <h1 className="topics-names">Salary Range</h1>
        <ul className="rating-un-order-list">
          {salaryRangesList.map(range => (
            <li key={range.salaryRangeId}>
              <input
                type="radio"
                id={range.salaryRangeId}
                name="salaryRange"
                value={range.salaryRangeId}
                checked={ratingsListId === range.salaryRangeId}
                onChange={() => ratingsListFilter(range.salaryRangeId)}
              />
              <label htmlFor={range.salaryRangeId}>{range.label}</label>
            </li>
          ))}
        </ul>

        <button type="button">Clear Filters</button>
      </div>
    )
  }
}

export default FiltersGroup
