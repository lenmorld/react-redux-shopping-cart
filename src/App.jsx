import React from 'react'
import Cart from './components/Cart'
import Filter from './components/Filter'
import Products from './components/Products'
import data from './data'

// import logo from './logo.svg';
// import './App.css';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      products: data.products,
      cartItems: JSON.parse(localStorage.getItem("cartItems") || "[]"),
      size: "",
      sort: ""
    }
  }

  createOrder = (order) => {
    alert("Save " + order.name)
  }

  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.filter(item => item._id !== product._id)

    this.setState({
      cartItems
    })

    localStorage.setItem("cartItems", JSON.stringify(cartItems))
  }

  addToCart = (product) => {
    if (this.state.cartItems.find(item => item._id === product._id)) {
      console.error("already in cart")
    } else {

      const cartItems = [...this.state.cartItems, {
        ...product,
        count: 1
      }]

      this.setState({
        cartItems
      })

      localStorage.setItem("cartItems", JSON.stringify(cartItems))
    }
  }

  sortProducts = (event) => {
    console.log(event.target.value)

    const sort = event.target.value

    this.setState({
      sort: sort,
      products: [...data.products].sort((a, b) => {
        if (sort === "lowest") {
          return a.price > b.price ? 1 : -1;
        } else if (sort === "highest") {
          return a.price < b.price ? 1 : -1;
        } else {
          return a._id > b._id ? 1 : -1;
        }
      })
    })
  }

  filterProducts = (event) => {
    console.log(event.target.value)

    const size = event.target.value;

    if (!size) {
      this.setState({
        size: "",
        products: data.products
      })
    } else {
      this.setState({
        size: size,
        products: data.products.filter(product => product.availableSizes.includes(size))
      })
    }
  }

  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/">React shopping cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
              />
              <Products products={this.state.products} addToCart={this.addToCart} />
            </div>
            <div className="sidebar">
              <Cart cartItems={this.state.cartItems} removeFromCart={this.removeFromCart} createOrder={this.createOrder} />
            </div>
          </div>
        </main>
        <footer>
          All rights reserved
        </footer>
      </div>
    );
  }

}

export default App;


/*
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

*/