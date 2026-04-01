const axios = require('axios');

const getCoordinates = async (address) => {
  try {
    const response = await axios.get(
      'https://maps.googleapis.com/maps/api/geocode/json',
      {
        params: {
          address: `${address}, India`,
          key: process.env.GOOGLE_MAPS_API_KEY,
          region: "IN"
        }
      }
    );

    if (response.data.status !== 'OK') {
      throw new Error(response.data.status);
    }

    const result = response.data.results[0];

    return {
      address: result.formatted_address,
      lat: result.geometry.location.lat,
      lng: result.geometry.location.lng,
      place_id: result.place_id
    };

  } catch (error) {
    console.log("GOOGLE ERROR FULL:", error.response?.data || error.message);
    throw new Error("Maps API failed");
  }
};

const calculateDistance = async (origin, destination) => {
  try {
    const response = await axios.get(
      'https://maps.googleapis.com/maps/api/distancematrix/json',
      {
        params: {
          origins: `${origin}, India`,       
          destinations: `${destination}, India`,
          key: process.env.GOOGLE_MAPS_API_KEY
        }
      }
    );

    const data = response.data;

    if (data.status !== 'OK') {
      throw new Error(data.status);
    }

    const element = data.rows[0].elements[0];
    
    if (!element || element.status !== "OK") {
      throw new Error("No valid route found");
    }

    return {
      distance_text: element.distance.text,
      distance_value: element.distance.value,
      duration_text: element.duration.text
    };

  } catch (error) {
    console.log("DISTANCE ERROR:", error.response?.data || error.message); 
    throw new Error("Distance API failed");
  }
};

module.exports = { getCoordinates, calculateDistance };