import foodIcon from "../images/icons/food-marker.png";
import gymIcon from "../images/icons/gym-marker.png";
import cafeIcon from "../images/icons/cafe-marker.png";
import museumIcon from "../images/icons/museum-marker.png";
import universityIcon from "../images/icons/university-marker.png";
import defaultIcon from "../images/icons/default-marker.png";
import artsIcon from "../images/icons/arts-marker.png";

export const sortName = (a, b) => {
  // remove case senstivity
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  // if names are equal
  return 0;
};

export const getIcon = venueType => {
  switch (venueType) {
    case "food":
      return foodIcon;
    case "cafes":
      return cafeIcon;
    case "ArtsAndEntertainment":
      return artsIcon;
    case "Museums":
      return museumIcon;
    case "CollegeAndUniversity":
      return universityIcon;
    case "gym":
      return gymIcon;
    default:
      return defaultIcon;
  }
};
