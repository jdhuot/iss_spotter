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


/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.lat}&lon=${coords.long}`,(error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(`Status code ${response.statusCode} when fetching ISS Coordinates`);
      return;
    }
    let result = JSON.parse(body).response;
    callback(error, result);
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };