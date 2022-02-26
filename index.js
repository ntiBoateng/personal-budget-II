const express = require('express');
const envelopeRoute = require('./src/envelope/routes.js');
const transactionRoute = require('./src/transaction/transactionRoute.js');
const app = express();

const PORT = process.env.PORT || 4000;
app.use(express.json());

app.get('/', (req,res)=>{
    res.send('Welcome to Personal Budget API')
});

app.use('/api/v1/envelopes', envelopeRoute)
app.use('/api/v1/transactions', transactionRoute)



app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));



