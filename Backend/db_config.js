
const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    //for security reasons removing pass...
    password: '',
    database: 'wowshop'
})

connection.connect(function(err){
    if(!!err){
        console.log(err.sqlMessage)
    }else{
        console.log('Connected to database...')
    }
})

module.exports = connection