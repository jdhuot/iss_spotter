const { nextISSTimesForMyLocation } = require('./iss_promised');

const printPassTimes = function(data) {
  console.log(data);
};

// Call
nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });



//// OLD WAY

// nextISSTimesForMyLocation()
//   .then(fetchMyIP)
//   .then(fetchCoordsByIP)
//   .then(fetchISSFlyOverTimes)
//   .then(body => {
//     let result = JSON.parse(body).response;
//     console.log(result);
//   });
