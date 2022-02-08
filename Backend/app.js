const express = require('express')
const bodyParser = require('body-parser')
const cors =  require('cors')
const bcrypt = require('bcrypt');
var mysql = require('./db_config')

//user routes files...
const userLogin = require('./routes/user/user-login')
const userRegistration = require('./routes/user/user-registration')
const userProducts = require('./routes/user/user-products')
const userProfile = require('./routes/user/user-profile')
const userWishlist = require('./routes/user/user-wishlist')
const userCart = require('./routes/user/user-cart')
const userOrderHistory = require('./routes/user/user-order-history')


//admin routes files...
const adminLogin = require('./routes/admin/admin-login')
const adminProducts = require('./routes/admin/admin-products')
const adminOrders = require('./routes/admin/admin-orders')
const adminProfile = require('./routes/admin/admin-profile')

const app = express()

app.use(cors())
app.use(bodyParser.json())

//user routes...
app.use('/user/login', userLogin)
app.use('/user/registration', userRegistration)
app.use('/user/products', userProducts)
app.use('/user/profile', userProfile)
app.use('/user/wishlist', userWishlist)
app.use('/user/cart', userCart)
app.use('/user/order-history', userOrderHistory)


//admin routes...
app.use('/admin/login', adminLogin)
app.use('/admin/products', adminProducts)
app.use('/admin/orders', adminOrders)
app.use('/admin/profile', adminProfile)

app.listen(3000, ()=>{
    console.log('Server running...and listing to the port 3000')
})