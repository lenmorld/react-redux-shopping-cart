import React, { Component } from "react"
import formatCurrency from "../util"

export default class Cart extends Component {
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
      cartItems: this.props.cartItems
    }

    this.props.createOrder(order)
  }

  render() {
    const { cartItems } = this.props

    return (
      <div>
        <div className="cart cart-header">
          {cartItems.length === 0
            ? "Cart is empty"
            : `You have ${cartItems.length} in the cart`}
        </div>
        <div className="cart">
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
                )
              }
            </div>
          )
        }
      </div>
    )
  }
}
