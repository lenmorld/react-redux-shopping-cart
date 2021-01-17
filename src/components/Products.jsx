import React, { Component } from 'react'
import formatCurrency from "../util"
import Fade from "react-reveal/Fade"
import Modal from 'react-modal'
import Zoom from "react-reveal/Zoom"
import { connect } from 'react-redux'
import { fetchProducts } from '../actions/productActions'
import { addToCart } from '../actions/cartActions'
class Products extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product: null,
        }
    }

    componentDidMount() {
        this.props.fetchProducts()
    }

    openModal = (product) => {
        this.setState({
            product
        })
    }

    closeModal = () => {
        this.setState({
            product: null
        })
    }

    render() {
        const { product } = this.state

        return (
            <div>
                <Fade bottom cascade>
                    {
                        !this.props.products ? <div>Loading...</div> : (
                            <ul className="products">
                                {this.props.products.map(product => (
                                    <li key={product._id}>
                                        <div className="product">
                                            <a href={"#" + product._id} onClick={() => this.openModal(product)}>
                                                <img src={product.image} alt={product.title} />
                                                <p>
                                                    {product.title}
                                                </p>
                                            </a>
                                        </div>
                                        <div className="product-price">
                                            <div>{formatCurrency(product.price)}</div>
                                            <button className="button primary" onClick={() => this.props.addToCart(product)}>Add to Cart</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )
                    }
                </Fade>
                {
                    product &&
                    <Modal isOpen={true} onRequestClose={this.closeModal}>
                        <Zoom>
                            <button className="close-modal " onClick={this.closeModal}>X</button>
                            <div>Modal</div>
                            <div className="product-details">
                                <img src={product.image} alt={product.title} />
                                <div className="product-details-description">
                                    <p>
                                        <strong>{product.title}</strong>
                                    </p>
                                    <p>
                                        {product.description}
                                    </p>
                                    <p>
                                        Available Sizes:{" "}
                                        {
                                            product.availableSizes.map(size => (
                                                <span>
                                                    {" "}
                                                    <button className="button">{size}</button>
                                                </span>
                                            ))
                                        }
                                    </p>
                                    <div className="product-price">
                                        <div>{formatCurrency(product.price)}</div>
                                        <button className="button primary" onClick={() => {
                                            this.props.addToCart(product)
                                            this.closeModal()
                                        }}>
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Zoom>
                    </Modal>
                }
            </div>
        )
    }
}

/*
connect() - connects a React component to a Redux store

 connect(mapStateToProps, mapDispatchToProps)
 - mapStateToProps - accepts state and returns object defining which part of
   redux store we want to use
- mapDispatchToProps - list of actions

returns hoc that wraps component
    - accepts component to connect
*/

// state.products.items - since productReducer returns { items: ... }
// const mapStateToProps = (state) => ({ products: state.products.items })
// use filteredItems from reducer
const mapStateToProps = (state) => ({ products: state.products.filteredItems })
const mapDispatchToProps = {
    fetchProducts,
    addToCart
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)
