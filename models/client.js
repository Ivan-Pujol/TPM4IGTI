import mongoose from 'mongoose';

const clientSchema = mongoose.Schema({
  agencia: {
    type: Number,
    require: true,
  },
  conta: {
    type: Number,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  balance: {
    type: Number,
    require: true,
    validate(balance) {
      if (balance < 0)
        throw new Error("Valor negativo para balance não é permitido.");
    },
  },
});

const clientModel = mongoose.model('client', clientSchema, 'client');
export { clientModel };