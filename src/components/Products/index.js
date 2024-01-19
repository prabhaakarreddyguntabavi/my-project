import AllJobsSections from '../AllJobsSections'

import Header from '../Header'

import './index.css'

const Products = props => {
  const {salaryRangesList, employmentTypesList} = props
  console.log(props)

  return (
    <>
      <Header />
      <div className="product-sections">
        <AllJobsSections
          salaryRangesList={salaryRangesList}
          employmentTypesList={employmentTypesList}
        />
      </div>
    </>
  )
}

export default Products
