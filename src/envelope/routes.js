const {Router} = require('express');
const controllers = require('./controllers')
const envelopeRouter = Router();

envelopeRouter.get('/', controllers.getEnvelope);
envelopeRouter.post('/', controllers.addEnvelope);
envelopeRouter.get('/:id', controllers.getEnvelopeById);

//http://localhost:5000/api/v1/envelopes/11/transactions/20/120
envelopeRouter.post('/:fromid/transactions/:toid/:amount', controllers.addEnvelopeTransaction);
envelopeRouter.get('/:id/transactions', controllers.getTransationFromEnvelopeId);
envelopeRouter.put('/:id', controllers.updateEnvelope);
envelopeRouter.delete('/:id', controllers.deleteEnvelopeById);

module.exports = envelopeRouter;  