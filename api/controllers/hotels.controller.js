const model = require("../models/hotels.model");

function getHotels(req, res) {
  const stars = req.query.stars;
  const hotelsList = model[0];
  let hotels = [];
  
 //if there's no query passed, return the whole object containing the hotels
  if (JSON.stringify(req.query) === '{}') {
    res.json(hotelsList);
  } else {
    //else, if the property stars has a value, return the list of hotels corresponding with it
    if (stars) {
      for (let destination in hotelsList) {
        for (let i = 0; i < hotelsList[destination].length; i++) {
          let hotel = {}
          let hotelName = hotelsList[destination][i].name;
          let hotelStars = hotelsList[destination][i].stars;
          //if a hotel stars value matches with the query, then create a hotel object and push it to the hotels array
          if (hotelStars == stars) {
            hotel = {
              name: hotelName,
              stars: hotelStars,
              destination
            }
            hotels.push(hotel)
          }
        }
      }
      //if the hotels array is not empty, then return it. Else, return that no hotel was found
      if (hotels.length > 0) {
        res.status(200).json(hotels);
      } else {
        res.status(404).json({
          error: "No hotel found",
        });
      }
    } else {
      //if the query is not empty but the stars property has no value, then the query was not correctly typed
      res.status(400).json({
        "error": "Please provide a proper query"
      })
    }
  }
}

module.exports = {
  getHotels,
};
