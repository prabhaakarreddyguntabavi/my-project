/* eslint-disable react/no-unused-state */
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {IoSearchOutline} from 'react-icons/io5'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'

import './index.css'

class AllJobsSections extends Component {
  state = {
    productsList: [],
    isLoading: false,
    searchInput: '',
    noAccess: false,
    categoryFilterId: [],
    ratingsListId: '',
    isSearch: false,
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      isLoading: true,
    })
    const jwtToken = Cookies.get('jwt_token')

    const {
      //   activeOptionId,
      ratingsListId,
      searchInput,
      categoryFilterId,
    } = this.state

    let apiUrl = 'https://apis.ccbp.in/jobs'

    if (
      searchInput !== '' ||
      categoryFilterId.length > 0 ||
      ratingsListId !== ''
    ) {
      apiUrl += `?`

      if (categoryFilterId.length > 0) {
        apiUrl += `employment_type=${categoryFilterId.join(',')}&`
      }

      if (ratingsListId !== '') {
        apiUrl += `minimum_package=${ratingsListId}&`
      }

      if (searchInput !== '') {
        apiUrl += `search=${searchInput}&`
      }

      apiUrl = apiUrl.slice(0, -1)
    }

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const fetchedData = await response.json()

      const updatedData = fetchedData.jobs.map(product => ({
        title: product.title,
        jobDescription: product.job_description,
        employmentType: product.employment_type,
        id: product.id,
        companyLogoUrl: product.company_logo_url,
        location: product.location,
        packagePerAnnum: product.package_per_annum,
        rating: product.rating,
      }))

      this.setState({
        productsList: updatedData,
        isLoading: false,
        noAccess: false,
      })
    } else {
      this.setState({
        isLoading: false,
        noAccess: true,
      })
    }
  }

  categoryOptionsFilter = salaryRangeId => {
    const {categoryFilterId} = this.state

    let updatedCategoryFilterId

    if (categoryFilterId.includes(salaryRangeId)) {
      updatedCategoryFilterId = categoryFilterId.filter(
        item => item !== salaryRangeId,
      )
    } else {
      updatedCategoryFilterId = [...categoryFilterId, salaryRangeId]
    }

    this.setState(
      {
        categoryFilterId: updatedCategoryFilterId,
      },
      this.getProducts,
    )
  }

  ratingsListFilter = ratingsListId => {
    this.setState(
      {
        ratingsListId,
      },
      this.getProducts,
    )
  }

  searchResult = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  searchDetails = () => {
    const {searchInput} = this.state
    return (
      <div className="products-header">
        <div className="search-container">
          <input
            id="inputValue"
            type="search"
            value={searchInput}
            placeholder="Search"
            className="search-input-element"
            onChange={this.searchResult}
          />
          <button data-testid="searchButton" type="button">
            <IoSearchOutline
              onClick={this.getProducts}
              className="sort-by-icon"
            />
            {}
          </button>
        </div>
      </div>
    )
  }

  renderProductsList = () => {
    const {productsList, noAccess} = this.state

    if (productsList.total !== 0) {
      return (
        <div className="all-products-container">
          {this.searchDetails()}
          {!noAccess ? (
            <ul className="products-list">
              {productsList.map(product => (
                <ProductCard productData={product} key={product.id} />
              ))}
            </ul>
          ) : (
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
          )}
        </div>
      )
    }
    return (
      <div className="all-products-container">
        {this.searchDetails()}
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
          />
          <h1>No Products Found</h1>
          <p>We could not find any jobs. Try other filters</p>
        </div>
      </div>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    const {categoryFilterId, ratingsListId, isLoading} = this.state

    return (
      <div className="all-products-section">
        <div className="product-header-container">
          <div className="filter-container">
            <FiltersGroup
              categoryOptionsFilter={this.categoryOptionsFilter}
              ratingsListFilter={this.ratingsListFilter}
              categoryFilterId={categoryFilterId}
              ratingsListId={ratingsListId}
            />
            {isLoading ? this.renderLoader() : this.renderProductsList()}
          </div>
        </div>
      </div>
    )
  }
}

export default AllJobsSections
