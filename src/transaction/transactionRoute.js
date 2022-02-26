const {Router} = require('express');


const transactionControllers = require('./transactionControllers.js');


const transactionRoute = Router();
/*
transactionRoute.get('/', (req,res)=>{
    res.send('Using transaction route')
});*/

//Get all transactions
transactionRoute.get('/', transactionControllers.getTransaction);

// Get transaction by Id
transactionRoute.get('/:id', transactionControllers.getTransactionById);


//Update transaction
transactionRoute.put('/:id', transactionControllers.updateTransaction);



//Delete transaction
transactionRoute.delete('/:id', transactionControllers.deleteTransactionById);


module.exports = transactionRoute;  