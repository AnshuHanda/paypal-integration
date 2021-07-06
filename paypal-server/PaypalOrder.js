const axios = require('axios');
const qs = require('qs');
const paypalAuth = require('./PaypalAuth.js');
const cred_config = require('./config.js');
const transaction = require('./model/transactions.js')


const callAxios = async (config, retry = true) => {
    try {
        let auth = await paypalAuth.getAuth(true);
        config.headers.Authorization = "Bearer " + auth;
        let response = await axios(config);
        return response.data;
    } catch (err) {
        if (err.response.status == 401 && retry) {
            await paypalAuth.getAuth(true);
            return await callAxios(config, false);
        }
        console.log(err);
        throw err;
    }
}

const capture = async (captureId) => {
    let config = {
        method: 'post',
        url: 'https://api-m.sandbox.paypal.com/v2/checkout/orders/' + captureId + '/capture',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {}
    };

    let data = await callAxios(config);
    return data;
}

const addTransaction = async (data) => {
    await transaction.create(data);
    return true;
}

const getTransaction = async (email) => {
    let data = await transaction.find({'emailAddress': email});
    return data;
}

const getOrder = async (token) => {
    var config = {
        method: 'get',
        url: 'https://api.sandbox.paypal.com/v2/checkout/orders/'+token,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    let orderDetails = await callAxios(config);
    return orderDetails;
}

const createOrder = async (price) => {
    let data = JSON.stringify({
        "intent": "CAPTURE",
        "application_context": {
            "return_url": cred_config.returnUrl,
            "cancel_url": cred_config.cancelUrl
        },
        "purchase_units": [{
            "amount": {
                "currency_code": "USD",
                "value": price
            }
        }]
    });

    var config = {
        method: 'post',
        url: 'https://api-m.sandbox.paypal.com/v2/checkout/orders',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    let orderResponse = await callAxios(config);
    return orderResponse;

}

module.exports = {
    getOrder,
    createOrder,
    capture,
    getTransaction,
    addTransaction
}