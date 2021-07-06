let mongoose = require('mongoose');

const TransactionModel = {
	transactionId: String,
    orderStatus: String,
    emailAddress: String,
    amount: String,
    countryCode: String
}

const TransactionSchema = new mongoose.Schema(TransactionModel, {timestamps:true});
module.exports = mongoose.model('Transactions', TransactionSchema);