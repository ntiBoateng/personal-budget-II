const { addTransaction } = require("./transactionControllers");

const getTransaction = 'SELECT * FROM transaction';


const getTransactionById = 'SELECT * FROM transaction WHERE transaction_id = $1';


const updateTransaction ="UPDATE transaction SET  transaction_name = $1, amount = $2, date = $3 WHERE transaction_id = $4 RETURNING *";
        

const deleteTransactionById = "DELETE FROM transaction WHERE transaction_id = $1";


const transactionQuery = "SELECT * FROM transaction WHERE budget_id = $1";


const prevAmountQuery = "SELECT amount FROM transaction WHERE budget_id = $1";


const updateTransactionQuery = "UPDATE transaction SET transaction_name = $1, amount = $2 WHERE id = $3 RETURNING *";


const updateEnvBudgetQuery =
	`UPDATE
		budget
	SET
		budget = (budget + $1) - $2
	WHERE
		id IN (SELECT budget_id FROM transactions WHERE id=$3)`;

        
module.exports ={
    deleteTransactionById,
    updateTransaction,
    getTransaction,
    getTransactionById,
    transactionQuery,
    prevAmountQuery,
    updateTransactionQuery,
    updateEnvBudgetQuery,

}