import { clientModel } from '../models/client.js'


export async function deposit(req, res) {
  try {
    const { agencia, conta, deposito } = req.body;
    const client = await clientModel.findOne({ agencia, conta });
    if (!client) res.status(400).send("Account not found!");
    client.balance += deposito;
    await client.save();
    res.send({
      name: client.name,
      balance: client.balance,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export async function withdraw(req, res) {
  try {
    const { agencia, conta, saque } = req.body;

    const client = await clientModel.findOne({ agencia, conta });

    if (!client) res.status(400).send("Account not found!");
    if (saque == undefined) res.status(400).send("Invalid withdraw value.");

    const newBalance = client.balance - (saque + 1);

    if (newBalance < 0) res.status(400).send("Insufficient balance!");

    client.balance = newBalance;

    await client.save();

    res.send({
      name: client.name,
      balance: client.balance,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export async function balance(req, res) {
  try {
    const { agencia, conta, saque } = req.body;

    const client = await clientModel.findOne({ agencia, conta });

    if (!client) res.status(400).send("Account not found!");

    res.send({
      name: client.name,
      balance: client.balance,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export async function deleteClient(req, res) {
  try {
    const { agencia, conta } = req.body;
    const client = await clientModel.findOne({ agencia, conta });
    if (!client) res.status(400).send("Account not found!");
    await client.deleteOne();
    const costumers = await clientModel.find({ agencia });
    const clientsNumber = costumers.length;
    res.status(200).send("The agency's number of clients is: " + clientsNumber);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export async function showAllClients(req, res) {
  try {
    const client = await clientModel.find({});
    if (!client) res.status(400).send("No clients were found!");
    res.send(client);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
export async function transfer(req, res) {
  const { originAccount, destinationAccount, transferencia } = req.body;
  const oringClient = await clientModel.findOne({ conta: originAccount });
  const destinationClient = await clientModel.findOne({ conta: destinationAccount });
  if (oringClient == null || destinationClient == null) {
    res.status(500).send("Some information is not right, check accounts please");
  }
  if (oringClient.balance >= transferencia) {
    if (oringClient.agencia == destinationClient.agencia) {
      destinationClient.balance += transferencia;
      oringClient.balance -= transferencia;
      await oringClient.save();
      await destinationClient.save();
      res.status(200).send({ name: oringClient.name, balance: oringClient.balance });
    } else {
      if (oringClient.balance >= transferencia + 8) {
        destinationClient.balance += transferencia + 8;
        oringClient.balance -= transferencia + 8;
        await oringClient.save();
        await destinationClient.save();
        res.status(200).send('Client: ' + oringClient.name + '  balance: ' + oringClient.balance);
      } else {
        res.status(500).send("Balance insufficient.");
      }
    }
  } else {
    res.status(500).send("Balance insufficient.");
  }
}

export async function average(req, res) {
  const { agencia } = req.body;
  const client = await clientModel.find({ agencia });
  let avrg = 0;
  if (client != null) {
    client.forEach(c => avrg += c.balance);
    avrg = (avrg / client.length);
    res.send("The average balance in this agency is: " + avrg);
  } else {
    res.status(500).send("No clients were found.");
  }
};
export async function lowbalance(req, res) {
  try {
    const { clientsLimit } = req.body;
    const clients = await clientModel.find({}, { balance: 1, agencia: 1, conta: 1 }).sort({ balance: 1, agencia: 1, conta: 1 }).limit(clientsLimit);
    if (clients !== null) {
      res.send({ "Number of Accounts": `${clients.length}`, clients });
    } else {
      res.status(500).send("No clients were found");
    }
  } catch (err) {
    res.status(500).send("No clients were found");
  }
};

export async function higherBalance(req, res) {
  try {
    const { clientsLimit } = req.body;
    const clients = await clientModel.find({}, { balance: -1, agencia: 1, conta: 1, name: 1 }).sort({ balance: -1, agencia: 1, conta: 1, name: 1 }).limit(clientsLimit);
    if (clients !== null) {
      res.send({ "Number of Accounts": `${clients.length}`, clients });
    } else {
      res.status(500).send("No clients were found");
    }
  } catch (err) {
    res.status(500).send("No clients were found");
  }
};

export async function transferRichers(req, res) {
  try {
    const agc = await clientModel.find({}, { agencia: 1 });
    let previousValue = 0;
    let agenciesList = [];
    let clientsLimit = 1;
    let privateAgency = 99;
    if (agc != null) {
      await agc.forEach(ag => {
        if (ag.agencia != previousValue) {
          agenciesList.push(ag.agencia);
          previousValue = ag.agencia;
        }
      })
      previousValue = 0;
    } else {
      res.status(500).send("No agency was found");
    }
    for (let i = 0; i < agenciesList.length; i++) {
      const client = await clientModel.find({ agencia: agenciesList[i] }, { balance: -1, agencia: 1, conta: 1, name: 1 }).sort({ balance: -1, agencia: 1, conta: 1, name: 1 }).limit(clientsLimit);
      if (client == null) res.status(500).send("Client not found");
      await client.map(c => {
        c.agencia = privateAgency;
        c.save();
      })
    }
    const clientsPrivate = await clientModel.find({ agencia: 99 });
    //Arrumar a busca acima pois não retorna o número real de clientes
    res.send(clientsPrivate);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
