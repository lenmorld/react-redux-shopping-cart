import React, { Component } from "react"
import Modal from 'react-modal'
import Zoom from 'react-reveal/Zoom'
import formatCurrency from "../util"
import Fade from 'react-reveal/Fade'
import { connect } from 'react-redux'
import { removeFromCart } from '../actions/cartActions'

import { clearOrder, createOrder } from '../actions/orderActions'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      email: "",
      address: "",
      showCheckout: false
    }
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  createOrder = (e) => {
    e.preventDefault()

    // THIS DOESN'T WORK?
    // const [name, email, address] = this.state
    const name = this.state.name
    const email = this.state.email
    const address = this.state.address

    const order = {
      name,
      email,
      address,
      cartItems: this.props.cartItems,
      total: this.props.cartItems.reduce((acc, curr) => {
        return acc + (curr.price * curr.count)
      }, 0)
    }

    this.props.createOrder(order)
  }

  closeModal = () => {
    this.props.clearOrder()
  }

  render() {
    const { cartItems, order } = this.props

    return (
      <div>
        <div className="cart cart-header">
          {cartItems.length === 0
            ? "Cart is empty"
            : `You have ${cartItems.length} in the cart`}
        </div>
        {
          order && <Modal isOpen={true} onRequestClose={this.closeModal}>
            <Zoom>
              <button className="close-modal"
                onClick={this.closeModal}>x</button>
              <div className="order-details">
                <h3 className="success-message">Your order has been placed</h3>
                <h2>Order {order._id}</h2>
                <ul>
                  <li>
                    <div>Name:</div>
                    <div>{order.name}</div>
                  </li>
                  <li>
                    <div>Email:</div>
                    <div>{order.email}</div>
                  </li>
                  <li>
                    <div>Address:</div>
                    <div>{order.address}</div>
                  </li>
                  <li>
                    <div>Date:</div>
                    <div>{order.createdAt}</div>
                  </li>
                  <li>
                    <div>Total:</div>
                    <div>{formatCurrency(order.total)}</div>
                  </li>
                  <li>
                    <div>Cart items:</div>
                    <div>{order.cartItems.map(_item => (
                      <div>
                        {_item.count}{" "}{_item.title}
                      </div>
                    ))}</div>
                  </li>
                </ul>
              </div>
            </Zoom>
          </Modal>
        }
        <div className="cart">
          <Fade left cascade>
            <ul className="cart-items">
              {cartItems.map((item) => (
                <li key={item._id}>
                  <div>
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div>
                    <div>{item.title}</div>
                    <div className="right">
                      {formatCurrency(item.price)}
                      {' '}
                    x{item.count}
                      {' '}
                      <button
                        className="button"
                        onClick={() => this.props.removeFromCart(item)}
                      >
                        Remove
                    </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Fade>
        </div>
        {
          cartItems.length && (
            <div>
              <div className="cart">
                <div className="total">
                  <div>
                    Total: {' '}
                    {formatCurrency(
                      cartItems.reduce((acc, curr) => {
                        return acc + curr.price
                      }, 0),
                    )}
                  </div>
                  <button onClick={() => this.setState({ showCheckout: true })} className="button primary">
                    Proceed
                </button>
                </div>
              </div>
              {
                this.state.showCheckout && (
                  <Fade right cascade>
                    <div className="cart">
                      <form onSubmit={this.createOrder}>
                        <ul className="form-container">
                          <li>
                            <label>Email</label>
                            <input name="email" type="email" required onChange={this.handleInput} />
                          </li>
                          <li>
                            <label>Name</label>
                            <input name="name" type="text" required onChange={this.handleInput} />
                          </li>
                          <li>
                            <label>Address</label>
                            <input name="address" type="text" required onChange={this.handleInput} />
                          </li>
                          <li>
                            <button className="button primary" type="submit">Checkout</button>
                          </li>
                        </ul>
                      </form>
                    </div>
                  </Fade>
                )
              }
            </div>
          )
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems,
  order: state.order.order
})

const mapDispatchToProps = {
  removeFromCart,
  createOrder,
  clearOrder
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
