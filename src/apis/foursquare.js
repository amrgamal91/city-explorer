import { CLIENT_ID, CLIENT_SECRET } from "../data/credentials";
import { sortName } from "../utilities/util";
import { fSURL, VERS, RADIUS, CATEGORIES } from "../data/credentials";

/**
 * https://developer.foursquare.com/docs/api
 * preparing API request URL and then send it to fetch data
 * return the response
 */
export const getFSPlaces = (country, region, venueType) => {
  const CATEGORY_ID = CATEGORIES[venueType];
  const requestURL = `${fSURL}search?near=${region},${country}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${VERS}&categoryId=${CATEGORY_ID}&radius=${RADIUS}&limit=50`;

  return fetch(requestURL)
    .then(response => {
      if (!response.ok) {
        throw response;
      } else return response.json();
    })
    .then(data => {
      const places = data.response.venues;
      // console.log("places count = " + places.length);
      places.sort(sortName);
      return places;
    });
};

/**
 * get details about specific venue by FourSquare ID of this venue
 */
export const getFSDetails = fsid => {
  const FSID = fsid;
  const requestURL = `${fSURL}${FSID}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${VERS}`;
  return fetch(requestURL).then(response => {
    if (!response.ok) {
      throw response;
    } else return response.json();
  });
};
