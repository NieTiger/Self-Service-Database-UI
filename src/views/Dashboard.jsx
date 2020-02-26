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
/*This is page selector that selects which page is shown*/
import React, { Component } from "react";
import FilterPage from "./FilterPage.jsx";
import PatientsPage from "./PatientsPage.jsx";
import ExamsPage from "./ExamsPage.jsx";
import PatientHistoryPage from "./PatientHistoryPage.jsx";
import PatientImagesPage from "./PatientImagesPage.jsx";
import ShowPatientImagePage from "./ShowPatientImagePage.jsx";

import 'bootstrap/dist/css/bootstrap.min.css';

export const apiBaseURL = "https://tigernie.com";

/*props means properties*/
/*state used for updating components- e.g. this.state.page on line 41*/
/* bind is helpful for retaining hte object instance, so it'll remember what "this" is*/

var pageStatus = {
  "PatientsPage": null,
  "FilterPage": null,
  "PatientHistoryPage": null,
  "PatientImagesPage": null,
  "ExamsPage": null,
}

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "FilterPage",
      additionalInfo: null,
      pageStatus: pageStatus,
      accessToken: this.props.accessToken,
      backToLoginPage: this.props.backToLoginPage
    };
    this.pageSelector = this.pageSelector.bind(this);
    this.changePage = this.changePage.bind(this);
  }

  componentDidMount() {
    var tempPage = null;
    var path = this.props.location.pathname
    if (path === "/admin/filters") {
      tempPage = "FilterPage"
    }
    else if (path === "/admin/cohort") {
      tempPage = "PatientsPage"
    }
    else if (path === "/admin/history") {
      tempPage = "PatientHistoryPage"
    }
    else if (path === "/admin/imageslist") {
      tempPage = "PatientImagesPage"
    }
    else if (path === "/admin/examinfo") {
      tempPage = "ExamsPage"
    }
    this.setState({
      page: tempPage,
      pageStatus: pageStatus
    })
    console.log("NEW STATE",this.state)
  }

  /* arrow functions (param1, param2, paramN) => expression*/
  /*changePage function sets the state to newState(see bottom of page)*/
  /*In ReactJS, a starting and closing tag are not necessarily required (e.g. <div></div>), different from HTML. */
  pageSelector() {
    let page = this.state.page;
    if (page === "FilterPage") {
      return (
        <FilterPage
          changePage={newState => this.changePage(newState)}
          additionalInfo={this.state.additionalInfo}
          pageStatus={this.state.pageStatus}
          accessToken = {this.state.accessToken}
          backToLoginPage = {this.state.backToLoginPage}
        />
      );
    } else if (page === "PatientsPage") {
      return (
        <PatientsPage
          changePage={newState => this.changePage(newState)}
          additionalInfo={this.state.additionalInfo}
          pageStatus={this.state.pageStatus}
          accessToken = {this.state.accessToken}
          backToLoginPage = {this.state.backToLoginPage}
        />
      );
    } else if (page === "ExamsPage") {
      return (
        <ExamsPage
          changePage={newState => this.changePage(newState)}
          additionalInfo={this.state.additionalInfo}
          pageStatus={this.state.pageStatus}
          accessToken = {this.state.accessToken}
          backToLoginPage = {this.state.backToLoginPage}
        />
      );
    } else if (page === "PatientHistoryPage") {
      return (
        <PatientHistoryPage
          changePage={newState => this.changePage(newState)}
          additionalInfo={this.state.additionalInfo}
          pageStatus={this.state.pageStatus}
          accessToken = {this.state.accessToken}
          backToLoginPage = {this.state.backToLoginPage}
        />
      );
    } else if (page === "PatientImagesPage") {
      return (
        <PatientImagesPage
          changePage={newState => this.changePage(newState)}
          additionalInfo={this.state.additionalInfo}
          pageStatus={this.state.pageStatus}
          accessToken = {this.state.accessToken}
          backToLoginPage = {this.state.backToLoginPage}
        />
      );
    } else if (page === "ShowPatientImagePage") {
      return (
        <ShowPatientImagePage
          changePage={newState => this.changePage(newState)}
          additionalInfo={this.state.additionalInfo}
          pageStatus={this.state.pageStatus}
          accessToken = {this.state.accessToken}
          backToLoginPage = {this.state.backToLoginPage}
        />
      );
    }
    return null
  }

  changePage(newState) {
    if (newState.pageStatus) {
      pageStatus = newState.pageStatus
    }
    else if (this.state.pageStatus) {
      pageStatus = this.state.pageStatus
    }
    this.setState(newState);
  }

  render() {
    let currentPage = this.pageSelector();
    return currentPage;
  }
}

export default Dashboard;
