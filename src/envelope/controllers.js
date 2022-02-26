const pool = require('../../db.js');
const queries = require('./queries');



const getEnvelope = (req, res) =>{
    // pool.query(queries.getEnvelope, (error, results)=>{
    //    if (error) throw error;
    //    res.status(200).json(results.rows);  
    // });
};



const getTransationFromEnvelopeId = (req, res) =>{
    pool.query(queries.getTransactionByEnvelopeId, (error, results)=>{
        if (!results.rows.length) {
            res.status(404).send({
            message: "There are no transactions"
            });
      
        };
        res.status(200).json(results.rows);
        return;
    })
};



const getEnvelopeById = (req,res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getEnvelopeById, [id], (error, results) => {
        //if (error) throw error;
        const invalidId = !results.rows.length;
        if(invalidId){
             res.send(`There is no budget with id of ${id} in the database`)
             return;
        }
        res.status(200).json(results.rows);
    });
};



const addEnvelope = (req, res) => {
    const { title, budget} = req.body;
    //check if budget exists
    pool.query(queries.checkBudgetExists, [title], (error, results)=> {
        if(results.rows.length){
            return res.send(`Budget title or name ${ title } already exists.`);
        }
        //add envelope
        pool.query(queries.addEnvelope, [title, budget], (error, results)=>{
            if (error) throw error;
            res.status(201).send('Budget created successfully');
        })
    });
};



const deleteEnvelopeById =(req,res)=>{
    const id = parseInt(req.params.id);
    pool.query(queries.getEnvelopeById, [id], (error, results)=>{
        //check if id does not exit in the database 
        const invalidId = !results.rows.length;
        if(invalidId){
             res.send(`There is no budget with id of ${id} in the database, delete was unsuccessful`)
             return;
        }
        pool.query(queries.deleteEnvelopeById, [id], (error, results)=>{
            if (error) throw error;
            res.status(200).send('Envelope successfuly deleted from the database,');
            return;
        })

    }

)

};



const updateEnvelope = (req,res)=> {
    const id = parseInt(req.params.id);
    //get title and budget of envelope to update
    const {title, budget} = req.body;

    //check if envelope exists
    pool.query(queries.getEnvelopeById,[id], (error, results)=>{
        const invalidId = !results.rows.length;
        if(invalidId){
            return res.send('Budget does not exist in the database');
        }
        pool.query(queries.updateEnvelope, [title,budget,id], (error, results)=>{
            if (error) throw error;
            res.status(200).send('Budget successfully updated');
        })
        }
     )


};



const addEnvelopeTransaction = async (req, res) => {
	const { fromid, toid, amount } = req.params;
	const { title } = req.body;
	const date = new Date();

  try {
		// SQL TRANSACTION
		await pool.query('BEGIN');
       const budget = await pool.query(queries.envelopeQuery, [fromid])
		if (budget.rowCount < 1) {
      return res.status(404).send({
        message: "No budget information found",
			});
		}
        //Check to see if there is enough fund in envelope
         const dbAmount = budget.rows[0]['budget'];
         const userAmount = Number(amount);
         //const dbAmount = ['amount'];

         console.log(budget.rows[0])
         console.log(`Type of dbAmount ${typeof dbAmount}`)
         console.log(`Type of dbAmount ${typeof dbAmount}`)
         console.log(`Type of Amount ${typeof amount}`)
         console.log(`Value of dbAmount ${dbAmount}`)

         console.log(`Value of Amount ${amount}`)

         


        if(dbAmount< userAmount){
            return res.status(404).send({
                message: "Insufficient fund",
                    });
               
        }

        
		const newTransaction = await pool.query
        (queries.transactionQuery, [toid,title, +amount, date]);
		await pool.query(queries.updateEnvDRQuery, [amount, fromid]);

        await pool.query(queries.updateEnvCRQuery, [amount, toid]);
		await pool.query('COMMIT');

		res.status(201).send({
			status: 'Success',
			message: 'New transaction created',
			data: newTransaction.rows[0],
			});
  } catch (err) {
		await pool.query('ROLLBACK');
    return res.status(500).send({
			error: err.message
		});
  }
};


module.exports = {
    getEnvelope,
    getEnvelopeById,
    addEnvelope,
    deleteEnvelopeById,
    updateEnvelope,
    addEnvelopeTransaction,
    getTransationFromEnvelopeId
    
}