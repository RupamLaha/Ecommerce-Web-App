const express = require('express')
const bodyParser = require('body-parser')

const router = express.Router()

var connection = require('../../db_config')

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
router.use(bodyParser.json())

//middleware
router.use('/', (req,res,next) => {
    console.log('Middleware wall')
    next()
})

// /user/cart
// get all cart products of particular user by userid...
router.get('/:id',(req,res)=>{

    let query = `select * from cart join products on cart.prodid = products.id where cart.userid = ${req.params.id}`;

    connection.query(query, (err, result) => {
        if(err){
            console.log(err.message)
            var errRes = {
                code: err.code,
                message: err.message 
            }

            res.send(errRes)
        }else{

            var successRes = {
                code: 'success',
                message: result
            }

            res.send(successRes)
        }
    })
})

// /user/cart/add
// insert particular product into user cart by prodid...
router.post('/add/:userid/:prodid',(req,res)=>{

    let query = `insert into cart (userid, prodid, quantity) values ('${req.params.userid}','${req.params.prodid}', '1')`;

    connection.query(query, (err, result) => {
        if(err){
            console.log(err.message)
            var errRes = {
                code: err.code,
                message: err.message 
            }

            res.send(errRes)
        }else{

            var successRes = {
                code: 'success',
                message: result
            }

            res.send(successRes)
        }
    })
})

// /user/cart/remove
// remove particular product from cart of the user by cartid...
router.delete('/remove/:cartid',(req,res)=>{

    let query = `delete from cart where id = ${req.params.cartid}`;

    connection.query(query, (err, result) => {
        if(err){
            console.log(err.message)
            var errRes = {
                code: err.code,
                message: err.message 
            }

            res.send(errRes)
        }else{

            var successRes = {
                code: 'success',
                message: result
            }

            res.send(successRes)
        }
    })
})

// /user/cart/prod-quantity-incre
// increment prod quantity in users cart...
router.put('/prod-quantity-incre/:cartid',(req,res)=>{

    let query = `UPDATE cart SET quantity = quantity + 1 WHERE id = '${req.params.cartid}'`;

    connection.query(query, (err, result) => {
        if(err){
            console.log(err.message)
            var errRes = {
                code: err.code,
                message: err.message 
            }

            res.send(errRes)
        }else{

            var successRes = {
                code: 'success',
                message: result
            }

            res.send(successRes)
        }
    })
})

// /user/cart/prod-quantity-decre
// decrement prod quantity in users cart...
router.put('/prod-quantity-decre/:cartid',(req,res)=>{

    let query = `UPDATE cart SET quantity = quantity - 1 WHERE id = '${req.params.cartid}'`;

    connection.query(query, (err, result) => {
        if(err){
            console.log(err.message)
            var errRes = {
                code: err.code,
                message: err.message 
            }

            res.send(errRes)
        }else{

            var successRes = {
                code: 'success',
                message: result
            }

            res.send(successRes)
        }
    })
})

module.exports = router