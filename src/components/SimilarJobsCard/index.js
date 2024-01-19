import {FaLocationArrow, FaShoppingBag, FaRegStar} from 'react-icons/fa'

import './index.css'

const SimilarJobsCard = props => {
  const {similarJobsProductData} = props
  const {
    title,
    rating,
    location,
    employmentType,
    packagePerAnnum,
    jobDescription,
    companyLogoUrl,
  } = similarJobsProductData

  return (
    <li className="similar-product-item">
      <div className="heading_container">
        <div className="logo-container">
          <img
            src={companyLogoUrl}
            alt="similar job company logo"
            className="similar-website-logo"
          />
          <div className="logo-text-container">
            <p>{title}</p>
            <div className="rating-container">
              <FaRegStar className="star" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <h1>Description</h1>
        <p>{jobDescription}</p>
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
      </div>
    </li>
  )
}
export default SimilarJobsCard
