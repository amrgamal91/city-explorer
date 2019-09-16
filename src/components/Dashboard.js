import React, { Component } from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCheckSquare, faCoffee } from "@fortawesome/fontawesome-free-solid";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { country: "", region: "", venueType: "Looking for..." };
  }

  selectCountry(val) {
    this.setState({ country: val });
  }

  selectRegion(val) {
    this.setState({ region: val });
  }

  handleVenueSelect(event) {
    this.setState({ venueType: event.target.value });
  }

  render() {
    const { country, region, venueType } = this.state;
    return (
      <div className="flex-container">
        <div className="dashboard">
          <div className="row input-group mb-3">
            <label className="label col-md-5">Country</label>
            <CountryDropdown
              classes="custom-select"
              value={country}
              onChange={val => this.selectCountry(val)}
            />
          </div>
          <div className="row input-group mb-3">
            <label className="label col-md-5">Region</label>
            <RegionDropdown
              classes="custom-select"
              country={country}
              value={region}
              onChange={val => this.selectRegion(val)}
            />
          </div>
          <div className="row input-group mb-3">
            <label className="label  col-md-5">Venue Type</label>{" "}
            <select
              required
              className="custom-select"
              id="inputGroupSelect01"
              value={this.state.venue}
              onChange={this.handleVenueSelect.bind(this)}
            >
              <option value="looking For">looking for...</option>
              <option value="food">Resturants</option>
              <option value="cafes">Cafes</option>
              <option value="ArtsAndEntertainment">Art & Entertainment</option>
              <option value="Museums">Museums</option>
              <option value="CollegeAndUniversity">College & University</option>
              <option value="gym">Gyms</option>{" "}
            </select>{" "}
          </div>{" "}
          <Link
            to={{
              pathname: "/result",
              country: country,
              region: region,
              venueType: venueType
            }}
          >
            <button className="exploreButton">
              <span className="buttonText">Go</span>{" "}
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Dashboard;
