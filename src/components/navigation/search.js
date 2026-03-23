import { Fragment, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {get_categories} from '../../redux/actions/categories'
import {get_products, get_filtered_products} from '../../redux/actions/products'
import ProductCard from '../../components/products/ProductCard'
// En el archivo que importa (categoria.js)
import { prices } from '../../helpers/fixedPrices';




const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
]
const subCategories = [
  { name: 'Totes', href: '#' },
  { name: 'Backpacks', href: '#' },
  { name: 'Travel Bags', href: '#' },
  { name: 'Hip Bags', href: '#' },
  { name: 'Laptop Sleeves', href: '#' },
]
const filters = [
  {
    id: 'color',
    name: 'Color',
    options: [
      { value: 'white', label: 'White', checked: false },
      { value: 'beige', label: 'Beige', checked: false },
      { value: 'blue', label: 'Blue', checked: true },
      { value: 'brown', label: 'Brown', checked: false },
      { value: 'green', label: 'Green', checked: false },
      { value: 'purple', label: 'Purple', checked: false },
    ],
  },
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'new-arrivals', label: 'New Arrivals', checked: false },
      { value: 'sale', label: 'Sale', checked: false },
      { value: 'travel', label: 'Travel', checked: true },
      { value: 'organization', label: 'Organization', checked: false },
      { value: 'accessories', label: 'Accessories', checked: false },
    ],
  },
  {
    id: 'size',
    name: 'Size',
    options: [
      { value: '2l', label: '2L', checked: false },
      { value: '6l', label: '6L', checked: false },
      { value: '12l', label: '12L', checked: false },
      { value: '18l', label: '18L', checked: false },
      { value: '20l', label: '20L', checked: false },
      { value: '40l', label: '40L', checked: true },
    ],
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Search = ({
  get_categories,
    categories,
    get_products,
    products,
    get_filtered_products,
    searched_products,
    filtered_products
}) => {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [filtered, setFiltered] = useState(false)
   

   

    useEffect(() => {
        get_categories()
        get_products()
        window.scrollTo(0,0)
    }, [])

   

    const showProducts = () => {
      let results = []
      let display = []

      if (
        searched_products &&
        searched_products !== null &&
        searched_products !== undefined
      ) {
        searched_products.map((product, index) => {
            return display.push(
                <div key={index}>
                    <ProductCard product={product}/>
                </div>
            );
        });
      } 

      for (let i = 0; i < display.length; i += 3) {
        results.push(
          <div key={i} className='grid md:grid-cols-3 '>
              {display[i] ? display[i] : <div className=''></div>}
              {display[i+1] ? display[i+1] : <div className=''></div>}
              {display[i+2] ? display[i+2] : <div className=''></div>}
          </div>
          
        )
      }
    
      return results

    }



    return (
      <div>
      <div className="bg-sofi-50">
<div>

  <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


    <section aria-labelledby="products-heading" className="pt-6 pb-24">
      <h2 id="products-heading" className="sr-only">
        Products
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
        {/* Filters */}

        {/* Product grid */}
        <div className="lg:col-span-3">
          {/* Replace with your content */}

          {products && showProducts()}

        </div>
      </div>
    </section>
  </main>
</div>
</div>
  </div>
    )
}

const mapStateToProps = state => ({
    categories: state.Categories.categories,
    products: state.Products.products,
    searched_products: state.Products.search_products,
    filtered_products: state.Products.filtered_products
})

export default connect(mapStateToProps,{
  get_categories,
  get_products,
  get_filtered_products
})(Search)