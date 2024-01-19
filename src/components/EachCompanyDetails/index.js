import {Redirect} from 'react-router-dom'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {FaLocationArrow, FaShoppingBag, FaRegStar} from 'react-icons/fa'
import {IoOpenOutline} from 'react-icons/io5'
import JobsListOfCompanies from '../JobsListOfCompanies'
import SimilarJobsCard from '../SimilarJobsCard'

import './index.css'

class EachCompanyDetails extends Component {
  state = {
    productsList: [],
    isLoading: true,
    noAccess: false,
    skills: [],
    similarJobs: [],
  }

  componentDidMount() {
    this.getProducts()
  }

  OnClickNotFoundPage = () => <Redirect to="/not-found" />

  getProducts = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()

      const updatedData = {
        title: fetchedData.job_details.title,
        jobDescription: fetchedData.job_details.job_description,
        employmentType: fetchedData.job_details.employment_type,
        id: fetchedData.job_details.id,
        companyLogoUrl: fetchedData.job_details.company_logo_url,
        location: fetchedData.job_details.location,
        packagePerAnnum: fetchedData.job_details.package_per_annum,
        rating: fetchedData.job_details.rating,
        companyWebsiteUrl: fetchedData.job_details.company_website_url,
        lifeAtCompany: {
          description: fetchedData.job_details.life_at_company.description,
          imageUrl: fetchedData.job_details.life_at_company.image_url,
        },
      }
      const skillsDetails = {
        skills: fetchedData.job_details.skills.map(eachSkills => ({
          imageUrl: eachSkills.image_url,
          name: eachSkills.name,
        })),
      }
      const similarJobsDetails = {
        similarJobs: fetchedData.similar_jobs.map(eachSimilarJobs => ({
          companyLogoUrl: eachSimilarJobs.company_logo_url,
          employmentType: eachSimilarJobs.employment_type,
          id: eachSimilarJobs.id,
          jobDescription: eachSimilarJobs.job_description,
          location: eachSimilarJobs.location,
          rating: eachSimilarJobs.rating,
          title: eachSimilarJobs.title,
        })),
      }
      //   console.log(updatedData)

      this.setState({
        productsList: updatedData,
        isLoading: false,
        noAccess: true,
        skills: skillsDetails,
        similarJobs: similarJobsDetails,
      })
    } else {
      this.setState({
        isLoading: false,
        noAccess: false,
      })
    }
  }

  renderProductsList = () => {
    const {productsList, skills, similarJobs, noAccess} = this.state
    if (noAccess) {
      if (productsList.length !== 0) {
        const {
          companyLogoUrl,
          title,
          rating,
          location,
          employmentType,
          packagePerAnnum,
          jobDescription,
          companyWebsiteUrl,
          lifeAtCompany,
        } = productsList
        return (
          <div className="product-maine-container">
            <div className="product-item">
              <div className="heading_container">
                <div className="logo-container">
                  <img
                    src={companyLogoUrl}
                    alt="website logo"
                    className="website logo"
                  />
                  <div className="logo-text-container">
                    <h1>{title}</h1>
                    <div className="rating-container">
                      <FaRegStar className="star" />
                      <p className="rating">{rating}</p>
                    </div>
                  </div>
                </div>
                <div className="in-details-container">
                  <div className="details-container">
                    <div className="icon-text">
                      <FaLocationArrow />
                      <p className="text">{location}</p>
                    </div>
                    <div className="icon-text">
                      <FaShoppingBag />
                      <p className="text">{employmentType}</p>
                    </div>
                  </div>
                  <p className="package">{packagePerAnnum}</p>
                </div>
                <hr />
                <div>
                  <div className="description_link">
                    <h1>Description</h1>
                    <a
                      href={companyWebsiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link"
                    >
                      Visit
                      <IoOpenOutline />
                    </a>
                  </div>
                  <p>{jobDescription}</p>
                </div>
                <div>
                  <h1>Skills</h1>
                  <ul className="skills-apps">
                    {skills.skills.map(eachSkillsItem => (
                      <JobsListOfCompanies
                        key={`eachKey${eachSkillsItem.name}`}
                        eachSkillsItem={eachSkillsItem}
                      />
                    ))}
                  </ul>
                </div>
                <div className="life-at-company-container">
                  <div>
                    <h1>Life at Company</h1>
                    <p>{lifeAtCompany.description}</p>
                  </div>
                  <img
                    src={lifeAtCompany.imageUrl}
                    alt="company life"
                    className="life-at-company-image"
                  />
                </div>
              </div>
            </div>
            <div>
              <h1>Similar Jobs</h1>
              <ul className="skills-apps">
                {similarJobs.similarJobs.map(eachSimilarJobsDetails => (
                  <SimilarJobsCard
                    key={eachSimilarJobsDetails.id}
                    similarJobsProductData={eachSimilarJobsDetails}
                  />
                ))}
              </ul>
            </div>
          </div>
        )
      }
      return (
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
            alt="failure view"
          />
          <h1>Oops! Something Went Wrong</h1>
          <p>We cannot seem to find the page you are looking for</p>
          <button type="button" onClick={this.getProducts}>
            Retry
          </button>
        </div>
      )
    }
    return this.OnClickNotFoundPage()
  }

  renderLoader = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    const {isLoading} = this.state

    return (
      <div className="all-products-section">
        {isLoading ? this.renderLoader() : this.renderProductsList()}
      </div>
    )
  }
}

export default EachCompanyDetails
