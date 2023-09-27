import mongoose, { Schema } from 'mongoose';

const invoiceDetails = new Schema({
  id: String,
  description: String,
  quantity: String,
  price: String,
  amount: String,
});

const invoiceSchema = new Schema(
  {
    businessName: String,
    businessSlogan: String,
    businessAddress: String,
    businessContact: String,
    businessEmail: String,
    invoiceTo: String,
    invoiceDate: String,
    clientContact: String,
    clientAddress: String,
    cashOrChequeNo: String,
    additionalInfo: String,
    name: String,
    signature: String,
    list: [invoiceDetails],
    total: String,
    vat: String,
    sumTotal: String,
    balance: String,
    img: String,
  },
  {
    timestamps: true, // createAt and updatedAt field will be added to the schema automatically.
  }
);

const Invoice =
  mongoose.models.Invoice || mongoose.model('Invoice', invoiceSchema);

export default Invoice;
