/**
 * API object that holds the bae URL for the Server
 *
 * ! NOT used anymore because you can just cahnge the "proxy" value in the package.json
 */
var axios = require("axios");

var api = axios.create({
  //baseURL: "https://tm30web.centralus.cloudapp.azure.com:8080/api"
  baseURL: "https://tm30web.centralus.cloudapp.azure.com:8080/api"
});

module.exports = api;
