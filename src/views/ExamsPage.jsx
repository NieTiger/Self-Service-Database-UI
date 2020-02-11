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
import { Grid, Row, Col } from "react-bootstrap";
import CustomButton from "components/CustomButton/CustomButton";
import TableList from "./TableList.jsx";

import { apiBaseURL } from "./Dashboard.jsx";

const axios = require("axios");

const frontendToBackend = {
  "Patient ID": "pt_id",
  "Image Procedure": "image_procedure_id",
  "Exam ID": "exam_id",
  "Exam Date": "exam_date"
};

//Feb. 10, 2020: ExamPage data is not displaying currently

//ExamPage displays all patient exams on a page
class ExamPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patientsIDs: [],
      patientInfo: [],
      filterCategories: [
        "Patient ID",
        "Image Procedure",
        "Exam ID",
        "Exam Date",
        "Exam Links"
      ],
      selectedFilterCategories: [
        "Patient ID",
        "Image Procedure",
        "Exam ID",
        "Exam Date",
        "Exam Links"
      ],
      tableKey: 1,
      exportPressed: {
        display: false
      }
    };
    this.getData = this.getData.bind(this);
    this.editData = this.editData.bind(this);
    this.getFilters = this.getFilters.bind(this);
    this.categoryFilterPressed = this.categoryFilterPressed.bind(this);
    this.backButtonPressed = this.backButtonPressed.bind(this);
    this.exportAllImagesPressed = this.exportAllImagesPressed.bind(this);
    this.getExport = this.getExport.bind(this);
    this.exportCategoryPressed = this.exportCategoryPressed.bind(this);
    this.exportImagesPressed = this.exportImagesPressed.bind(this);
  }

  componentDidMount() {
    this.setState(
      {
        patientsIDs: this.props.additionalInfo.PatientsPage
      },
      () => this.getData()
    );
  }

  //Similar to the other pages, getData() acquires data from the API and sets the state of patientInfo to currentInfo
  getData() {
    var currentComponent = this;
    for (var i = 0; i < this.state.patientsIDs.length; i++) {
      var patientID = this.state.patientsIDs[i];
      var link = apiBaseURL + "/ssd_api/patient_images?pt_id=" + patientID;
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

  //gets filter names from this.state.filterCategories (already preset to certain ones (see top of code))
  getFilters() {
    var filter_categories = this.state.filterCategories;
    var temp_filter_categories = [];
    for (var i = 0; i < filter_categories.length; i++) {
      var category_name = filter_categories[i];
      var temp_filter_category = null;
      if (this.state.selectedFilterCategories.indexOf(category_name) !== -1) {
        //if category_name exists in selectedFilterCategories...
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
    if (this.state.patientsIDs.length !== this.state.patientInfo.length) {
      return;
    }

    let patientInfo = {};

    for (var i = 0; i < this.state.patientInfo.length; i++) {
      let patient = this.state.patientInfo[i];
      let key_list = Object.keys(patient);
      patientInfo[key_list[0]] = patient[key_list[0]];
    }
    this.setState({
      patientInfo: patientInfo,
      loaded: "true"
    });
  }

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

  //Three kinds of possible value to be generated
  //1. Patient ID
  //2. Images
  //3. actual exam information
  //returns TableList object with the categories as the columns and table information as the rows
  getTable() {
    if (!this.state.loaded) {
      return null;
    }
    let patientInfo = this.state.patientInfo;
    let categoryTitles = [];
    let tableData = [];

    for (var i = 0; i < this.state.patientsIDs.length; i++) {
      let patientID = this.state.patientsIDs[i];
      for (var j = 0; j < patientInfo[patientID].length; j++) {
        var value = {}; //testing, added, commented out code in this function are original code
        let examInfo = patientInfo[patientID][j];
        let tempPatientInfo = [];
        for (var k = 0; k < this.state.filterCategories.length; k++) {
          let category = this.state.filterCategories[k];
          if (this.state.selectedFilterCategories.indexOf(category) !== -1) {
            if (categoryTitles.indexOf(category) === -1) {
              categoryTitles.push(category);
            }
            if (category == "Patient ID") {
              value["type"] = "button";
              value["text"] = patientID;
              tempPatientInfo.push(value);
              //tempPatientInfo.push(patientID)
            } else if (category == "Images") {
              value["type"] = "button";
              value["text"] = "See Images";
              tempPatientInfo.push(value);
              //tempPatientInfo.push("images")
            } else {
              //will need to come back to this part to populate the exams page table
              value["type"] = "string";
              value["text"] = examInfo[frontendToBackend[category]];
              tempPatientInfo.push(value);
              //tempPatientInfo.push(examInfo[frontendToBackend[category]])
            }
          }
        }
        tableData.push(tempPatientInfo);
      }
    }
    //for error checking
    var str10 = "this is tableData";
    console.log(str10);
    console.log(tableData);
    var str20 = "this is this.state.filterCategories";
    console.log(str20);
    console.log(this.state.filterCategories);
    return (
      <TableList
        key={this.state.tableKey}
        columns={categoryTitles}
        rows={tableData}
      ></TableList>
    );
  }

  backButtonPressed() {
    let newState = {
      page: "PatientsPage",
      additionalInfo: this.props.additionalInfo.FilterPage
    }; /*let allows you to declare variables that are limited to a scope of ablock statement, unlike var, which defines variable globally*/
    this.props.changePage(newState);
  }

  exportAllImagesPressed() {
    this.setState({
      exportPressed: {
        display: !this.state.exportPressed.display
      }
    });
  }

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
  }

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

  render() {
    var all_filters = this.getFilters();
    var exportButton = this.getExport();
    var mainTable = this.getTable();
    return (
      <div>
        <Grid fluid>
          <Row style={styles.titleStyle}>
            <Col lg={12} sm={8} style={styles.titleText}>
              <div>Your Exams For Patients</div>
            </Col>
          </Row>
          <Row>
            <Col sm={3}>{all_filters}</Col>
            <Col sm={9}>
              <Grid fluid>
                <Row>
                  <div style={styles.mainDivStyle}>{mainTable}</div>
                  <div style={styles.underMainStyle}>
                    <CustomButton
                      style={styles.buttonUpperBack}
                      onClick={() => this.backButtonPressed()}
                    >
                      BACK TO PATIENTS PAGE
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
export default ExamPage;

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
  underMainStyle: {
    display: "flex",
    "flex-direction": "column",
    "justify-content": "flex-end",
    "align-items": "flex-end",
    "padding-right": "2vh"
  },
  mainDivStyle: {
    height: "70vh",
    overflow: "scroll"
  },
  buttonUpperBack: {
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
