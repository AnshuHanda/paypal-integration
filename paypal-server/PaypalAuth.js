const axios = require('axios');
const qs = require('qs');
const cred_config = require('./config.js')

let authToken; //can be done via cache also

const callAxios = async(config)=>{
  try{
    let response = await axios(config);
    return response.data;
  }catch(err){
    console.log(err);
    throw err;
  }
}


// API to get the authorisation token
const getAuth  = async(hardReload=false)=>{

  if(authToken && !hardReload){
    return authToken;
  }

  let data = qs.stringify({
    'grant_type': 'client_credentials' 
  });

  let config = {
    method: 'post',
    url: 'https://api-m.sandbox.paypal.com/v1/oauth2/token',
    headers: { 
      'Authorization': 'Basic '+cred_config.basicAuth, 
      'Content-Type': 'application/x-www-form-urlencoded', 
    },
    data : data
  };

  let authResponse = await callAxios(config);
  authToken = authResponse.access_token;
  return authToken;
   
}

module.exports = {
  getAuth
}