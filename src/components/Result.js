import React, { Component } from "react";
import PropTypes from "prop-types";
import scriptLoader from "react-async-script-loader";
import { MAP_KEY } from "../data/credentials";
import { mapStyles } from "../data/mapStyles.js";
import spinner from "../images/circles-loader.svg";
import foursquare from "../images/foursquare.png";
import PlacesListView from "./PlacesListView";

class Result extends Component {
  // define the default proptypes for component
  static propTypes = {
    map: PropTypes.object,
    infowindow: PropTypes.object,
    bounds: PropTypes.object,
    mapCenter: PropTypes.object,
    mapReady: PropTypes.bool,
    mapError: PropTypes.bool
  };

  // component state
  state = {
    listOpen: true,
    map: {},
    infowindow: {},
    bounds: {},
    mapReady: false,
    mapCenter: { lat: 29.341, lng: 48.0893 }, // for future use when add location search
    mapError: false,
    width: window.innerWidth
  };

  // using the component life cycle
  componentDidMount() {
    window.addEventListener("resize", this.updateWidth);
  }

  /**
   * instead of componentWillReceiveProps (deprecated)
   * check if map reloaded or not if so not loaded then ,
   * initialize the map & its bound & infoWindow then upadte the state
   * else : return error
   */
  // static getDerivedStateFromProps(props, state) {
  //   // Check if script is loaded and if map is defined
  //   // console.log("props are : " + JSON.stringify(props));
  //   // console.log("state are : " + JSON.stringify(state));

  //   if (props.isScriptLoaded && props.isScriptLoadSucceed && !state.mapReady) {
  //     // create map
  //     const map = new window.google.maps.Map(document.getElementById("map"), {
  //       zoom: 12,
  //       center: state.mapCenter,
  //       styles: mapStyles
  //     });

  //     // set up bounds and infowindow to use later
  //     const bounds = new window.google.maps.LatLngBounds();
  //     const infowindow = new window.google.maps.InfoWindow({ maxWidth: 400 });

  //     return {
  //       map: map,
  //       infowindow: infowindow,
  //       bounds: bounds,
  //       mapReady: true
  //     };

  //     // alert user if map request fails
  //   } else if (!state.mapReady) {
  //     console.log("Map did not load");
  //     return { mapError: true };
  //   }
  // }

  UNSAFE_componentWillReceiveProps({ isScriptLoadSucceed }) {
    // Check if script is loaded and if map is defined
    if (isScriptLoadSucceed && !this.state.mapReady) {
      // create map
      const map = new window.google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: this.state.mapCenter,
        styles: mapStyles
      });

      // set up bounds and infowindow to use later
      const bounds = new window.google.maps.LatLngBounds();
      const infowindow = new window.google.maps.InfoWindow({ maxWidth: 400 });

      this.setState({
        map: map,
        infowindow: infowindow,
        bounds: bounds,
        mapReady: true
      });

      // alert user if map request fails
    } else if (!this.state.mapReady) {
      console.log("Map did not load");
      this.setState({ mapError: true });
    }
  }

  toggleList = () => {
    const { width, listOpen, infowindow } = this.state;

    if (width < 600) {
      // close infowindow if PlacesList is opening
      if (!listOpen) {
        infowindow.close();
      }
      this.setState({ listOpen: !listOpen });
    }
  };

  updateWidth = () => {
    const { map, bounds } = this.state;
    // console.log("update width called");
    // console.log("inner width : " + window.innerWidth);
    // console.log("bounds : " + bounds);
    this.setState({ width: window.innerWidth });
    if (map && bounds) {
      map.fitBounds(bounds);
    }
  };

  render() {
    const {
      listOpen,
      map,
      infowindow,
      bounds,
      mapReady,
      mapCenter,
      mapError
    } = this.state;
    const { country, region, venueType } = this.props.location;
    return (
      <div className="container content" role="main">
        <div className="row ">
          <nav id="list-toggle" className="toggle" onClick={this.toggleList}>
            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M2 6h20v3H2zm0 5h20v3H2zm0 5h20v3H2z"></path>
          </svg> */}
          </nav>
          <div className="col-10 col-sm-10 col-md-4 col-lg-4 order-1">
            <div
              id="venues-list"
              className={listOpen ? "list open mr-2" : "list  mr-2"}
              role="complementary"
              tabIndex={listOpen ? "0" : "-1"}
            >
              <h1 className="app-title">
                {country
                  ? venueType + " in " + region + country
                  : "No places available"}
              </h1>
              <hr />
              {/* render markers only when map has loaded */
              mapReady ? (
                <PlacesListView
                  map={map}
                  infowindow={infowindow}
                  bounds={bounds}
                  mapCenter={mapCenter}
                  toggleList={this.toggleList}
                  listOpen={listOpen}
                  region={region}
                  country={country}
                  venueType={venueType}
                />
              ) : (
                // Show error message id map didn't load
                <p>
                  We are experiencing loading issues. Please check your internet
                  connection
                </p>
              )}
              <h3 className="footer-signature">
                Created By{" "}
                <a href="https://www.linkedin.com/in/amr-gamal-11901a33/">
                  Amr Gamal
                </a>
              </h3>
              <h6 className="footer-github">
                View Code on{" "}
                <a href="https://github.com/amrgamal91/city-explorer">github</a>
              </h6>
              <img src={foursquare} className="fs-logo" alt="foursquare" />
            </div>
          </div>

          <div
            id="map"
            className="map col-12 col-sm-12 col-md-8  col-lg-8 order-4"
            role="application"
          >
            {mapError ? ( // Show error message id map didn't load
              <div id="map-error" className="error" role="alert">
                Google Maps did not load. Please try again later...
              </div>
            ) : (
              // load the map
              <div className="loading-map ml-2">
                <h4 className="loading-message">Map is loading...</h4>
                <img
                  src={spinner}
                  className="spinner"
                  alt="loading indicator"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

//https://www.npmjs.com/package/react-async-script-loader
export default scriptLoader([
  `https://maps.googleapis.com/maps/api/js?key=${MAP_KEY}`
])(Result);
