const pool = require('../../db.js');
const transactionQuerie = require('./transactionQuerie.js');
const queries = require('../envelope/queries');
const { rows } = require('pg/lib/defaults');


const getTransaction = (req, res) =>{

    pool.query(transactionQuerie.getTransaction, (error, results)=>{
        if (!results.rows.length) {
            return res.status(404).send({
            message: "There are no transactions"
            
            });
      
        };
        res.status(200).json(results.rows);
        return;
    })
};

const getTransactionById =(req,res) =>{
    const transaction_id = parseInt(req.params.id);
    pool.query(transactionQuerie.getTransactionById, [transaction_id], (error,results)=>{

        if(!results.rows.length){
            return res.send(`There is no transaction with id of ${transaction_id} in the database`)
          }
        //if (error) throw error;

        res.status(200).json(results.rows);
        return;
    })
};

const deleteTransactionById = (req,res) =>{
    //const budget_id = parseInt(req.params.transaction_id);
    const transaction_id = parseInt(req.params.id);
    
        pool.query(transactionQuerie.getTransactionById, [transaction_id], (error, results)=>{
            if(!results.rows.length){
              return res.send(`There is no transaction with id of ${transaction_id } in the database`)
            }
        pool.query(transactionQuerie.deleteTransactionById, [transaction_id], (error, results)=>{

            if (error) throw error;
            return res.status(200).send('Envelope successfuly deleted from the database');
        })    
        })

    }

const updateTransaction = (req,res)=> {
    
    const transaction_id= parseInt(req.params.id);
    

    const date = new Date();
        //get trancastion name and amount of transaction to update
    const {transaction_name, amount} = req.body;
    
    
    
        //check if transaction exists
    pool.query(transactionQuerie.getTransactionById,[transaction_id], (error, results)=>{
    const invalidId = !results.rows.length;
    if (invalidId){
            return res.send('Transaction does not exist in the database');
        }
        pool.query(transactionQuerie.updateTransaction, [transaction_name,amount,date,transaction_id], (error, results)=>{
            if (error) throw error;
                res.status(200).send('Transaction successfully updated');
            })
            }
         )
    
    
    };

module.exports = {
    getTransaction,
    getTransactionById,
    deleteTransactionById,
    updateTransaction,    
    };
