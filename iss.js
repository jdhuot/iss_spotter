const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org?format=json',(error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      let msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(error(msg), null);
      return;
    }
    let ip = JSON.parse(body).ip;
    callback(error, ip);


    // request(`https://ipvigilante.com/${ip}`, (error, response, body) => {
    // if (error) {
    //   callback(error, null);
    // return;
    // }
    // if (response.statusCode !== 200) {
    // let msg = `Status Code ${response.statusCode} when fetching IP Coordinates`;
    //   callback(error(msg), null);
    // return;
    // }
    // let coords = [];
    // coords.push(JSON.parse(body).data.latitude);
    // coords.push(JSON.parse(body).data.longitude);
    // callback(error, coords)
    // });
    
  });
};



const fetchCoordsByIP = function(ip, callback) {
  request(`https://ipvigilante.com/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      let msg = `Status Code ${response.statusCode} when fetching IP Coordinates`;
      callback(msg, null);
      return;
    }
    let coords = [];
    coords.push(JSON.parse(body).data.latitude);
    coords.push(JSON.parse(body).data.longitude);
    callback(error, coords);
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP };