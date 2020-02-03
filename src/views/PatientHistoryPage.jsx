import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import CustomButton from "components/CustomButton/CustomButton";
import TableList from "./TableList.jsx";

import { apiBaseURL } from "./Dashboard.jsx";

const axios = require("axios");

/* const filter_categories = [
    "Date",
    "Eye Diagnosis",
    "Systemic Diagnosis",
    "Age",
    "Ethnicity",
    "Image Procedure Type",
    "Labs",
    "Medication Generic Name",
    "Medication Therapuetic Name",
    "Vision",
    "Pressure",
    "Exam ID"
  ]; */

  const filter_categories = [
    "Date",
    "Eye Diagnosis",
    "Systemic Diagnosis",
    "Labs",
    "Medication Generic Name",
    "Medication Therapuetic Name",
    "Vision",
    "Pressure",
    "Exam ID"
  ];

  const frontendToBackend = {
    "Eye Diagnosis": "eye_diagnosis",
    "Systemic Diagnosis": "systemic_diagnosis",
    "Age": "age",
    "Ethnicity": "ethnicity",
    "Image Procedure Type": "image_type",
    "Labs": "lab_values",
    "Medication Generic Name": "medication_generic_name",
    "Medication Therapuetic Name": "medication_therapuetic_name",
    "Left Vision": "left_vision",
    "Right Vision": "right_vision",
    "Left Pressure": "left_pressure",
    "Right Pressure": "right_pressure",
    "Date": "date",
    "Exam ID": "exam_id"
}

const backendToFrontend = {}
for (var key in frontendToBackend) {
    backendToFrontend[frontendToBackend[key]] = key
}

function isDict(v) {
    return typeof v==='object' && v!==null && !(v instanceof Array) && !(v instanceof Date);
}

function compareDates(a,b) {
    var year_a = parseInt(a.substring(12,16))
    var month_a = a.substring(8,11)
    var day_a = parseInt(a.substring(5,7))

    var year_b = parseInt(b.substring(12,16))
    var month_b = b.substring(8,11)
    var day_b = parseInt(b.substring(5,7))

    const months = {
        "Jan": 0,
        "Feb": 1,
        "Mar": 2,
        "Apr": 3,
        "May": 4,
        "Jun": 5,
        "Jul": 6,
        "Aug": 7,
        "Sep": 8,
        "Oct": 9,
        "Nov": 10,
        "Dec": 11
    }

    if (year_a !== year_b) {
        return year_a - year_b
    }
    if (months[month_a] !== months[month_b]) {
        return months[month_a] - months[month_b]
    }
    if (day_a !== day_b) {
        return day_a - day_b
    }
    return 0
}

class PatientHistoryPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            "patientID": null,
            "filterCategories": filter_categories,
            "selectedFilterCategories": filter_categories,
            "tableKey": 1,
            "exportPressed": {
                "display": false
            },
        }
        this.getData = this.getData.bind(this)
        this.editData = this.editData.bind(this)
        this.getFilters = this.getFilters.bind(this)
        this.categoryFilterPressed = this.categoryFilterPressed.bind(this)
        this.getTables = this.getTables.bind(this)
        this.getSummaryTable = this.getSummaryTable.bind(this)
        this.backButtonPressed = this.backButtonPressed.bind(this)
        this.imagesButtonPressed = this.imagesButtonPressed.bind(this)
    }

    componentDidMount() {
        this.setState({
            "patientID": this.props.additionalInfo.patientID
        }, () => this.getData())
    }

    getData() {
        var currentComponent = this;
        var patientID = this.state.patientID
        var link = apiBaseURL + "/ssd_api/patients?pt_id=" + patientID
        axios
            .get(link)
            .then(function(response) {
                var patientInfo = response.data.result[patientID]
                currentComponent.setState({"patientInfo": patientInfo}, () => {
                    currentComponent.editData();
                });
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    editData() {
        if (!this.state.patientInfo) {
            return
        }
        let patientInfo = {}
        for (var key in this.state.patientInfo) {
            if (key === "eye_diagnosis" || key === "systemic_diagnosis") {
                for (var key2 in this.state.patientInfo[key]) {
                    if (this.state.patientInfo[key][key2] !== null) {
                        var date = this.state.patientInfo[key][key2].substring(0,16)
                        patientInfo[date] = {}
                    }
                }
            }
            else if (typeof this.state.patientInfo[key] === "object") {
                for (var i = 0; i < this.state.patientInfo[key].length; i++) {
                    if (isDict(this.state.patientInfo[key][i]) && this.state.patientInfo[key][i].date) {
                        var date = this.state.patientInfo[key][i].date.substring(0,16)
                        patientInfo[date] = {}
                    }
                }
            }
        }
        for (var key in this.state.patientInfo) {
            if (key === "eye_diagnosis" || key === "systemic_diagnosis") {
                for (var key2 in this.state.patientInfo[key]) {
                    var date = this.state.patientInfo[key][key2].substring(0,16)
                    if (patientInfo[date]) {
                        patientInfo[date][backendToFrontend[key]] = key2
                    }
                }
            }
            else if (key === "vision" || key === "pressure") {
                var category1 = null
                var category2 = null
                if (key === "vision") {
                    category1 = "Left Vision"
                    category2 = "Right Vision"
                }
                else {
                    category1 = "Left Pressure"
                    category2 = "Right Pressure"
                }
                for (var i = 0; i < this.state.patientInfo[key].length; i++) {
                    if (this.state.patientInfo[key][i].date) {
                        var date = this.state.patientInfo[key][i].date.substring(0,16)
                        var category = category2
                        if (this.state.patientInfo[key][i].name.search("LEFT") !== -1) {
                            category = category1
                        }
                        patientInfo[date][category] =  this.state.patientInfo[key][i].value
                    }
                }
            }
            else if (key === "lab_values") {
                for (var i = 0; i < this.state.patientInfo[key].length; i++) {
                    if (this.state.patientInfo[key][i].date) {
                        var date = this.state.patientInfo[key][i].date.substring(0,16)
                        var category = backendToFrontend[key]
                        patientInfo[date][category] =  {
                            "Lab Name": this.state.patientInfo[key][i].lab_name,
                            "Lab Value": this.state.patientInfo[key][i].lab_value,
                        }
                    }
                }
            }
            else if (key === "medication") {
                for (var i = 0; i < this.state.patientInfo[key].length; i++) {
                    if (this.state.patientInfo[key][i].date) {
                        var date = this.state.patientInfo[key][i].date.substring(0,16)
                        patientInfo[date]["Medication Generic Name"] = this.state.patientInfo[key][i].generic_name
                        patientInfo[date]["Medication Therapeutic Name"] = this.state.patientInfo[key][i].therapeutic_class
                    }
                }
            }
        }
        this.setState({
            "patientInfo": patientInfo,
            "loaded": "true",
        })
    }

    getFilters() {
        var filter_categories = this.state.filterCategories;
        var temp_filter_categories = [];
        for (var i = 0; i < filter_categories.length; i++) {
            var category_name = filter_categories[i];
            var temp_filter_category = null
            if (this.state.selectedFilterCategories.indexOf(category_name) !== -1){
                temp_filter_category = (
                    <CustomButton style={styles.buttonDivPressed} title = {category_name} onClick = {e => this.categoryFilterPressed(e)} > {category_name} </CustomButton>
                );
            }
            else {
                temp_filter_category = (
                    <CustomButton style={styles.buttonDiv} title = {category_name} onClick = {e => this.categoryFilterPressed(e)} > {category_name} </CustomButton>
                );
            }
            temp_filter_categories.push(temp_filter_category);
        }
        return temp_filter_categories
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

    getTables() {
        if (!this.state.loaded) {
            return null
        }

        var selectedCategories = []
        for (var i = 0; i < this.state.filterCategories.length; i++) {
            let category = this.state.filterCategories[i]
            if (this.state.selectedFilterCategories.indexOf(category) !== -1) {
                if (category === "Vision" || category  === "Pressure") {
                    selectedCategories.push("Left " + category )
                    selectedCategories.push("Right " + category )
                }
                else {
                    selectedCategories.push(category )
                }
            }
        }

        let patientInfo = this.state.patientInfo
        let tableData = []

        for (var date in patientInfo) {
            let data = patientInfo[date]
            let tempDateData = []
            let isEmpty = true
            if (selectedCategories.indexOf("Date") !== -1) {
                tempDateData = [{
                    "type": "string",
                    "text": date
                }]
            }
            for (var i = 0; i < selectedCategories.length; i++) {
                let category = selectedCategories[i]
                let value = {
                    "type": "string",
                    "text": ""
                }
                var tempValue = data[category]
                if (!tempValue) {
                    tempDateData.push(value)
                }
                else {
                    isEmpty = false
                    var text = []
                    if (category === "Labs") {
                        const labName = tempValue["Lab Name"]
                        const labValue = tempValue["Lab Value"]
                        if (labName && labValue) {
                            text.push(labName + ": " + labValue)
                            text.push(<br/>)
                        }
                        else if (labName) {
                            text.push(labName + ": " + "undefined")
                            text.push(<br/>)
                        }
                    }
                    else {
                        text = tempValue
                    }
                    value["text"] = text
                    tempDateData.push(value)
                }
            }
            if (!isEmpty) {
                tableData.push(tempDateData)
            }
        }
        tableData.sort((a, b) => compareDates(b[0].text,a[0].text))
        return [<TableList key = {this.state.tableKey} columns={selectedCategories} rows={tableData}></TableList>,this.getSummaryTable(tableData[0])]
    }

    getSummaryTable(patientData) {
        if (!patientData[0]) {
            return null
        }

        const selectedCategories = [
            "Date",
            "Eye Diagnosis",
            "Systemic Diagnosis",
            "Age",
            "Ethnicity",
            "Image Procedure Type",
            "Labs",
            "Medication Generic Name",
            "Medication Therapuetic Name",
            "Left Vision",
            "Right Vision",
            "Left Pressure",
            "Right Pressure",
            "Exam ID"
        ];

        var date = patientData[0].text
        patientData = this.state.patientInfo[date]
        
        var patientInfo = this.props.additionalInfo.patientInfo
        patientData["Ethnicity"] = patientInfo.ethnicity
        patientData["Image Procedure Type"] = patientInfo.image_type
        patientData["Age"] = patientInfo.age
        patientData["Date"] = date
        
        console.log("check this out",patientData)

        let tableData = []
        let tempDateData = []

        for (var i = 0; i < selectedCategories.length; i++) {
            let category = selectedCategories[i]
            console.log("category",category)
            console.log(patientData[category])
            let value = {
                "type": "string",
                "text": patientData[category]
            }
            let tempText = []
            if (typeof patientData[category] === "object") {
                for (var j = 0; j < patientData[category].length; j++) {
                    tempText.push(patientData[category][j])
                    tempText.push(<br/>)
                }
                value["text"] = tempText
            }
            tempDateData.push(value)
            
        }
        tableData = [tempDateData]
        return <TableList columns={selectedCategories} rows={tableData}></TableList>
    }

    backButtonPressed() {
        let newState = {
            "page": "PatientsPage",
            "additionalInfo": this.props.additionalInfo.FilterPage
        }
        this.props.changePage(newState)
    }

    imagesButtonPressed() {
        
    }

    render() {
        console.log("state",this.state)

        var all_filters = this.getFilters()
        var tables = this.getTables();
        var table = null
        var summaryTable = null
        if (tables) {
            table = tables[0]
            summaryTable = tables[1]
        }

        return (
            <div>
                <Grid fluid>
                    <Row style = {styles.titleStyle}>
                        <Col lg={12} sm={8} style = {styles.titleText}>
                            <div>
                                Individual Patient History ID: {this.state.patientID}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={3} sm={3}>
                            {all_filters}
                        </Col>                    
                        <Col lg={9} sm={6}>
                            <Grid fluid>
                                <Row style = {styles.underTitleStyle}>
                                    {summaryTable}
                                </Row>
                                <Row>
                                    <div style = {styles.mainDivStyle}>
                                        {table}
                                    </div>
                                    <div style = {styles.underMainStyle}> 
                                        <CustomButton  style = {styles.buttonUpperBack} onClick={() => this.backButtonPressed()}>BACK TO PATIENTS PAGE</CustomButton>
                                        <CustomButton  style = {styles.buttonUpperImages} onClick={() => this.imagesButtonPressed()}>SEE ALL PATIENTS IMAGES</CustomButton>
                                    </div> 
                                </Row>
                            </Grid>
                        </Col>
                    </Row> 
                </Grid>
            </div>
        )
    }
} 

export default PatientHistoryPage;

const styles = {
    titleStyle: {
        "height": "10vh",
        "margin-bottom": "2vh",
    },
    titleText: {
        "display": "flex",
        "align-items": "center",
        "justify-content": "center",
        "font-weight": "bold",
        "font-size": "30px",
    },
    buttonDiv: {
        "width": "100%",
        "margin": "1vh",
        "background-color": "white",
        "color": "black",
        "border": "solid 2px black",
    },
    buttonDivPressed: {
      "width": "100%",
      "margin": "1vh",
      "background-color": "#78deec",
      "color": "black",
      "border": "solid 2px black",
    },
    mainDivStyle: {
        "max-height": "90vh",
        "max-width": "120vh",
        "overflow": "scroll",
    },
    underTitleStyle: {
        "max-width": "120vh",
        "overflow": "scroll",
    },
    underMainStyle: {
        "display": "flex",
        "flex-direction": "column",
        "justify-content": "flex-end",
        "align-items": "flex-end",
        "padding-right": "2vh",
    },
    buttonUpperBack: {
        "width": "40vh",
        "color": "black",
        "border": "solid 2px black",
        "font-weight": "bold",
        "background-color": "#eef27c",
        "margin-top": "1vh",
    },
    buttonUpperImages: {
        "width": "40vh",
        "color": "black",
        "border": "solid 2px black",
        "font-weight": "bold",
        "background-color": "#eef27c",
        "margin-top": "1vh",
        "margin-bottom": "1vh"
    },
}