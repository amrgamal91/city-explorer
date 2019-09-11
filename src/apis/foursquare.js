import { CLIENT_ID, CLIENT_SECRET } from "../data/credentials";
import { sortName } from "../utilities/util";

/** todo :
 * 1-apply near parameter in Api request to sent request by name(from select) not latlng
 * 2-get venue type from select and map it to category id  */

/**
 * @description sending request to foursquare to get venues
 * url and params
 */
const fSURL = "https://api.foursquare.com/v2/venues/";
const VERS = "20171227";
const RADIUS = "7000";
const CATEGORIES = {
  food: "4d4b7105d754a06374d81259",
  cafes: "4bf58dd8d48988d16d941735",
  gym: "4bf58dd8d48988d175941735",
  ArtsAndEntertainment: "4d4b7104d754a06370d81259",
  Museums: "4bf58dd8d48988d181941735",
  CollegeAndUniversity: "4d4b7105d754a06372d81259"
};

/**
 * @description making array of categories keys from  category objects sent in link  .
 */
// const CATEGORY_ID = Object.keys(CATEGORIES).map(cat => CATEGORIES[cat]);
// const CATEGORY_ID = Object.keys(CATEGORIES).filter(cat=>)

/**
 * https://developer.foursquare.com/docs/api
 * preparing API request URL and then send it to fetch data
 * return the response
 */
export const getFSPlaces = (mapCenter, region, country, venueType) => {
  const CATEGORY_ID = CATEGORIES[venueType];
  console.log("Venue Type : " + venueType);

  console.log("the category ID : " + CATEGORY_ID);
  /* todo : dynamic category & near instead of ll*/
  //   const requestURL = `${fSURL}search?ll=${mapCenter.lat},${mapCenter.lng}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${VERS}&categoryId=${CATEGORY_ID}&radius=${RADIUS}&limit=50`;
  const requestURL = `${fSURL}search?near=${region},${country}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${VERS}&categoryId=${CATEGORY_ID}&radius=${RADIUS}&limit=50`;

  return fetch(requestURL)
    .then(response => {
      if (!response.ok) {
        throw response;
      } else return response.json();
    })
    .then(data => {
      const places = data.response.venues;
      console.log("places count = " + places.length);
      places.sort(sortName);
      return places;
    });
};

/**
 * get details about specific venue by FourSquare ID of this venue
 */
export const getFSDetails = fsid => {
  const FSID = fsid;
  console.log("FSID: " + FSID);
  const requestURL = `${fSURL}${FSID}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${VERS}`;
  console.log("request: " + requestURL);
  return fetch(requestURL).then(response => {
    if (!response.ok) {
      throw response;
    } else return response.json();
  });
};
