# Paypal-Integration
***
This repository contains the code for integrating Paypal API in your application.

**Paypal APIs used**:
1. Get Auth Token
2. Create Order 
3. Capture Order

**Flow Diagram**: 
![image](https://user-images.githubusercontent.com/4496970/124567361-8f29b000-de61-11eb-9309-04914e55f6f9.png)

The flow incldues how the user can place an order via paypal account and check the recent successfull transactions.

**Assumptions**: <br/>
We have used the CAPTURE API in this application to complete the order once the customer approves the transaction. But if there is a requirement of hornoring the payment later, this can be done via AUTHORIZE api. 

**Dependencies**<br/>
NodeJs , HTML, MongoDB

Paypal Reference Links: <br/>

https://developer.paypal.com/docs/api/overview/ <br/>
https://developer.paypal.com/docs/api/orders/v2/ <br/>
https://developer.paypal.com/docs/business/develop/





