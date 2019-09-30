import React, { Component } from "react";
import { getFSPlaces, getFSDetails } from "../apis/foursquare";
import noImage from "../images/no-image-available.png";
import fsButton from "../images/foursquare-button.png";
import spinner from "../images/circles-loader.svg";
import PropTypes from "prop-types";
import Place from "./Place";
import { getIcon } from "../utilities/util";

class PlacesListView extends Component {
  static propTypes = {
    map: PropTypes.object.isRequired,
    infowindow: PropTypes.object.isRequired,
    bounds: PropTypes.object.isRequired,
    mapCenter: PropTypes.object.isRequired,
    toggleList: PropTypes.func.isRequired,
    listOpen: PropTypes.bool.isRequired
  };

  state = {
    query: "",
    allPlaces: [],
    filteredPlaces: null,
    apiReturned: false
  };

  /**
   * 1- get places from fourSquare API
   * 2- if success then , set the state with the required data
   * 3- add markers on the map for these places
   */
  componentDidMount() {
    getFSPlaces(this.props.country, this.props.region, this.props.venueType)
      .then(places => {
        this.setState({
          allPlaces: places,
          filteredPlaces: places,
          apiReturned: true
        });
        if (places) this.addMarkers(places);
      })
      .catch(error => this.setState({ apiReturned: true }));
  }

  /**
   * 1- loop on places and for each one do the following:
   *    a- get latlng of the place to put marker on it.
   *    b- add the marker on the place
   *    c- add click listener to the marker
   */
  addMarkers(places) {
    const { map, bounds } = this.props;
    // const self = this;

    places.forEach(location => {
      //1- get latlng of each place
      const position = {
        lat: location.location.lat,
        lng: location.location.lng
      };

      const icon = getIcon(this.props.venueType);
      // console.log("the icon : " + icon);
      //2- add marker icon for each location
      location.marker = new window.google.maps.Marker({
        position,
        map,
        title: location.name,
        id: location.id,
        icon: icon
      });

      bounds.extend(position);

      //3- add click listener for marker
      this.addMarkerListener(location);
    });
  }

  /**
   * 1- set animation for click on the marker
   * 2- get details of each place & build marker info window content
   * 3- fit bounds of the map
   */
  addMarkerListener(location) {
    const { infowindow, toggleList, map, bounds, listOpen } = this.props;
    const self = this;

    location.marker.addListener("click", function() {
      const marker = this;

      // bounce marker three times then stop
      marker.setAnimation(window.google.maps.Animation.BOUNCE);
      setTimeout(function() {
        marker.setAnimation(null);
      }, 2100);

      //get details of this place
      getFSDetails(marker.id)
        .then(data => {
          const singlePlace = data.response.venue;
          // console.log(
          //   "here the details of the place : " +
          //     JSON.stringify(data.response.venue)
          // );
          const {
            canonicalUrl,
            bestPhoto,
            contact,
            location,
            categories,
            attributes,
            tips
          } = singlePlace;

          marker.url = canonicalUrl ? canonicalUrl : "https://foursquare.com/";
          marker.photo = bestPhoto
            ? `${bestPhoto.prefix}width100${bestPhoto.suffix}`
            : noImage;
          marker.phone =
            contact && contact.formattedPhone ? contact.formattedPhone : "";
          marker.address = location.address;
          marker.category = categories.length > 0 ? categories[0].name : "";
          marker.price =
            attributes.groups[0].summary &&
            attributes.groups[0].type === "price"
              ? attributes.groups[0].summary
              : "";
          marker.tip =
            tips.count > 0
              ? `"${tips.groups[0].items[0].text}"`
              : "No tips available";

          marker.infoContent = self.buildInfoContent(false, marker);

          // set content and open window after content has returned
          infowindow.setContent(marker.infoContent);
          infowindow.open(map, marker);

          // close list view in mobile if open so infowindow is not hidden by list
          if (listOpen) {
            toggleList();
          }
        })
        .catch(error => {
          marker.infoContent = self.buildInfoContent(
            true,
            marker,
            marker.title,
            error
          );

          // set content and open window
          infowindow.setContent(marker.infoContent);
          infowindow.open(map, marker);

          // close list view in mobile if open so infowindow is not hidden by list
          if (listOpen) {
            toggleList();
          }
        });
    });
    // size and center map
    map.fitBounds(bounds);
  }

  /**
   * 1- build the info content of the marker in normal and error case
   */
  buildInfoContent(errorContent, marker, title = "", error = "") {
    return errorContent
      ? `<div class="venue-error"  role="alert">
    <h4>Foursquare Venue Details request for ${marker.title} failed</h4>
    <p>Try again later... ${JSON.stringify(error)}</p>
  </div>`
      : `<div class="place">
      <img class="place-photo" src=${marker.photo} alt="${marker.title}">
      <div class="place-meta">
        <h2 class="place-title">${marker.title}</h2>
        <p class="place-data">${marker.category}</p>
        <p class="place-price">${marker.price}</p>
        <p class="place-contact">${marker.address}</p>
        <a class="place-phone" href="tel:${marker.phone}">${marker.phone}</a>
      </div>
    </div>
    <p class="place-tip">${marker.tip}</p>
    <a class="place-link" href="${marker.url}" target="_blank">
      <span>Read more</span>
      <img class="fs-link" src="${fsButton}">
    </a>`;
  }

  showInfo = place => {
    // force marker click
    window.google.maps.event.trigger(place.marker, "click");
  };

  /**
   * it returns the places that matches the search query
   * 1- filter the allplaces array to return matched ones
   * 2- sort the result
   * 3- update the state with the returned result
   */
  filterPlaces = event => {
    const { allPlaces } = this.state;
    const { infowindow } = this.props;
    const query = event.target.value.toLowerCase();

    // update state so input box shows current query value
    this.setState({ query: query });

    // close infoWindow when filter runs
    infowindow.close();

    // filter list markers by name of location
    const filteredPlaces = allPlaces.filter(place => {
      const match = place.name.toLowerCase().indexOf(query) > -1;
      place.marker.setVisible(match);
      return match;
    });

    // sort array before updating state
    filteredPlaces.sort(this.sortName);

    this.setState({ filteredPlaces });
  };

  render() {
    const { apiReturned, filteredPlaces, query } = this.state;
    const { listOpen } = this.props;

    // API request fails
    if (apiReturned && !filteredPlaces) {
      return <div> Foursquare API request failed. Please try again later.</div>;

      // API request returns successfully
    } else if (apiReturned && filteredPlaces) {
      return (
        <div className="list-view list-group">
          <input
            type="text"
            placeholder="Filter by Name"
            value={query}
            onChange={this.filterPlaces}
            className="search-places form-control"
            role="search"
            aria-label="text filter"
            tabIndex={listOpen ? "0" : "-1"}
          />
          <p>
            {" "}
            You have <strong>{this.state.filteredPlaces.length}</strong> Markers
            on Map
          </p>

          {apiReturned && filteredPlaces.length > 0 ? (
            <ul className="places-list">
              {filteredPlaces.map((place, id) => (
                <Place key={place.id} place={place} listOpen={listOpen} />
              ))}
            </ul>
          ) : (
            <p id="filter-error" className="empty-input">
              No places match filter
            </p>
          )}
        </div>
      );

      // API request has not returned yet
    } else {
      return (
        <div className="loading-fs">
          <h4 className="loading-message">Loading Restaurants...</h4>
          <img src={spinner} className="spinner" alt="loading indicator" />
        </div>
      );
    }
  }
}

export default PlacesListView;
