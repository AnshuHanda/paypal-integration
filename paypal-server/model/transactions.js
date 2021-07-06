let mongoose = require('mongoose');

const TransactionModel = {
	transactionId: String,
    orderStatus: String,
    customerName: String,
    payerId: String,
    countryCode: String,
    emailAddress: String,
    amount: String
}

const TransactionSchema = new mongoose.Schema(TransactionModel, {timestamps:true});
module.exports = mongoose.model('Transactions', TransactionSchema);