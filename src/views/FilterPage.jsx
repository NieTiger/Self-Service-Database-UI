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

/*Feb. 4, 2020: fixed some warnings relating to varaible declaration*/

import React, { Component } from "react";
import { Grid, Row, Col, InputGroup } from "react-bootstrap";

import CustomButton from "components/CustomButton/CustomButton";

import { apiBaseURL } from "./Dashboard.jsx";

/*values assigned to const cannot be changed*/
const filter_categories = [
  "Eye Diagnosis",
  "Systemic Diagnosis",
  "Age",
  "Ethnicity",
  "Image Procedure Type",
  "Labs",
  "Medication Generic Name",
  "Medication Therapeutic Name",
  "Vision",
  "Pressure"
];

const axios = require("axios");

/*variable definitions
filter_categories: An array of custombuttons containing e.g. eye diagnosis, age, ethnicity, etc. 
filter_subcategories: The items in each category constitute filter_subcategories (e.g ketorolac, etc. ), with the indexing 
filter_subcategories_div: A list of the actual items with each subcategory box, including the checkboxes and styling itself, with the key of the array being e.g. Age
selected_categories: A list of numbers that represent which categories were selected
selected_values:
checkbox_values: 
*/
class FilterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter_categories: [],
      filter_subcategories_div: {},
      selected_categories: [],
      selected_values: {},
      checkbox_values: {},
      elasticSearch: {}
    };
    this.getFilterCategories = this.getFilterCategories.bind(this);
    this.createFilterSubcategoryDivs = this.createFilterSubcategoryDivs.bind(
      this
    );
    this.getSelectedFilters = this.getSelectedFilters.bind(this);
    this.categoryFilterPressed = this.categoryFilterPressed.bind(this);
    this.subcategoryFilterPressed = this.subcategoryFilterPressed.bind(this);
    this.checkBoxChanged = this.checkBoxChanged.bind(this);
    this.resetButtonPressed = this.resetButtonPressed.bind(this);
    this.submitButtonPressed = this.submitButtonPressed.bind(this);
    this.isSubcategoryChecked = this.isSubcategoryChecked.bind(this);
    this.textFieldChanged = this.textFieldChanged.bind(this);
    this.getElasticSearch = this.getElasticSearch.bind(this);
  }

  componentDidMount() {
    let filter_categories = this.getFilterCategories();
    this.setState({
      filter_categories: filter_categories
    });
    //this.getFilterSubCategories();
    if (this.props.pageStatus.FilterPage) {
      var tempSelectedCategories = [];
      for (var key in this.props.pageStatus.FilterPage) {
        tempSelectedCategories.push(key);
      }
      this.setState({
        selected_categories: tempSelectedCategories,
        selected_values: this.props.pageStatus.FilterPage
      });
    }
    setTimeout(() => {
      this.createFilterSubcategoryDivs();
    }, 1000);

  }

  //resets all of the filters and subfilters selected
  resetButtonPressed() {
    this.setState({
      selected_categories: [],
      selected_values: {},
      checkbox_values: {}
    });
  }

  //submits all of the filters to the patients page
  submitButtonPressed() {
    let temp_selected_values = this.state.selected_values;
    for (var key in this.state.checkbox_values) {
      temp_selected_values[key] = this.state.checkbox_values[key];
    }
    var tempPageStatus = this.props.pageStatus;
    tempPageStatus["FilterPage"] = temp_selected_values;
    tempPageStatus["PatientsPage"] = temp_selected_values;
    let newState = {
      page: "PatientsPage" /*when button is pressed, goes to the PatientsPage*/,
      additionalInfo: temp_selected_values,
      pageStatus: tempPageStatus
    };
    this.props.changePage(newState);
  }

  //function populates the side div of all avaliable categories according to filter_categories
  getFilterCategories() {
    var temp_filter_categories = [];
    for (var i = 0; i < filter_categories.length; i++) {
      var category_name = filter_categories[i];
      var temp_filter_category = null;
      if (this.state.selected_categories.indexOf(category_name) !== -1) {
        temp_filter_category /*selected_categories provide a list of index numbers that show which categories were selected. If selected, styles have blue background.*/ = (
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

  isSubcategoryChecked(key, name) {
    try {
      if (this.state.selected_values[key].indexOf(name) !== -1) {
        return true
      }
    }
    catch (e) { }
    try {
      if (this.state.selected_values[key][name]) {
        return true
      }
    }
    catch (e) { }
    return false;
  }

  createFilterSubcategoryDivs(changedDiv, keyword) {
    let temp_filter_subcategories_div = this.state.filter_subcategories_div;
    let tempElasticResult = this.state.elasticSearch
    let elasticResult = {}
    if (changedDiv && keyword && keyword.length > 2) {
      this.getElasticSearch(changedDiv, keyword)
      for (var key in tempElasticResult) {
        elasticResult[key] = tempElasticResult[key].map(name =>
          <div>
            <input
              type="checkbox"
              defaultChecked={this.isSubcategoryChecked(changedDiv, name)}
              title={changedDiv + ";" + name}
              onChange={e => this.subcategoryFilterPressed(e)}
            />
            {name}
            <br />
          </div>)
      }
    }

    for (var index = 0; index < this.state.filter_categories.length; index++) {
      var name = this.state.filter_categories[index].props.title
      if (name === "Vision" || name === "Pressure" && (!changedDiv || changedDiv === name)) {
        temp_filter_subcategories_div["Left " + name] =
          <Col lg={3} sm={4} style={styles.mainDivCategoryStyle}>
            <div style={styles.mainDivButtonTitle}>{"Left " + name}</div>
            <input
              type="checkbox"
              defaultChecked={this.isSubcategoryChecked("Left " + name, "less")}
              title={"Left " + name + ";" + "less"}
              onChange={e => this.subcategoryFilterPressed(e)}
              style={styles.main_div_button_checkbox}
            />
            {"less"}
            <input
              type="text"
              defaultChecked={this.isSubcategoryChecked("Left " + name, "less")}
              title={"Left " + name + ";" + "less"}
              onChange={e => this.checkBoxChanged(e)}
              style={styles.main_div_button_text}
            />
            <br />
            <input
              type="checkbox"
              defaultChecked={this.isSubcategoryChecked("Left " + name, "greater")}
              title={"Left " + name + ";" + "greater"}
              onChange={e => this.subcategoryFilterPressed(e)}
              style={styles.main_div_button_checkbox}
            />
            {"greater"}
            <input
              type="text"
              defaultChecked={this.isSubcategoryChecked("Left " + name, "greater")}
              title={"Left " + name + ";" + "greater"}
              onChange={e => this.checkBoxChanged(e)}
              style={styles.main_div_button_text}
            />
            <br />
            <input
              type="checkbox"
              defaultChecked={this.isSubcategoryChecked("Left " + name, "equal")}
              title={"Left " + name + ";" + "equal"}
              onChange={e => this.subcategoryFilterPressed(e)}
              style={styles.main_div_button_checkbox}
            />
            {"equal"}
            <input
              type="text"
              defaultChecked={this.isSubcategoryChecked("Left " + name, "equal")}
              title={"Left " + name + ";" + "equal"}
              onChange={e => this.checkBoxChanged(e)}
              style={styles.main_div_button_text}
            />
            <br />
            <input
              type="checkbox"
              defaultChecked={this.isSubcategoryChecked("Left " + name, "between")}
              title={"Left " + name + ";" + "between"}
              onChange={e => this.subcategoryFilterPressed(e)}
              style={styles.main_div_button_checkbox}
            />
            {name}
            <input
              type="text"
              title={"Left " + name + ";" + "between less"}
              onChange={e => this.checkBoxChanged(e)}
              style={styles.main_div_button_text}
            />
            and
              <input
              type="text"
              title={"Left " + name + ";" + "between greater"}
              onChange={e => this.checkBoxChanged(e)}
              style={styles.main_div_button_text}
            />
          </Col>

        temp_filter_subcategories_div["Right " + name] =
          <Col lg={3} sm={4} style={styles.mainDivCategoryStyle}>
            <div style={styles.mainDivButtonTitle}>{"Right " + name}</div>
            <input
              type="checkbox"
              defaultChecked={this.isSubcategoryChecked("Right " + name, "less")}
              title={"Right " + name + ";" + "less"}
              onChange={e => this.subcategoryFilterPressed(e)}
              style={styles.main_div_button_checkbox}
            />
            {"less"}
            <input
              type="text"
              defaultChecked={this.isSubcategoryChecked("Right " + name, "less")}
              title={"Right " + name + ";" + "less"}
              onChange={e => this.checkBoxChanged(e)}
              style={styles.main_div_button_text}
            />
            <br />
            <input
              type="checkbox"
              defaultChecked={this.isSubcategoryChecked("Right " + name, "greater")}
              title={"Right " + name + ";" + "greater"}
              onChange={e => this.subcategoryFilterPressed(e)}
              style={styles.main_div_button_checkbox}
            />
            {"greater"}
            <input
              type="text"
              defaultChecked={this.isSubcategoryChecked("Right " + name, "greater")}
              title={"Right " + name + ";" + "greater"}
              onChange={e => this.checkBoxChanged(e)}
              style={styles.main_div_button_text}
            />
            <br />
            <input
              type="checkbox"
              defaultChecked={this.isSubcategoryChecked("Right " + name, "equal")}
              title={"Right " + name + ";" + "equal"}
              onChange={e => this.subcategoryFilterPressed(e)}
              style={styles.main_div_button_checkbox}
            />
            {"equal"}
            <input
              type="text"
              defaultChecked={this.isSubcategoryChecked("Right " + name, "equal")}
              title={"Right " + name + ";" + "equal"}
              onChange={e => this.checkBoxChanged(e)}
              style={styles.main_div_button_text}
            />
            <br />
            <input
              type="checkbox"
              defaultChecked={this.isSubcategoryChecked("Right " + name, "between")}
              title={"Right " + name + ";" + "between"}
              onChange={e => this.subcategoryFilterPressed(e)}
              style={styles.main_div_button_checkbox}
            />
            {name}
            <input
              type="text"
              title={"Right " + name + ";" + "between less"}
              onChange={e => this.checkBoxChanged(e)}
              style={styles.main_div_button_text}
            />
            and
          <input
              type="text"
              title={"Right " + name + ";" + "between greater"}
              onChange={e => this.checkBoxChanged(e)}
              style={styles.main_div_button_text}
            />
          </Col>
      }
      else if (name === "Age" && (!changedDiv || changedDiv === name)) {
        temp_filter_subcategories_div[name] =
          <Col lg={3} sm={4} style={styles.mainDivCategoryStyle}>
            <div style={styles.mainDivButtonTitle}>{name}</div>
            <input
              type="checkbox"
              defaultChecked={this.isSubcategoryChecked(name, "less")}
              title={name + ";" + "less"}
              onChange={e => this.subcategoryFilterPressed(e)}
              style={styles.main_div_button_checkbox}
            />
            {"less"}
            <input
              type="text"
              defaultChecked={this.isSubcategoryChecked(name, "less")}
              title={name + ";" + "less"}
              onChange={e => this.checkBoxChanged(e)}
              style={styles.main_div_button_text}
            />
            <br />
            <input
              type="checkbox"
              defaultChecked={this.isSubcategoryChecked(name, "greater")}
              title={name + ";" + "greater"}
              onChange={e => this.subcategoryFilterPressed(e)}
              style={styles.main_div_button_checkbox}
            />
            {"greater"}
            <input
              type="text"
              defaultChecked={this.isSubcategoryChecked(name, "greater")}
              title={name + ";" + "greater"}
              onChange={e => this.checkBoxChanged(e)}
              style={styles.main_div_button_text}
            />
            <br />
            <input
              type="checkbox"
              defaultChecked={this.isSubcategoryChecked(name, "equal")}
              title={name + ";" + "equal"}
              onChange={e => this.subcategoryFilterPressed(e)}
              style={styles.main_div_button_checkbox}
            />
            {"equal"}
            <input
              type="text"
              defaultChecked={this.isSubcategoryChecked(name, "equal")}
              title={name + ";" + "equal"}
              onChange={e => this.checkBoxChanged(e)}
              style={styles.main_div_button_text}
            />
            <br />
            <input
              type="checkbox"
              defaultChecked={this.isSubcategoryChecked(name, "between")}
              title={name + ";" + "between"}
              onChange={e => this.subcategoryFilterPressed(e)}
              style={styles.main_div_button_checkbox}
            />
            {"between"}
            <input
              type="text"
              title={name + ";" + "between less"}
              onChange={e => this.checkBoxChanged(e)}
              style={styles.main_div_button_text}
            />
            and
              <input
              type="text"
              title={name + ";" + "between greater"}
              onChange={e => this.checkBoxChanged(e)}
              style={styles.main_div_button_text}
            />
          </Col>
      }
      else if (!changedDiv || changedDiv === name) {
        temp_filter_subcategories_div[name] =
          <Col lg={3} sm={4} style={styles.mainDivCategoryStyle}>
            <div style={styles.mainDivButtonTitle}>{name}</div>
            <input
              style={styles.inputStyle}
              placeholder="Search for keyword"
              onChange={e => this.textFieldChanged(e)}
              title={name}
            />
            {elasticResult[name]}
          </Col>
      }
    }

    this.setState({
      filter_subcategories_div: temp_filter_subcategories_div
    });
  }

  //receives the updated keyword for a certain subcategory div, calls the elastic search API endpoint, and updates the results
  textFieldChanged(e) {
    this.createFilterSubcategoryDivs(e.target.title, e.target.value)
  }

  //fills the div of subcategory with results of elastic search
  getElasticSearch(category, value) {
    let currentComponent = this;
    const axios = require("axios");
    const frontendToBackend = {
      "Eye Diagnosis": "eye_diagnosis",
      "Systemic Diagnosis": "systemic_diagnosis",
      "Medication Generic Name": "medication_generic_name",
      "Medication Therapeutic Name": "medication_therapeutic_class",
      "Image Procedure Type": "image_procedure",
      "Labs": "lab"
    }
    var link = "https://tigernie.com/ssd_api/es/" + frontendToBackend[category] + "?query=" + value;
    const options = {
      url: link,
      method: 'GET',
    };
    axios(options)
      .then(function (response) {
        var data = response.data.result.matches
        var tempElasticSearch = currentComponent.state.elasticSearch
        tempElasticSearch[category] = data
        currentComponent.setState({
          "elasticSearch": tempElasticSearch
        })
      })
      .catch(function (error) {
        if (error.message === "Request failed with status code 401") {
          currentComponent.props.backToLoginPage()
        }
      });
  }
  //returns an array of selected categories. In the case that it is either vision or pressure, add both left and right to each push.
  getSelectedFilters() {
    var chosen_categories = [];
    for (var i = 0; i < this.state.selected_categories.length; i++) {
      var name = this.state.selected_categories[i];
      if (name === "Vision") {
        chosen_categories.push(
          this.state.filter_subcategories_div["Left Vision"]
        );
        chosen_categories.push(
          this.state.filter_subcategories_div["Right Vision"]
        );
      } else if (name === "Pressure") {
        chosen_categories.push(
          this.state.filter_subcategories_div["Left Pressure"]
        );
        chosen_categories.push(
          this.state.filter_subcategories_div["Right Pressure"]
        );
      } else {
        chosen_categories.push(this.state.filter_subcategories_div[name]);
      }
    }
    return chosen_categories;
  }

  //updates state.selected_categories according to categories selected
  categoryFilterPressed(e) {
    let category = e.target.title;
    if (this.state.selected_categories.indexOf(category) === -1) {
      this.state.selected_categories.push(category);
      this.setState({
        selected_categories: this.state.selected_categories
      });
    } else {
      var new_list = this.state.selected_categories.filter(function (name) {
        return name !== category;
      });
      this.setState({
        selected_categories: new_list
      });
    }
  }

  //updates state.selected_values according to subcategories selected: subcategory filters showing up on website, etc
  subcategoryFilterPressed(e) {
    let event = e.target.title;
    let values = event.split(";");
    let category = values[0];
    let value = values[1];
    if (!this.state.selected_values[category]) {
      /*edited due to warning*/
      var temp_selected_values = this.state.selected_values;
      temp_selected_values[category] = [value];
      this.setState({
        selected_values: temp_selected_values
      });
      /*
      this.state.selected_values[category] = [value];
      this.setState({
        selected_values: this.state.selected_values
      });*/
    } else if (this.state.selected_values[category].indexOf(value) === -1) {
      this.state.selected_values[category].push(value);
      this.setState({
        selected_values: this.state.selected_values
      });
    } else {
      var temp_list = this.state.selected_values[category].filter(function (
        name
      ) {
        return name !== value;
      });
      var new_list = this.state.selected_values;
      new_list[category] = temp_list;
      this.setState({
        selected_values: new_list
      });
    }
  }

  //updates checkbox_values according to checkbox changed: individual checkboxes in each subcategory
  checkBoxChanged(e) {
    let value = e.target.value;
    let cat_and_sub = e.target.title.split(";");
    let category = cat_and_sub[0];
    let subcategory = cat_and_sub[1];

    let temp_checkbox = this.state.checkbox_values;
    if (!temp_checkbox[category]) {
      temp_checkbox[category] = {
        [subcategory]: value
      };
    } else {
      temp_checkbox[category][subcategory] = value;
    }

    this.setState({
      checkbox_values: temp_checkbox
    });
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
  render() {
    let filter_categories = this.getFilterCategories();
    var chosen_filters = this.getSelectedFilters();
    return (
      <div className="content">
        <Grid fluid>
          <Row style={styles.titleStyle}>
            <Col lg={12} sm={8} style={styles.titleText}>
              <div>Please Select Your Filters to Create a Patient Cohort</div>
            </Col>
          </Row>
          <Row style={styles.underTitleStyle}>
            <CustomButton
              style={styles.buttonUpperSubmit}
              onClick={() => this.submitButtonPressed()}
            >
              SUBMIT
            </CustomButton>
            <CustomButton
              style={styles.buttonUpperReset}
              onClick={() => this.resetButtonPressed()}
            >
              RESET
            </CustomButton>
          </Row>
          <Row>
            <Col lg={3} sm={3} style={styles.sideDivStyle}>
              {filter_categories}
            </Col>
            <Col lg={9} sm={6} style={styles.mainDivStyle}>
              <Grid fluid>
                <Row>{chosen_filters}</Row>
              </Grid>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default FilterPage;

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
  sideDivStyle: {
    height: "80vh"
  },
  mainDivStyle: {
    height: "90vh"
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
  underTitleStyle: {
    display: "flex",
    "justify-content": "flex-end",
    "align-items": "flex-end",
    "padding-right": "16%"
  },
  buttonUpperSubmit: {
    width: "12em",
    "margin-right": "1vh",
    color: "black",
    border: "solid 2px black",
    "font-weight": "bold",
    "background-color": "#a3ec9a"
  },
  buttonUpperReset: {
    width: "12em",
    "margin-right": "1vh",
    color: "black",
    border: "solid 2px black",
    "font-weight": "bold",
    "background-color": "#ec585a"
  },
  inputStyle: {
    width: "100%",
    color: "lighgray"
  }
};
