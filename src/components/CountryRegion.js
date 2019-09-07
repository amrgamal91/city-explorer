import React, { Component } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
// note that you can also export the source data via CountryRegionData. It's in a deliberately concise format to
// keep file size down
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

class CountryRegion extends Component {
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
      <div>
        <CountryDropdown
          value={country}
          onChange={val => this.selectCountry(val)}
        />
        <RegionDropdown
          country={country}
          value={region}
          onChange={val => this.selectRegion(val)}
        />
        <DropdownButton
          id="dropdown-basic-button"
          title="Venue Type"
          variant="warning"
        >
          <Dropdown.Item href="#/action-1">Cafes</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Resturants</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Hospitals</Dropdown.Item>
        </DropdownButton>
      </div>
    );
  }
}

export default CountryRegion;
