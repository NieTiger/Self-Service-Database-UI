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

//This is the page that appears after submitting the filters page, containing patient cohort information
//Feb. 4, 2020 added comments and fixed systemtic diagnosis bug
//Feb. 10, 2020 added show and hide demonstration buttons. Not sure if it is helpful?

import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import CustomButton from "components/CustomButton/CustomButton";
import TableList from "./TableList.jsx";

import { apiBaseURL } from "./Dashboard.jsx";

const axios = require("axios");

const frontendToBackend = {
  "Eye Diagnosis": "eye_diagnosis",
  "Systemic Diagnosis": "systemic_diagnosis",
  Age: "age",
  Ethnicity: "ethnicity",
  "Image Procedure Type": "image_procedure_type",
  Labs: "labs",
  "Medication Generic Name": "medication_generic_name",
  "Medication Therapuetic Name": "medication_therapuetic_name",
  "Left Vision": "left_vision",
  "Right Vision": "right_vision",
  "Left Pressure": "left_pressure",
  "Right Pressure": "right_pressure",
  "Patient ID": "pt_id"
};

function isDict(v) {
  return (
    typeof v === "object" &&
    v !== null &&
    !(v instanceof Array) &&
    !(v instanceof Date)
  );
}

//Variables
//patientsIDs: A list of relevant patient IDs based on the filters
//patientInfo: Information for each patient obtained from the API
//filterCategories: The fitler categories that will appear on the table in the patients page (always have patient ID, also images is pushed in getPatients() function below)
//tableKey:
//exportPressed: determines whether the export details are shown (incl. export checkboxes) or not (just one single button)
class PatientsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patientsIDs: [],
      patientInfo: [],
      filterCategories: ["Patient ID"],
      selectedFilterCategories: [],
      tableKey: 1,
      exportPressed: {
        display: false
      }
    };
    this._calculateAge = this._calculateAge.bind(this);
    this.getPatients = this.getPatients.bind(this);
    this.getData = this.getData.bind(this);
    this.editData = this.editData.bind(this);
    this.getFilters = this.getFilters.bind(this);
    this.categoryFilterPressed = this.categoryFilterPressed.bind(this);
    this.getTable = this.getTable.bind(this);
    this.backButtonPressed = this.backButtonPressed.bind(this);
    this.examsPagePressed = this.examsPagePressed.bind(this);
    this.exportAllImagesPressed = this.exportAllImagesPressed.bind(this);
    this.getExport = this.getExport.bind(this);
    this.exportCategoryPressed = this.exportCategoryPressed.bind(this);
    this.exportImagesPressed = this.exportImagesPressed.bind(this);
  }

  componentDidMount() {
    this.getPatients();
  }

  //calculates and returns the age age_now from date of birth dob1
  _calculateAge(dob1) {
    var today = new Date();
    var birthDate = new Date(dob1); // create a date object directly from `dob1` argument
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age_now--;
    }
    return age_now;
  }

  //sets up the state of filterCategories, also sets up the state of patientIDs (see around line 118)
  getPatients() {
    let data = this.props.additionalInfo; //see submitButtonPressed() for additionalInfo
    let temp_data = {};
    let tempFilterCategories = this.state["filterCategories"];
    for (var key in data) {
      temp_data[frontendToBackend[key]] = data[key]; //frontendToBackend is a dictionary, defined towards the top of this file
      tempFilterCategories.push(key);
    }
    tempFilterCategories.push("Images");

    let currentComponent = this;
    axios
      .post(apiBaseURL + "/ssd_api/filter", {
        filters: temp_data
      })
      .then(function(response) {
        currentComponent.setState(
          { patientsIDs: response.data.result.pt_id },
          () => {
            currentComponent.getData();
          }
        );
      })
      .catch(function(error) {
        console.log(error);
      });

    this.setState({
      filterCategories: tempFilterCategories,
      selectedFilterCategories: tempFilterCategories
    });
  }

  //sets this.state.patientInfo to what is obtained from the API
  getData() {
    let currentComponent = this;
    let patientIDs = this.state.patientsIDs;
    for (var index in patientIDs) {
      var patientID = patientIDs[index];
      let link = apiBaseURL + "/ssd_api/patients?pt_id=" + patientID.toString();
      axios
        .get(link)
        .then(function(response) {
          let currentInfo = currentComponent.state.patientInfo;
          currentInfo.push(response.data.result);
          currentComponent.setState({ patientInfo: currentInfo }, () => {
            currentComponent.editData();
          });
        })
        .catch(function(error) {
          console.log(error);
        });
      link =
        apiBaseURL +
        "/ssd_api/filter_table_with_ptid?pt_id=" +
        patientID.toString() +
        "&table_name=pt_deid";
      axios
        .get(link)
        .then(function(response) {
          let currentInfo = currentComponent.state.patientInfo;
          currentInfo.push(response.data.result);
          currentComponent.setState({ patientInfo: currentInfo }, () => {
            currentComponent.editData();
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }

  //Obtains the filter categories used, including the CustomButton styling, for the left side of the page
  getFilters() {
    var filter_categories = this.state.filterCategories;
    var temp_filter_categories = [];
    var show_category = null;
    var hide_category = null;
    //add two demonstration show and hide buttons
    show_category = (
      <CustomButton style={styles.buttonDivPressed}> Shown </CustomButton>
    );
    temp_filter_categories.push(show_category);
    hide_category = (
      <CustomButton style={styles.buttonDiv}> Hidden </CustomButton>
    );
    temp_filter_categories.push(hide_category);
    for (var i = 0; i < filter_categories.length; i++) {
      var category_name = filter_categories[i];
      var temp_filter_category = null;
      if (this.state.selectedFilterCategories.indexOf(category_name) !== -1) {
        temp_filter_category = (
          <CustomButton
            style={styles.buttonDivPressed}
            title={category_name}
            onClick={e => this.categoryFilterPressed(e)}
          >
            {" "}
            {category_name}{" "}
          </CustomButton>
        );
      } else {
        temp_filter_category = (
          <CustomButton
            style={styles.buttonDiv}
            title={category_name}
            onClick={e => this.categoryFilterPressed(e)}
          >
            {" "}
            {category_name}{" "}
          </CustomButton>
        );
      }
      temp_filter_categories.push(temp_filter_category);
    }
    return temp_filter_categories;
  }

  editData() {
    if (this.state.patientsIDs.length * 2 !== this.state.patientInfo.length) {
      return;
    }
    let patientInfo = {};

    for (var i = 0; i < this.state.patientInfo.length; i++) {
      let patient = this.state.patientInfo[i];
      let key_list = Object.keys(patient);
      if (key_list[0] !== "data") {
        patientInfo[key_list[0]] = patient[key_list[0]];
      }
    }

    for (var j = 0; j < this.state.patientInfo.length; j++) {
      let patient = this.state.patientInfo[j];
      let key_list = Object.keys(patient);
      if (key_list[0] === "data") {
        var patientPersonal = patient.data[0];
        var patientID = patientPersonal.pt_id;
        var ethnicity = patientPersonal.race_1;
        var age = this._calculateAge(patientPersonal.dob);
        patientInfo[patientID]["ethnicity"] = ethnicity;
        patientInfo[patientID]["age"] = age;
      }
    }
    this.setState({
      patientInfo: patientInfo,
      loaded: "true"
    });
  }

  //Loops through each category to create the relevant table info for patient history page
  //Outside loop goes through each patient ID
  //Inside loop goes through each filter category of each patient ID
  getTable() {
    if (!this.state.loaded) {
      return null;
    }
    let patientInfo = this.state.patientInfo;
    let categoryTitles = [];
    let tableData = [];
    for (var i = 0; i < this.state.patientsIDs.length; i++) {
      let patientID = this.state.patientsIDs[i];
      let tempPatientInfo = [];
      for (var j = 0; j < this.state.filterCategories.length; j++) {
        let category = this.state.filterCategories[j];
        if (this.state.selectedFilterCategories.indexOf(category) !== -1) {
          //if the category is one of the selected, then run this block
          var value = {};
          if (categoryTitles.indexOf(category) === -1) {
            categoryTitles.push(category);
          }
          //If the patient ID number is pressed, jump to the PatientHistoryPage with the given patientID
          if (category === "Patient ID") {
            value["type"] = "button";
            value["text"] = patientID;
            let newState = {
              page: "PatientHistoryPage",
              additionalInfo: {
                patientID: patientID,
                patientInfo: patientInfo[patientID],
                FilterPage: this.props.additionalInfo
              }
            };
            value["submitFunction"] = newState =>
              this.props.changePage(newState);
            value["submitInformation"] = newState;
            tempPatientInfo.push(value);
          }
          //If images is pressed, jump to the PatientImagesPage
          else if (category === "Images") {
            value["type"] = "button";
            value["text"] = "See Images";
            let newState = {
              page: "PatientImagesPage",
              additionalInfo: {
                patientID: patientID,
                FilterPage: this.props.additionalInfo
              }
            };
            value["submitFunction"] = newState =>
              this.props.changePage(newState);
            value["submitInformation"] = newState;
            tempPatientInfo.push(value);
          } else {
            var tempValue = patientInfo[patientID][frontendToBackend[category]];
            var text = [];
            if (isDict(tempValue)) {
              for (var key in tempValue) {
                /*logging in console for error checking*/
                /*
                                var str = "hello hello";
                                console.log(str)
                                var str2 = "this is key";
                                console.log(str2)
                                console.log(key)
                                var str3 = "this is tempValue";
                                console.log(str3)
                                console.log(tempValue)
                                */
                if (tempValue[key] == null) {
                  text.push(key);
                } else {
                  text.push(key + " (" + tempValue[key].substring(0, 16) + ")"); // e.g. key is the diagnosis, and tempValue[key] displays the date
                }
                text.push(<br />);
              }
            } else {
              text = tempValue;
            }
            value["type"] = "string";
            value["text"] = text;
            tempPatientInfo.push(value);
          }
        }
      }
      tableData.push(tempPatientInfo);
    }
    console.log("table data", tableData);
    return (
      <TableList
        key={this.state.tableKey}
        columns={categoryTitles}
        rows={tableData}
      ></TableList>
    );
  }

  //If the category filter pressed doesn't exist (first if), then push to selectedFilterCategories, otherwise remain the same
  categoryFilterPressed(e) {
    let category = e.target.title;
    if (this.state.selectedFilterCategories.indexOf(category) === -1) {
      this.state.selectedFilterCategories.push(category);
      this.setState({
        selectedFilterCategories: this.state.selectedFilterCategories,
        tableKey: this.state.tableKey + 1
      });
    } else {
      var new_list = this.state.selectedFilterCategories.filter(function(name) {
        return name !== category;
      });
      this.setState({
        selectedFilterCategories: new_list,
        tableKey: this.state.tableKey + 1
      });
    }
  }

  //When the back button is pressed, jump to the original filter page while maintaing additionalInfo (stuff relating to the filters the user submitted, retaining "memory")
  backButtonPressed() {
    let newState = {
      page: "FilterPage",
      additionalInfo: this.props.additionalInfo
    };
    this.props.changePage(newState);
  }

  //When the see all exams button is pressed, jump to the exams page while maintaining the info from patients page and filter page
  examsPagePressed() {
    let newState = {
      page: "ExamsPage",
      additionalInfo: {
        PatientsPage: this.state.patientsIDs,
        FilterPage: this.props.additionalInfo
      }
    };
    this.props.changePage(newState);
  }

  //used in the getExport() function to set the state of "exportPressed"
  exportAllImagesPressed() {
    this.setState({
      exportPressed: {
        display: !this.state.exportPressed.display
      }
    });
  }

  //If the cateogry is pressed, then if it was not already pressed, set state to true. Otherwise also set state to true.
  exportCategoryPressed(e) {
    let category = e.target.title;
    if (this.state.exportPressed[category]) {
      this.setState({
        exportPressed: {
          [category]: !this.state.exportPressed.display,
          display: true
        }
      });
    } else {
      this.setState({
        exportPressed: {
          [category]: true,
          display: true
        }
      });
    }
  }

  exportImagesPressed() {
    //code for exporting all images
    return null;
  }

  //If the export button is pressed, then display the checkboxes with patient ID, diagnosis, image procedure; otherwise, don't display those
  getExport() {
    if (!this.state.exportPressed.display) {
      return (
        <CustomButton
          style={styles.buttonUpperExport}
          onClick={() => this.exportAllImagesPressed()}
        >
          EXPORT ALL IMAGES
        </CustomButton>
      );
    }
    return (
      <div>
        <CustomButton
          style={styles.buttonUpperExport}
          onClick={() => this.exportAllImagesPressed()}
        >
          EXPORT ALL IMAGES
        </CustomButton>
        <div style={styles.exportDropdownPressed}>
          <div>
            <input
              type="checkbox"
              title={"by Patient ID"}
              onChange={e => this.exportCategoryPressed(e)}
            />
            by Patient ID
          </div>
          <div>
            <input
              type="checkbox"
              title={"by diagnosis"}
              onChange={e => this.exportCategoryPressed(e)}
            />
            by diagnosis
          </div>
          <div>
            <input
              type="checkbox"
              title={"by image procedure"}
              onChange={e => this.exportCategoryPressed(e)}
            />
            by image procedure
          </div>
        </div>
        <CustomButton
          style={styles.buttonUpperExport}
          onClick={() => this.exportImagesPressed()}
        >
          EXPORT IMAGES
        </CustomButton>
      </div>
    );
  }

  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }

  //render displays what is shown on the webpage
  render() {
    console.log("state", this.state);
    var all_filters = this.getFilters();
    var exportButton = this.getExport();
    var table = this.getTable();
    return (
      <div style={styles.container}>
        <Grid fluid>
          <Row style={styles.titleStyle}>
            <Col style={styles.titleText}>
              <div>Your Patient Cohort</div>
            </Col>
          </Row>
          {/* <Row>
            <Col sm={3}></Col>
            <Col sm={3}>
              <CustomButton style={styles.buttonDivPressed}>
                {" "}
                Shown{" "}
              </CustomButton>
            </Col>
            <Col sm={3}>
              <CustomButton style={styles.buttonDiv}> Hidden </CustomButton>
            </Col>
            <Col sm={3}></Col>
          </Row> */}
          <Row>
            <Col sm={3} style={styles.sideDivStyle}>
              {all_filters}
            </Col>
            <Col sm={9} style={styles.mainDivStyle}>
              <Grid fluid>
                <Row>
                  {table}
                  <div style={styles.underMainStyle}>
                    <CustomButton
                      style={styles.buttonUpperSubmit}
                      onClick={() => this.backButtonPressed()}
                    >
                      BACK TO FILTERS PAGE
                    </CustomButton>
                    <CustomButton
                      style={styles.buttonUpperReset}
                      onClick={() => this.examsPagePressed()}
                    >
                      GO TO EXAMS PAGE
                    </CustomButton>
                    {exportButton}
                  </div>
                </Row>
              </Grid>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default PatientsPage;

const styles = {
  titleStyle: {
    height: "10vh",
    "margin-bottom": "2vh"
  },
  titleText: {
    display: "flex",
    "align-items": "center",
    "justify-content": "center",
    "font-weight": "bold",
    "font-size": "30px"
  },
  buttonDiv: {
    width: "100%",
    margin: "1vh",
    "background-color": "white",
    color: "black",
    border: "solid 2px black"
  },
  buttonDivPressed: {
    width: "100%",
    margin: "1vh",
    "background-color": "#78deec",
    color: "black",
    border: "solid 2px black"
  },
  mainDivCategoryStyle: {
    height: "20vh",
    overflow: "scroll",
    border: "solid 2px black",
    margin: "1vh"
  },
  mainDivButtonTitle: {
    display: "flex",
    "justify-content": "center",
    "font-weight": "bold",
    "text-decoration": "underline"
  },
  underMainStyle: {
    display: "flex",
    "flex-direction": "column",
    "justify-content": "flex-end",
    "align-items": "flex-end",
    "padding-right": "2vh"
  },
  buttonUpperSubmit: {
    width: "40vh",
    color: "black",
    border: "solid 2px black",
    "font-weight": "bold",
    "background-color": "#eef27c"
  },
  buttonUpperReset: {
    width: "40vh",
    color: "black",
    border: "solid 2px black",
    "font-weight": "bold",
    "background-color": "#eef27c",
    "margin-top": "1vh"
  },
  buttonUpperExport: {
    width: "40vh",
    color: "black",
    border: "solid 2px black",
    "font-weight": "bold",
    "background-color": "#eef27c",
    "margin-top": "1vh",
    "margin-bottom": "1vh"
  }
};
