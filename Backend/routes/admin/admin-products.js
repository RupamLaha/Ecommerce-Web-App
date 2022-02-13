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

// /admin/products
// all products...
router.get('/',(req,res)=>{

    let query = `select * from products`;

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

    // res.end()
})

// /admin/products
// get product by id...
router.get('/id/:id',(req,res)=>{

    console.log("api side")
    // console.log("api side req.body = " + req.body)
    // console.log("api side req.body.id = " + req.body.id)

    let query = `select * from products where id = '${req.params.id}'`;

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

// /admin/products/add
// add new product...
router.post('/add/',(req,res)=>{

    // :id/:name/:desc/:price

    // let id = req.body.id
    let name = req.body.name
    let price = req.body.price
    let desc = req.body.description

    let query = `INSERT INTO products (name, description, price) VALUES ('${name}', '${desc}', '${price}')`;

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

// /admin/products/edit
// edit product...
router.put('/edit/',(req,res)=>{

    console.log("api Side = "+req.body.id)

    let query = `UPDATE products SET name = '${req.body.name}', description = '${req.body.description}', price = '${req.body.price}' WHERE id = '${req.body.id}'`;

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

// /admin/products/delete
// delete product...
router.delete('/delete/:id',(req,res)=>{

    console.log("api Side = "+req.params.id)

    let query = `delete from products where id = '${req.params.id}';`;

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