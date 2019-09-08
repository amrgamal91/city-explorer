import React, { Component } from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { Link } from "react-router-dom";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { country: "", region: "" };
  }

  selectCountry(val) {
    this.setState({ country: val });
  }

  selectRegion(val) {
    this.setState({ region: val });
  }

  render() {
    const { country, region } = this.state;
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
            <select className="custom-select" id="inputGroupSelect01">
              <option selected>Select Venue...</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>{" "}
            </select>{" "}
          </div>{" "}
          <Link to="/result">
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
