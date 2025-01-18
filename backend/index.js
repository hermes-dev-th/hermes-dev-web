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
    const{ to , subject, text, html } = req.body;
    //check user info
    if(!to || !subject || (!text && !html)) {
        return res.status(400).send({message: "Missing required email field."});
    }

    //create transporter
    try {
        const transporter = nodemailer.createTransport({
            service : 'gmail',
            auth : {
                user : 'hermes.software.dev@gmail.com',
                pass : 'xumfyf-cyhvab-5pIcpa'
            }
        });
        
        const mailOptions = {
            from : 'hermes.software.dev@gmail.com',
            to : to,
            subject : subject,
            text : text,
            html : html
        };

        const info = await transporter.sendMail(mailOptions);
        res.status(200).send({message : 'Email sent successfully!', info});
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).send({message : "Failed to send email.", error});
    }
})


app.listen(port , (req ,res) =>{
    console.log(`run on http://localhost:${port}`);
})


module.exports = app