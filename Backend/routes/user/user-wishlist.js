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

// /user/wishlist
// get users all wishlist...
router.get('/:id',(req,res)=>{

    let query = `select * from wishlist join products on wishlist.prodid = products.id where wishlist.userid = ${req.params.id}`;

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

// /user/wishlist
// check particular product is present is users wishlist...
router.get('/:userid/:prodid',(req,res)=>{

    let query = `select * from wishlist where userid = '${req.params.userid}' and prodid = '${req.params.prodid}'`;

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


// /user/wishlist/add
// add particular product into wishlist of the user by prodid...
router.post('/add/',(req,res)=>{

    // :userid/:prodid

    let userId = req.body.userId
    let prodId = req.body.prodId

    let query = `insert into wishlist (prodid, userid) values ('${prodId}','${userId}')`;

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



// /user/wishlist/remove
// remove particular product from wishlist of the user by wishlistid...
router.delete('/remove/:userid/:prodid',(req,res)=>{

    let query = `delete from wishlist where userid = '${req.params.userid}' and prodid = '${req.params.prodid}'`;

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