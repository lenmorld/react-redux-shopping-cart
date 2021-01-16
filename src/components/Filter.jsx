import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    filterProducts, sortProducts
} from '../actions/productActions'

class Filter extends Component {
    render() {
        return !this.props.filteredProducts ? (
            <div>Loading...</div>
        ) : (
                <div className="filter">
                    <div className="filter-result">{this.props.filteredProducts.length} Products</div>
                    <div className="filter-sort">
                        Order{" "}
                        {/* <select value={this.props.sort} onChange={this.props.sortProducts}> */}
                        <select value={this.props.sort}
                            onChange={(e) =>
                                this.props.sortProducts(
                                    this.props.filteredProducts,
                                    e.target.value)}>
                            <option>Latest</option>
                            <option value="lowest">Lowest</option>
                            <option value="highest">Highest</option>
                        </select>
                    </div>
                    <div className="filter-size">
                        Filter{" "}
                        {/* <select value={this.props.filter} onChange={this.props.filterProducts}> */}
                        <select value={this.props.filter}
                            onChange={(e) =>
                                this.props.filterProducts(
                                    this.props.products,
                                    e.target.value)}>
                            <option value="">ALL</option>
                            <option value="XS">XS</option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                            <option value="XXL">XXL</option>
                        </select>
                    </div>
                </div>
            )
    }
}


const mapStateToProps = (state) => ({
    size: state.products.size,
    sort: state.products.sort,
    // - count
    // - sort
    // - sortProducts
    // - filter
    // - filterProducts
    products: state.products.items, // items from FETCH_PRODUCTS 
    filteredProducts: state.products.filteredItems, // filteredItems from FILTER_PRODUCTS_BY_SIZE, SORT_PRODUCTS_BY_PRICE
})

const mapDispatchToProps = {
    filterProducts,
    sortProducts
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
