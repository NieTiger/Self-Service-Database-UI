import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import CustomButton from "components/CustomButton/CustomButton";
import TableList from "./TableList.jsx";

import { apiBaseURL } from "./Dashboard.jsx";

const axios = require("axios");

const filter_categories = [
  "Exam ID",
  "Exam Date",
  "Image ID",
  "Image Procedure",
  "Image Laterality",
  "Link To Image"
];

//Feb. 10, 2020 categoryFilterPressed still needs to be written

//PatientImagesPage displays a table of a list of images relating to one exam of one patient
class PatientImagesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patientID: null,
      filterCategories: filter_categories,
      selectedFilterCategories: filter_categories,
      exportPressed: {
        display: false
      }
    };
    this.getData = this.getData.bind(this);
    this.getFilters = this.getFilters.bind(this);
    this.getTable = this.getTable.bind(this);
    this.getExport = this.getExport.bind(this);
    this.exportImagesPressed = this.exportImagesPressed.bind(this);
    this.exportAllImagesPressed = this.exportAllImagesPressed.bind(this);
    this.exportCategoryPressed = this.exportCategoryPressed.bind(this);
    this.backButtonPressed = this.backButtonPressed.bind(this);
  }

  componentDidMount() {
    this.setState(
      {
        patientID: this.props.additionalInfo.patientID
      },
      () => this.getData()
    );
  }

  //Acquires data from the API and sets the state of patientInfo to be patientInfo
  getData() {
    var currentComponent = this;
    var patientID = this.state.patientID;
    var link = apiBaseURL + "/ssd_api/patient_images?pt_id=" + patientID;
    axios
      .get(link)
      .then(function(response) {
        var patientInfo = response.data.result[patientID];
        currentComponent.setState({
          patientInfo: patientInfo,
          loaded: true
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  //Acquires the list of filters to populate on the left side of the website
  getFilters() {
    var filter_categories = this.state.filterCategories;
    var temp_filter_categories = [];
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

  //gets the table of information for the right side of the website
  getTable() {
    if (!this.state.loaded) {
      return null;
    }

    console.log("check this out", this.state.patientInfo);

    var selectedCategories = [];
    for (var i = 0; i < this.state.filterCategories.length; i++) {
      let category = this.state.filterCategories[i];
      if (this.state.selectedFilterCategories.indexOf(category) !== -1) {
        selectedCategories.push(category);
      }
    }

    //from the this.state.patientInfo, acquire imageinfo, then push the contents of imageinfo into tempImageData
    //i represents the number of patients
    //j represents the images?
    //The other j represents going through each category
    //k represents going through each image's data (and pushing that category information onto each image)
    //After completing tempImageData, create tableData to display on the webpage
    //TableList object with categories as columns and tableData as the rows
    let tableData = [];
    for (var i = 0; i < this.state.patientInfo.length; i++) {
      var imageInfo = this.state.patientInfo[i];
      console.log("imaeg info", imageInfo);
      let tempImageData = [];
      for (var j = 0; j < imageInfo.images.length; j++) {
        tempImageData.push([]);
      }
      for (var j = 0; j < selectedCategories.length; j++) {
        var category = selectedCategories[j];
        if (category === "Exam ID") {
          for (var k = 0; k < tempImageData.length; k++) {
            let value = {
              type: "string",
              text: imageInfo.exam_id
            };
            tempImageData[k].push(value);
          }
        } else if (category === "Exam Date") {
          for (var k = 0; k < tempImageData.length; k++) {
            let value = {
              type: "string",
              text: imageInfo.exam_date
            };
            tempImageData[k].push(value);
          }
        } else if (category === "Image ID") {
          for (var k = 0; k < imageInfo.images.length; k++) {
            let value = {
              type: "string",
              text: imageInfo.images[k].image_id
            };
            tempImageData[k].push(value);
          }
        } else if (category === "Image Procedure") {
          for (var k = 0; k < imageInfo.images.length; k++) {
            let value = {
              type: "string",
              text: imageInfo.images[k].image_type
            };
            tempImageData[k].push(value);
          }
        } else if (category === "Image Laterality") {
          for (var k = 0; k < imageInfo.images.length; k++) {
            let value = {
              type: "string",
              text: imageInfo.images[k].image_laterality
            };
            tempImageData[k].push(value);
          }
        } else if (category === "Link To Image") {
          for (var k = 0; k < imageInfo.images.length; k++) {
            let newState = {
              page: "ShowPatientImagePage",
              additionalInfo: {
                imageID: imageInfo.images[k].image_id,
                patientID: this.state.patientID
              }
            };
            let value = {
              type: "button",
              text: "See Image",
              submitFunction: newState => this.props.changePage(newState),
              submitInformation: newState
            };
            tempImageData[k].push(value);
          }
        }
      }
      console.log("temp image data", tempImageData);
      for (var j = 0; j < tempImageData.length; j++) {
        tableData.push(tempImageData[j]);
      }
    }
    console.log("table data", tableData);
    return (
      <TableList
        key={this.state.tableKey}
        columns={selectedCategories}
        rows={tableData}
      ></TableList>
    );
  }

  exportImagesPressed() {
    //code for exporting all images
  }

  //similar to the other pages, to be used in the getExport function, sets the state when the button is pressed
  exportAllImagesPressed() {
    this.setState({
      exportPressed: {
        display: !this.state.exportPressed.display
      }
    });
  }

  //Generate multilple buttons when the export all images button is pressed
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

  //indicates/sets the state when an export category is pressed
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

  //Goes back to the PatientsPage when the back button is pressed
  backButtonPressed() {
    let newState = {
      page: "PatientsPage",
      additionalInfo: this.props.additionalInfo.FilterPage
    };
    this.props.changePage(newState);
  }

  render() {
    var all_filters = this.getFilters();
    var table = this.getTable();
    var exportButton = this.getExport();
    return (
      <div>
        <Grid fluid>
          <Row style={styles.titleStyle}>
            <Col lg={12} sm={8} style={styles.titleText}>
              <div>Individual Patient Images ID: {this.state.patientID}</div>
            </Col>
          </Row>
          <Row>
            <Col lg={3} sm={3}>
              {all_filters}
            </Col>
            <Col lg={9} sm={6}>
              <Grid fluid>
                <Row>
                  <div style={styles.mainDivStyle}>{table}</div>
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

export default PatientImagesPage;

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
  mainDivStyle: {
    "max-height": "90vh",
    "max-width": "120vh",
    overflow: "scroll"
  },
  underMainStyle: {
    display: "flex",
    "flex-direction": "column",
    "justify-content": "flex-end",
    "align-items": "flex-end",
    "padding-right": "2vh"
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
