const axios = require("axios");

const HttpError = require("../models/http-error");

const API_KEY =
  "pk.eyJ1Ijoic2t6eCIsImEiOiJjbHg2ZTVxb2MwcjZ5MmpzYTFkZHR4cXJ6In0.REegpreuWM6kERLY4HH3Iw";

async function getCoordsForAddress(address) {
  // return {
  //   lat: 12.971599,
  //   lng: 77.594566,
  // };

  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${API_KEY}`;

  try {
    const { data } = await axios.get(url);

    if (!data.features || data.features.length === 0) {
      throw new HttpError(
        `Could not find coordinates for address: ${address}`,
        422
      );
    }

    const [lng, lat] = data.features[0].center;

    return { lat, lng };
  } catch (error) {
    throw new HttpError(
      `Could not get coordinates for address: ${address}.`,
      422
    );
  }
}

module.exports = getCoordsForAddress;
