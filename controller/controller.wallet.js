//const express = require('express');
const Web3 = require("web3");
const mongoose = require('mongoose')
//const path = require('path');
const web3  =  new Web3("https://ropsten.infura.io/v3/9cc53a94cc4a42b793e399fd8b0d5755");
const web3_bnb = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
const receiptApi = require('../model/model.wallet.js');
//const bodyParser =require('body-parser');

// app.use(bodyParser.urlencoded({ extended: false }))

// Ropsten fetch Balance
exports.ethbalance = function(req,res){
  const transaction_from = req.body.transaction_from;
        web3.eth.getBalance(transaction_from, async (err, result) => {
            if (err) {
               console.log(err);
                return;
            }
           let balance = web3.utils.fromWei(result, "ether");
             res.json(balance + " ETH");
        });
        }


//Ropsten for Transaction
exports.ethtransaction = function(req,res){
  const transaction_from = req.body.transaction_from;
  const transaction_to = req.body.transaction_to;
  const value = req.body.value;
  const Private_Key = req.body.Private_Key;
  const transaction_hash = req.body.transaction_hash;

    async function eth_transaction(){
        const value = web3.utils.toWei(req.body.value, 'ether')   
      const SignedTransaction = await web3.eth.accounts.signTransaction({
           to: transaction_to, //process.env.to_address,
           value: value,
           gas: 200000,
           nonce: web3.eth.getTransactionCount(transaction_from)
      },  Private_Key);
    
      web3.eth.sendSignedTransaction(SignedTransaction.rawTransaction).then((receiptwallet) => {
            res.json(receiptwallet)

            const deatils = new receiptApi ({
              _id:new mongoose.Types.ObjectId(),
              transaction_from:transaction_from,
              transaction_to:transaction_to,
              transaction_hash: transaction_hash,
              value:value,
              Private_Key:Private_Key
          })
          deatils.save()
      })
    
     
    }
    eth_transaction();
    }

   

exports.bnbTransaction = function(req,res){
  const transaction_from = req.body.transaction_from;
  const transaction_to = req.body.transaction_to;
  const value = req.body.value;
  const transaction_hash = req.body.transaction_hash;
  const Private_Key = req.body.Private_Key;

    async function eth_transaction(){
        const value = web3.utils.toWei(req.body.value, 'ether')   
      const SignedTransaction = await web3_bnb.eth.accounts.signTransaction({
           to: transaction_to, //process.env.to_address,
           value: value,
           gas: 5000000,
           gasPrice: 18e9,
           nonce: web3_bnb.eth.getTransactionCount(transaction_from)
      },   Private_Key);
    
      web3_bnb.eth.sendSignedTransaction(SignedTransaction.rawTransaction).then((receiptwallet) => {
            res.json(receiptwallet)

            const deatils = new receiptApi ({
              _id:new mongoose.Types.ObjectId(),
              transaction_from:transaction_from,
              transaction_to:transaction_to,
              transaction_hash: transaction_hash,
              value:value,
              Private_Key:Private_Key
          })
          deatils.save()
      })
    
     
    }
    eth_transaction();
    }

    //Binance balance
  exports.bnbBalance= function(req,res){
    const transaction_from = req.body.transaction_from;
    web3_bnb.eth.getBalance( transaction_from, async (err, result) => {
        if (err) {
           console.log(err);
            return;
        }
        let balance = web3.utils.fromWei(result, "ether");
         res.json(balance + " BNB");
    });    
}
