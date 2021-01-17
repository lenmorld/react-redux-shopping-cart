const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const shortid = require('shortid')

const app = express()

app.use(bodyParser.json())

// init mongoose db
mongoose.connect("mongodb://localhost/react-shopping-cart-db", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

// product model
// NOTE: shortid generates shorter _ids like 'ogozABaJ8'
// instead of the long mongo id
const Product = mongoose.model("products", new mongoose.Schema({
    _id: { type: String, default: shortid.generate }, // create a new product will generate a shortid
    title: String,
    description: String,
    image: String,
    price: Number,
    availableSizes: [String],
}))

app.get("/api/products", async (req, res) => {
    const products = await Product.find({})
    res.send(products)
})

app.post("/api/products", async (req, res) => {
    const newProduct = new Product(req.body)
    const savedProduct = await newProduct.save()
    res.send(savedProduct)
})

app.delete("/api/products/:id", async (req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id)
    res.send(deletedProduct)
})

const Order = mongoose.model("order", new mongoose.Schema({
    _id: {
        type: String,
        default: shortid.generate
    },
    email: String,
    name: String,
    address: String,
    total: Number,
    cartItems: [{
        _id: String,
        title: String,
        price: Number,
        count: Number,
    }]
}, {
    timestamps: true, // adds createdAt, updatedAt
}))

app.post("/api/orders", async (req, res) => {
    if (!req.body.name ||
        !req.body.email ||
        !req.body.address ||
        !req.body.total ||
        !req.body.cartItems
    ) {
        return res.send({ message: "Data is incomplete" })
    }

    // const order = await Order(req.body).save()
    const newOrder = new Order(req.body)
    const savedOrder = await newOrder.save()
    res.send(savedOrder)
})

// start server
const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(">>> server at " + port)
})
