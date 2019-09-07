import React from "react";

const Dashboard = () => (
  <div className="dashboard">
    <div className="row input-group mb-3">
      <label className="label col-md-5">Country</label>
      <select className="custom-select" id="inputGroupSelect01">
        <option selected>Select Country...</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
    </div>
    <div className="row input-group mb-3">
      <label className="label col-md-5">Region</label>
      <select className="custom-select" id="inputGroupSelect01">
        <option selected>Select Region...</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
    </div>
    <div className="row input-group mb-3">
      <label className="label  col-md-5">Venue Type</label>
      <select className="custom-select" id="inputGroupSelect01">
        <option selected>Select Venue...</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
    </div>
    <button className="exploreButton">
      {" "}
      <span className="buttonText">Go</span>
    </button>
  </div>
);
export default Dashboard;
