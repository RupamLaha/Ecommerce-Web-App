const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt');

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

// // /user/registration
// // user registration...
// router.post('/',(req,res)=>{

//     // res.send({apiSideData: req.body})

//     let name = req.body.name
//     let email = req.body.email
//     let pass = req.body.password
//     let address = req.body.address

//     // name email password address
//     let query = `insert into users (name, email, password, address) values ('${name}','${email}','${pass}', '${address}')`;

//     connection.query(query, (err, result) => {
//         if(err){
//             console.log(err.message)
//             var errRes = {
//                 code: err.code,
//                 message: err.message 
//             }

//             res.send(errRes)
//         }else{

//             var successRes = {
//                 code: 'success',
//                 message: result
//             }

//             res.json(successRes)
//             // res.send(result.json)
//         }
//     })
// })


//using bcrypt to hash the password..

// /user/registration
// user registration...
router.post('/',(req,res)=>{

    // res.send({apiSideData: req.body})

    let name = req.body.name
    let email = req.body.email
    let pass = req.body.password
    let address = req.body.address

    // const hash = bcrypt.hash(pass, 10)
    // console.log(hash)

    bcrypt.hash(pass, 10, function(err, hash) {
        // Store hash in your password DB.
        if(err){
            console.log(err.message)

            var errRes = {
                code: err.code,
                message: err.message 
            }

            res.send(errRes)
            
        }else{
            console.log(hash)

            let query = `insert into users (name, email, password, address) values ('${name}','${email}','${hash}', '${address}')`;

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

                    res.json(successRes)
                    // res.send(result.json)
                }
            })

        }
    });

    // name email password address
    // let query = `insert into users (name, email, password, address) values ('${name}','${email}','${hash}', '${address}')`;

    // connection.query(query, (err, result) => {
    //     if(err){
    //         console.log(err.message)
    //         var errRes = {
    //             code: err.code,
    //             message: err.message 
    //         }

    //         res.send(errRes)
    //     }else{

    //         var successRes = {
    //             code: 'success',
    //             message: result
    //         }

    //         res.json(successRes)
    //         // res.send(result.json)
    //     }
    // })
})

module.exports = router