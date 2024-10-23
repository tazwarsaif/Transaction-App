const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const TransactionSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    description: {
        type : String,
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    createdAt : {
        type: Date
    },
    updatedAt: {
        type: Date
    }
})

module.exports = mongoose.model('Transaction',TransactionSchema);