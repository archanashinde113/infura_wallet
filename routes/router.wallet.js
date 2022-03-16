module.exports = app => {
    const controller= require('../controller/controller.wallet.js');
    var router = require("express").Router();
    // Create a new Tutorial
    router.get('/ethbalance', controller.ethbalance);

// For Transaction
router.post('/ethtransaction',controller.ethtransaction);

// for Binance fetch balance
router.get('/bnbBalance',controller.bnbBalance);

//Binance For Transaction 
router.post('/bnbTransaction',controller.bnbTransaction);

app.use('/receiptApi', router);
  };