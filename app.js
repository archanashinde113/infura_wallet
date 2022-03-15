const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose')
const Web3 = require("web3");
const web3  =  new Web3("https://ropsten.infura.io/v3/9cc53a94cc4a42b793e399fd8b0d5755");
const web3_bnb = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
const app = express()
app.use(express.json());
const controller= require('./controller/controller.wallet.js');
const receiptApi = require('./model/model.wallet.js');
const bodyParser =require('body-parser');
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }))
// fetch a balance
app.get('/balance', controller.balance);

// For Transaction
app.post('/transaction',controller.transaction);

// for Binance fetch balance
app.get('/bnbBalance',controller.bnbBalance);

//Binance For Transaction 
app.post('/bnbTransaction',controller.bnbTransaction);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
