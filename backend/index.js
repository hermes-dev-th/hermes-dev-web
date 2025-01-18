//Import lib
const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')
const nodemailer = require("nodemailer");
require('dotenv').config()


//port
const port = 8000

//declare app and app.use
const app = express()
app.use(cors())
app.use(bodyparser.json())


//root routes
app.get('/' , (req, res) => {
    res.send("hello hermes")
    
})

//post email with nodemailer
app.post('/emails' , async (req, res) =>{
    options = req.body
})


app.listen(port , (req ,res) =>{
    console.log(`run on http://localhost:${port}`);
})


module.exports = app