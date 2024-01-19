import {FaLocationArrow, FaShoppingBag, FaRegStar} from 'react-icons/fa'
import {Link} from 'react-router-dom'

import './index.css'

const ProductCard = props => {
  const {productData} = props
  const {
    title,
    rating,
    location,
    employmentType,
    packagePerAnnum,
    jobDescription,
    companyLogoUrl,
    id,
  } = productData

  return (
    <li className="product-item">
      <Link to={`/jobs/${id}`} className="text-styles">
        <div className="heading_container">
          <div className="logo-container">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="company logo"
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
          <h1>Description</h1>
          <p>{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}
export default ProductCard
