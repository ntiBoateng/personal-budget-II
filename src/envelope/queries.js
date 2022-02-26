const getEnvelope = 'SELECT * FROM budget';
const getEnvelopeById = "SELECT * FROM budget WHERE id =$1";

const checkBudgetExists = 'SELECT s FROM budget s WHERE s.title = $1';

const addEnvelope = 'INSERT INTO budget (title, budget) VALUES ($1, $2) RETURNING *';

const deleteEnvelopeById = "DELETE FROM budget WHERE id = $1";

const updateEnvelope ="UPDATE budget SET title = $1, budget = $2 WHERE id = $3 RETURNING *";
/*
//const transferFrom = 'UPDATE budget SET budget = budget - $1 WHERE id = $2 AND $1 < budget RETURNING *';
const transferFrom = 'UPDATE budget SET budget = budget - $1 WHERE id = $2 AND $1 <= budget RETURNING *'

const transferTo = 'UPDATE budget SET budget = budget + $1 WHERE id = $2 RETURNING *'; */

const envelopeQuery  = "SELECT * FROM budget WHERE budget.id = $1";
const transactionQuery = "INSERT INTO transaction (budget_id, transaction_name, amount, date)VALUES ($1,$2,$3,$4) RETURNING *";
const updateEnvDRQuery = "UPDATE budget SET budget = budget - $1 WHERE id = $2 AND $1 <= budget RETURNING *";

const updateEnvCRQuery = "UPDATE budget SET budget = budget + $1 WHERE id = $2 RETURNING *";

const getTransactionByEnvelopeId = "SELECT * transaction WHERE budget_id = $1"

                                                        


module.exports = {
    getEnvelope,
    getEnvelopeById,
    checkBudgetExists,
    addEnvelope,
    deleteEnvelopeById,
    updateEnvelope,
    envelopeQuery,
    transactionQuery,
    updateEnvDRQuery,
    updateEnvCRQuery,
    getTransactionByEnvelopeId,
    

};

