import express from 'express';
import { transferAllData } from './tranfer.js'
import * as clientsController from '../controllers/clientController.js';
const app = express();


app.post('/transferall', (req, res) => {
  try {
    transferAllData();
    res.status(200).send("Inserção realizada com sucesso");
  } catch (error) {
    res.status(500).send("erro na inserção")
  }

});

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
