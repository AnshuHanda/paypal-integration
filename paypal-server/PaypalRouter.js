var express = require("express");
var app = express.Router();

const axiosInstance = require("./PaypalOrder.js");

app.get('/', async (req, res) => {
    res.send('Hello World!');
})


app.post('/order', async (req, res) => {
	//TODO: create order 
    let price = req.body.price;
    let data = await axiosInstance.createOrder(price);
    return res.send(data);
})

app.get('/capture', async (req, res) => {
	//TODO: capture the approved transaction 
	let transactionData = {};

    try{
        let order_id = req.query.token;
        
        let order_details = await axiosInstance.getOrder(order_id);

        transactionData = {
        	transactionId:order_details.id,
        	orderStatus: order_details.status,
        	emailAddress: order_details.payer.email_address,
        	amount: order_details.purchase_units[0].amount.value,
        	countryCode: order_details.purchase_units[0].amount.currency_code
        };

        if (order_details.intent == "CAPTURE" && order_details.status == "APPROVED"){
        	
        	console.log("Line number 22");
            let data = await axiosInstance.capture(order_id);
            
            if (data.status == "COMPLETED") {
            	transactionData.orderStatus = data.status;
                return res.redirect("http://localhost:8000/success.html?token=" + data.id);
            }
        }
        else{
            throw error;
        }
    }catch(err){
        return res.redirect("http://localhost:8000/failure.html");
    }finally{
    	axiosInstance.addTransaction(transactionData);
    }

})

app.get('/order/:id', async (req, res) => {
	//TODO: get order details
    let order_id = req.params.id;
    
	let data = await axiosInstance.getOrder(order_id);
	return res.send(data);
    
});

app.get('/transaction', async(req, res) => {
	//TODO: get transaction details
	let customer_data = req.query.email;
	let data = await axiosInstance.getTransaction(customer_data);
	return res.send(data);
})


module.exports = app;