import express from 'express';
import * as clientsController from '../controllers/clientController.js';
const app = express();

app.get('/showclients', clientsController.showAllClients);

app.patch('/deposit', clientsController.deposit);

app.patch('/withdraw', clientsController.withdraw);

app.get('/balance', clientsController.balance);

app.delete('/delete', clientsController.deleteClient);

app.patch('/transfer', clientsController.transfer);

app.get('/average', clientsController.average);

app.get('/lowbalance', clientsController.lowbalance);

app.get('/highbalance', clientsController.higherBalance);

app.patch('/transferrichers', clientsController.transferRichers);

export { app as clientRouter };
