const express = require('express')
const cors = require('cors')
const {invoiceList, vendorList, config} = require('./data')

const app = express()
app.use(express.json())
app.use(cors())

const router = express.Router()

app.get('/app/config',(req,res)=>{
    res.status(200).send(config)
})

app.get('/invoices',(req,res)=>{
    res.status(200).send(invoiceList)
})

app.get('/vendors',(req,res)=>{
    res.status(200).send(vendorList)
})

app.post('/credit/apply',(req,res)=>{
    // You can print the req body
    console.log(req.body)
    res.status(200).send("Credit Applied") 
})

app.post('/payment',(req,res)=>{
    // You can print the req body
    console.log(req.body)
    res.status(200).send("Payment Done") 
})

app.listen(8000,()=>{
    console.log("Server started on PORT 8000")
})