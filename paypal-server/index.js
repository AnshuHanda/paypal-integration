const express = require('express')
require('express-async-errors');
const app = express()
const port = 3000
app.use(express.json())
var cors = require('cors');
const mongoose = require("mongoose");
const config = require('./config.js')

app.use("/",require("./PaypalRouter.js"));


app.use((err, req, res, next)=>{
    //TODO:: handle error here;
    console.log("inside error function");
    res.status(500).send({error: err.response ? (err.response.data || err.message) : err.message });
})


const connectToDB = ()=>{
    //TODO: create connection with mongoDB 
    const dbURL = "mongodb://${config.hostURL}:${config.hostPort}/paypalIntegration";
    mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true});
}

app.listen(port, () => {
    //app is listening at port 3000
    console.log(`Example app listening at http://localhost:${port}`);
    connectToDB()
});
