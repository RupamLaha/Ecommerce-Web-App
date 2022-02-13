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

// // /user/login
// // user login authentication...
// router.post('/',(req,res)=>{

//     let email = req.body.email
//     let pass = req.body.password

//     // res.send(req.body)

//     let query = `select id, email, role from users where email = '${email}' and password = '${pass}'`;

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

//             res.send(successRes)
//         }
//     })
// })


// bcrypt use...

// /user/login
// user login authentication...
router.post('/',(req,res)=>{

    let email = req.body.email
    let pass = req.body.password

    let query = `select id, email, password, role from users where email = '${email}'`;

    // var result1 = {}

    connection.query(query, (err, result) => {
        if(err){
            console.log(err.message)
            var errRes = {
                code: err.code,
                message: err.message 
            }

            console.log("Querry error block")
            // result1 = errRes
            res.send(errRes)
        }else{

            if(result.length != 0){

                let hash = result[0].password

                let id = result[0].id
                let email = result[0].email
                let role = result[0].role

                bcrypt.compare(pass, hash, function(err1, verify) {

                    // if(err1){

                    //     console.log(err.message)
                    //     var errRes = {
                    //         code: err.code,
                    //         message: err.message 
                    //     }

                    //     result1 = errRes

                    //     // res.send(errRes)

                    // }else{

                        if(verify){

                            var successRes = {
                                code: 'success',
                                message: [{id, email, role}]
                            }

                            console.log("Password verifired = true block")

                            console.log(successRes)

                            // result1 = successRes
            
                            res.send(successRes)

                        }else{

                            var successRes = {
                                code: 'success',
                                message: "Wrong credential"
                            }

                            console.log("Password verifired = false block")

                            // result1 = successRes
            
                            res.send(successRes)

                        }

                    // }
                    // result == true
                })

                // console.log(result)

            }else{

                var successRes = {
                    code: 'success',
                    message: "Wrong credential"
                }

                console.log("Query result length 0 else block")
                // result1 = successRes

                res.send(successRes)

            }
        }

        // console.log(result1)
        // res.send(result1)
        
    })
})


module.exports = router