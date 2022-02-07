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
router.post('/add',(req,res)=>{

    // /:userid/:prodid

    let userId = req.body.userId
    let prodId = req.body.prodId

    let query = `insert into cart (userid, prodid, quantity) values ('${userId}','${prodId}', '1')`;

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
// remove particular product from cart of the user by prodid...
router.delete('/remove/:userid/:prodid',(req,res)=>{

    let query = `delete from cart where userid = '${req.params.userid}' and prodid = '${req.params.prodid}'`;

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
router.put('/prod-quantity-incre/',(req,res)=>{

    // :userid/:prodid

    // console.log(req.body.userId)
    // console.log(req.body.prodId) 

    let userId = req.body.userId
    let prodId = req.body.prodId 

    let query = `UPDATE cart SET quantity = quantity + 1 WHERE userid = '${userId}' and prodid = '${prodId}'`;

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
router.put('/prod-quantity-decre/',(req,res)=>{

    let userId = req.body.userId
    let prodId = req.body.prodId 

    let query = `UPDATE cart SET quantity = quantity - 1 WHERE userid = '${userId}' and prodid = '${prodId}'`;

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