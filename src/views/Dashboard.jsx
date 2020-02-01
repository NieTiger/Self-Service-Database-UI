/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import FilterPage from "./FilterPage.jsx";
import PatientsPage from "./PatientsPage.jsx";

export const apiBaseURL = "https://tigernie.com";

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      "page": "FilterPage",
      "additionalInfo": null
    }
    this.pageSelector = this.pageSelector.bind(this);
    this.changePage = this.changePage.bind(this)
  }

  pageSelector() {
    let page = this.state.page
    if (page === "FilterPage") {
      return <FilterPage changePage={(newState) => this.changePage(newState)} additionalInfo={this.state.additionalInfo}/>
    }
    else if (page === "PatientsPage") {
      return <PatientsPage changePage={(newState) => this.changePage(newState)} additionalInfo={this.state.additionalInfo}/>
    }
  }

  changePage(newState) {
    this.setState(newState)
  }

  render() {
    let currentPage = this.pageSelector()
    return (
      currentPage
    )
  }
}

export default Dashboard;

