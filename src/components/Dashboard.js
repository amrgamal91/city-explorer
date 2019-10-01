import React, { Component } from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { Link } from "react-router-dom";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: "",
      region: "",
      venueType: "Looking for..."
    };
  }

  /** country setter */
  selectCountry(val) {
    this.setState({ country: val });
  }

  /** region setter */
  selectRegion(val) {
    this.setState({ region: val });
  }

  /** venue setter */
  selectVenue(event) {
    // if (event.target.value === "")
    //   this.setState({
    //     errors: { venuetypeError: "venue type must  be selected" }
    //   });
    this.setState({ venueType: event.target.value });
  }

  /** submits the form ;
   * prevents the form from reloading
   */
  submitHandler(event) {
    event.preventDefault();
  }

  /** validates the 3 main inputs
   * returns an object of 3 keys ,key for each input
   * if there is no error then key = false ,else key = error message
   */
  validate = ({ country, region, venueType }) => {
    // console.log("country: " + country);
    // console.log("venueType: " + this.state.venueType);
    return {
      country:
        !country || country.trim().length === 0 ? "Country is required" : false,
      region:
        !region || region.trim().length === 0 ? "Region is required" : false,
      venueType:
        !venueType ||
        venueType.trim().length === 0 ||
        venueType === "Looking for..."
          ? "VenueType is required"
          : false
    };
  };

  /** handles the go button click
   * only if errors exist then prevent its default behavior
   */
  handleClick = hasErrors => {
    if (hasErrors) {
      return e => e.preventDefault();
    }
  };

  render() {
    const { country, region, venueType } = this.state;
    const errors = this.validate(this.state);
    const hasErrors = errors.country || errors.region || errors.venueType;
    // console.log("errors: " + JSON.stringify(errors));

    return (
      <div className="flex-container">
        <div className="dashboard">
          <form onSubmit={this.submitHandler}>
            <div className="row input-group mb-3">
              <label className="label col-md-5">Country</label>
              <div className="col-md-7">
                <div className="row">
                  <CountryDropdown
                    name="country-select"
                    classes="custom-select"
                    value={country}
                    onChange={val => this.selectCountry(val)}
                    required
                  />
                </div>
                <div className="row">
                  {errors.country && (
                    <span className="error">{errors.country}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="row input-group mb-3">
              <label className="label col-md-5">Region</label>
              <div className="col-md-7">
                <div className="row">
                  <RegionDropdown
                    name="region-select"
                    classes="custom-select"
                    country={country}
                    value={region}
                    onChange={val => this.selectRegion(val)}
                    required
                  />
                </div>
                <div className="row">
                  {errors.region && (
                    <span className="error">{errors.region}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="row input-group mb-3">
              <label className="label  col-md-5">Venue Type</label>{" "}
              <div className="col-md-7">
                <div className="row">
                  <select
                    name="venueType-select"
                    className="custom-select"
                    id="venueTypeSelect"
                    value={this.state.venue}
                    onChange={this.selectVenue.bind(this)}
                    required
                    defaultValue={""}
                  >
                    <option value="" disabled>
                      looking for...
                    </option>
                    <option value="food">Resturants</option>
                    <option value="cafes">Cafes</option>
                    <option value="ArtsAndEntertainment">
                      Art & Entertainment
                    </option>
                    <option value="Museums">Museums</option>
                    <option value="CollegeAndUniversity">
                      College & University
                    </option>
                    <option value="gym">Gyms</option>{" "}
                  </select>{" "}
                </div>
                <div className="row">
                  {errors.venueType && (
                    <span className="error">{errors.venueType}</span>
                  )}
                </div>
              </div>
            </div>{" "}
            <Link
              //prevent the main func of Link (navigation to the second screen)
              onClick={this.handleClick}
              to={{
                pathname: "/result",
                country: country,
                region: region,
                venueType: venueType
              }}
            >
              <button
                className="exploreButton"
                type="submit"
                disabled={hasErrors}
              >
                <span className="buttonText">Go</span>{" "}
              </button>
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

export default Dashboard;
