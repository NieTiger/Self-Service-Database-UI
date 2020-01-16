import React, { Component } from "react";
import "./PatientHistoryPage.css";
import Table from "./Table.js";
import axios from "axios";
import { apiBaseURL } from "./config";

class PatientHistoryPage extends Component {
  constructor(props) {
    super(props);
    this.get_summary_data = this.get_summary_data.bind(this);
    this.get_summary_data_columns = this.get_summary_data_columns.bind(this);
    this.get_appointment_data = this.get_appointment_data.bind(this);
    this.get_appointment_data_columns = this.get_appointment_data_columns.bind(
      this
    );
    this.state = {
      PT_ID: this.props.app_state.prev_state.PT_ID,
      patient_og_data: [],
      patient_summary_data: [],
      patient_appointment_data: [],
      original_filters: this.get_appointment_data_columns(),
      filters: this.get_appointment_data_columns()
    };
    this.show_hide_category_changed = this.show_hide_category_changed.bind(
      this
    );
    this.get_data_categories = this.get_data_categories.bind(this);
    this.categories_selected = this.categories_selected.bind(this);
    this.load_data = this.load_data.bind(this);
    this.fill_up_summary = this.fill_up_summary.bind(this);
  }

  componentDidMount() {
    this.load_data();
  }

  load_data() {
    this.get_summary_data();
  }

  get_summary_data() {
    let currentState = this;
    let link = apiBaseURL + "/ssd_api/patients?pt_id=".concat(this.state.PT_ID);
    axios
      .get(link)
      .then(function(response) {
        console.log("response received")
        console.log(response)
        let current_patient_data =
          response.data.result[currentState.state.PT_ID];
        currentState.setState(
          {
            patient_summary_data: current_patient_data,
            patient_og_data: current_patient_data
          },
          () => {
            currentState.get_appointment_data();
          }
        );
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  fill_up_summary() {
    let last_appointment = this.state.patient_appointment_data[
      this.state.patient_appointment_data.length - 1
    ];

    let first_column = "Patient ID ".concat(
      this.props.app_state.prev_state.PT_ID
    );
    let current_data = [{ [first_column]: "Current Values" }];

    if (last_appointment["Left Vision"]) {
      current_data[0]["Left Vision"] = last_appointment["Left Vision"];
    } else {
      current_data[0]["Left Vision"] = "None";
    }

    if (last_appointment["Right Vision"]) {
      current_data[0]["Right Vision"] = last_appointment["Right Vision"];
    } else {
      current_data[0]["Right Vision"] = "None";
    }

    if (last_appointment["Left Pressure"]) {
      current_data[0]["Left Pressure"] = last_appointment["Left Pressure"];
    } else {
      current_data[0]["Left Pressure"] = "None";
    }

    if (last_appointment["Right Pressure"]) {
      current_data[0]["Right Pressure"] = last_appointment["Right Pressure"];
    } else {
      current_data[0]["Right Pressure"] = "None";
    }

    if (
      last_appointment["Eye Diagnoses"] !== "None" &&
      last_appointment["Systemic Diagnoses"] !== "None"
    ) {
      current_data[0]["Diagnoses"] = last_appointment["Eye Diagnoses"]
        .concat("\n")
        .concat(last_appointment["Systemic Diagnoses"]);
    } else if (last_appointment["Eye Diagnoses"] !== "None") {
      current_data[0]["Diagnoses"] = last_appointment["Eye Diagnoses"];
    } else if (last_appointment["Systemic Diagnoses"] !== "None") {
      current_data[0]["Diagnoses"] = last_appointment["Systemic Diagnoses"];
    } else {
      current_data[0]["Diagnoses"] = "None";
    }

    if (last_appointment["Medication"]) {
      current_data[0]["Medication"] = last_appointment["Medication"];
    } else {
      current_data[0]["Medication"] = "None";
    }

    this.setState({ patient_summary_data: current_data });
  }

  get_data_categories() {
    let result = [];
    for (var i in this.state.original_filters) {
      if (this.state.filters.indexOf(this.state.original_filters[i]) !== -1) {
        result.push(this.state.original_filters[i]);
      }
    }
    return result;
  }

  categories_selected(category) {
    return this.state.filters.indexOf(category) !== -1;
  }

  show_hide_category_changed(item) {
    if (this.state.filters.indexOf(item) === -1) {
      this.state.filters.push(item);
      this.setState({ filters: this.state.filters });
    } else {
      var new_list = this.state.filters.filter(function(name) {
        return name !== item;
      });
      this.setState({ filters: new_list });
    }
  }

  get_summary_data_columns() {
    let first_column = "Patient ID ".concat(
      this.props.app_state.prev_state.PT_ID
    );
    let columns = [
      first_column,
      "Left Vision",
      "Right Vision",
      "Left Pressure",
      "Right Pressure",
      "Diagnoses",
      "Medication"
    ];
    return columns;
  }

  get_appointment_data() {
    let patient_data = [];
    let dates = {};

    //medication
    for (var i = 0; i < this.state.patient_og_data.medication.length; i++) {
      let date = null;
      if (this.state.patient_og_data.medication[i]["date"] !== null) {
        date = this.state.patient_og_data.medication[i]["date"].substring(
          0,
          16
        );
      }
      if (dates[date] && dates[date]["medication"]) {
        dates[date]["medication"] = dates[date]["medication"]
          .concat("\n")
          .concat(this.state.patient_og_data.medication[i]["generic_name"]);
      } else if (dates[date]) {
        dates[date]["medication"] = this.state.patient_og_data.medication[i][
          "generic_name"
        ];
      } else {
        dates[date] = {
          medication: this.state.patient_og_data.medication[i]["generic_name"]
        };
      }
    }
    //therapeutic class
    for (let i = 0; i < this.state.patient_og_data.medication.length; i++) {
      let date = null;
      if (this.state.patient_og_data.medication[i]["date"] !== null) {
        date = this.state.patient_og_data.medication[i]["date"].substring(
          0,
          16
        );
      }
      if (dates[date] && dates[date]["therapeutic_class"]) {
        dates[date]["therapeutic_class"] = dates[date]["therapeutic_class"]
          .concat("\n")
          .concat(
            this.state.patient_og_data.medication[i]["therapeutic_class"]
          );
      } else if (dates[date]) {
        dates[date][
          "therapeutic_class"
        ] = this.state.patient_og_data.medication[i]["therapeutic_class"];
      } else {
        dates[date] = {
          therapeutic_class: this.state.patient_og_data.medication[i][
            "therapeutic_class"
          ]
        };
      }
    }
    //eye diagnosis
    for (let i = 0; i < this.state.patient_og_data.eye_diagnosis.length; i++) {
      if (this.state.patient_og_data.eye_diagnosis[i].length === 2) {
        let date = null;
        if (this.state.patient_og_data.eye_diagnosis[i][1] !== null) {
          date = this.state.patient_og_data.eye_diagnosis[i][1].substring(
            0,
            16
          );
        }
        if (dates[date] && dates[date]["eye_diagnosis"]) {
          dates[date]["eye_diagnosis"] = dates[date]["eye_diagnosis"]
            .concat("\n")
            .concat(this.state.patient_og_data.eye_diagnosis[i][0]);
        } else if (dates[date]) {
          dates[date][
            "eye_diagnosis"
          ] = this.state.patient_og_data.eye_diagnosis[i][0];
        } else {
          dates[date] = {
            eye_diagnosis: this.state.patient_og_data.eye_diagnosis[i][0]
          };
        }
      }
    }
    //systemic diagnosis
    for (
      let i = 0;
      i < this.state.patient_og_data.systemic_diagnosis.length;
      i++
    ) {
      if (this.state.patient_og_data.systemic_diagnosis[i].length === 2) {
        let date = null;
        if (this.state.patient_og_data.systemic_diagnosis[i][1] !== null) {
          date = this.state.patient_og_data.systemic_diagnosis[i][1].substring(
            0,
            16
          );
        }
        if (dates[date] && dates[date]["systemic_diagnosis"]) {
          dates[date]["systemic_diagnosis"] = dates[date]["systemic_diagnosis"]
            .concat("\n")
            .concat(this.state.patient_og_data.systemic_diagnosis[i][0]);
        } else if (dates[date]) {
          dates[date][
            "systemic_diagnosis"
          ] = this.state.patient_og_data.systemic_diagnosis[i][0];
        } else {
          dates[date] = {
            systemic_diagnosis: this.state.patient_og_data.systemic_diagnosis[
              i
            ][0]
          };
        }
      }
    }
    //lab values
    for (let i = 0; i < this.state.patient_og_data.lab_values.length; i++) {
      let date = null;
      if (this.state.patient_og_data.lab_values[i]["date"] !== null) {
        date = this.state.patient_og_data.lab_values[i]["date"].substring(
          0,
          16
        );
      }
      let phrase = this.state.patient_og_data.lab_values[i]["lab_name"]
        .concat(": ")
        .concat(this.state.patient_og_data.lab_values[i]["lab_value"]);
      if (dates[date] && dates[date]["lab_values"]) {
        dates[date]["lab_values"] = dates[date]["lab_values"]
          .concat("\n")
          .concat(phrase);
      } else if (dates[date]) {
        dates[date]["lab_values"] = phrase;
      } else {
        dates[date] = { lab_values: phrase };
      }
    }

    //left vision
    for (let i = 0; i < this.state.patient_og_data.vision.length; i++) {
      let date = null;
      if (this.state.patient_og_data.vision[i]["date"] !== null) {
        date = this.state.patient_og_data.vision[i]["date"].substring(0, 16);
      }
      let phrase = this.state.patient_og_data.vision[i]["value"];
      if (dates[date] && dates[date]["left_vision"]) {
        dates[date]["left_vision"] = dates[date]["left_vision"]
          .concat("\n")
          .concat(phrase);
      } else if (dates[date]) {
        dates[date]["left_vision"] = phrase;
      } else {
        dates[date] = { left_vision: phrase };
      }
    }
    //right vision
    for (let i = 0; i < this.state.patient_og_data.vision.length; i++) {
      let date = null;
      if (this.state.patient_og_data.vision[i]["date"] !== null) {
        date = this.state.patient_og_data.vision[i]["date"].substring(0, 16);
      }
      let phrase = this.state.patient_og_data.vision[i]["value"];
      if (dates[date] && dates[date]["right_vision"]) {
        dates[date]["right_vision"] = dates[date]["right_vision"]
          .concat("\n")
          .concat(phrase);
      } else if (dates[date]) {
        dates[date]["right_vision"] = phrase;
      } else {
        dates[date] = { right_vision: phrase };
      }
    }

    //left pressure
    for (let i = 0; i < this.state.patient_og_data.pressure.length; i++) {
      let date = null;
      if (this.state.patient_og_data.pressure[i]["date"] !== null) {
        date = this.state.patient_og_data.pressure[i]["date"].substring(0, 16);
      }
      let phrase = this.state.patient_og_data.pressure[i]["value"];
      if (dates[date] && dates[date]["left_pressure"]) {
        dates[date]["left_pressure"] = dates[date]["left_pressure"]
          .concat("\n")
          .concat(phrase);
      } else if (dates[date]) {
        dates[date]["left_pressure"] = phrase;
      } else {
        dates[date] = { left_pressure: phrase };
      }
    }

    //right pressure
    for (let i = 0; i < this.state.patient_og_data.pressure.length; i++) {
      let date = null;
      if (this.state.patient_og_data.pressure[i]["date"] !== null) {
        date = this.state.patient_og_data.pressure[i]["date"].substring(0, 16);
      }
      let phrase = this.state.patient_og_data.pressure[i]["value"];
      if (dates[date] && dates[date]["right_pressure"]) {
        dates[date]["right_pressure"] = dates[date]["right_pressure"]
          .concat("\n")
          .concat(phrase);
      } else if (dates[date]) {
        dates[date]["right_pressure"] = phrase;
      } else {
        dates[date] = { right_pressure: phrase };
      }
    }
    console.log(dates);
    for (var key in dates) {
      let patient = {};
      patient["Date"] = key;
      if (dates[key]["medication"]) {
        patient["Medication"] = dates[key]["medication"];
      } else {
        patient["Medication"] = "None";
      }
      if (dates[key]["therapeutic_class"]) {
        patient["Therapeutic Class"] = dates[key]["therapeutic_class"];
      } else {
        patient["Therapeutic Class"] = "None";
      }
      if (dates[key]["eye_diagnosis"]) {
        patient["Eye Diagnoses"] = dates[key]["eye_diagnosis"];
      } else {
        patient["Eye Diagnoses"] = "None";
      }
      if (dates[key]["systemic_diagnosis"]) {
        patient["Systemic Diagnoses"] = dates[key]["systemic_diagnosis"];
      } else {
        patient["Systemic Diagnoses"] = "None";
      }
      if (dates[key]["lab_values"]) {
        patient["Lab Values"] = dates[key]["lab_values"];
      } else {
        patient["Lab Values"] = "None";
      }
      if (dates[key]["left_vision"]) {
        let vision_values = dates[key]["left_vision"].split("\n");
        patient["Left Vision"] = vision_values[0];
        if (vision_values.length > 1) {
          patient["Right Vision"] = vision_values[1];
        } else {
          patient["Right Vision"] = "None";
        }
      } else {
        patient["Left Vision"] = "None";
        patient["Right Vision"] = "None";
      }
      if (dates[key]["left_pressure"]) {
        let pressure_values = dates[key]["left_pressure"].split("\n");
        patient["Left Pressure"] = pressure_values[0];
        if (pressure_values.length > 1) {
          patient["Right Pressure"] = pressure_values[1];
        } else {
          patient["Right Pressure"] = "None";
        }
      } else {
        patient["Left Pressure"] = "None";
        patient["Right Pressure"] = "None";
      }
      patient["Exam ID"] = Math.floor(Math.random() * 10000) + 10000;
      patient_data.push(patient);
    }
    this.setState({ patient_appointment_data: patient_data }, () => {
      this.fill_up_summary();
    });
  }

  get_appointment_data_columns() {
    let columns = [
      "Date",
      "Medication",
      "Therapeutic Class",
      "Eye Diagnoses",
      "Systemic Diagnoses",
      "Lab Values",
      "Left Vision",
      "Right Vision",
      "Left Pressure",
      "Right Pressure",
      "Exam ID"
    ];
    return columns;
  }

  render() {
    let show_hide_filters = [];
    for (var key in this.state.original_filters) {
      let category = this.state.original_filters[key];
      let show_hide_label = (
        <div className="show_hide_category">
          <input
            type="checkbox"
            checked={this.categories_selected(category)}
            onChange={() => this.show_hide_category_changed(category)}
          ></input>
          <label> {category} </label>
        </div>
      );
      show_hide_filters.push(show_hide_label);
    }
    return (
      <div className="whole_div">
        <div className="title_div_history">
          Individual Patient History- ID:{" "}
          {this.props.app_state.prev_state.PT_ID}
        </div>
        <div className="before_body_div_history">
          <Table
            patient_data={this.state.patient_summary_data}
            filters={this.get_summary_data_columns()}
          ></Table>
        </div>
        <div className="body_div_history">
          <div className="show_hide_panel_history">
            <div className="show_hide_t_history">
              Show/Hide
              <div className="show_hide_c">{show_hide_filters}</div>
            </div>
          </div>
          <div className="table_design_history">
            <Table
              patient_data={this.state.patient_appointment_data}
              filters={this.get_data_categories()}
            ></Table>
          </div>
        </div>
        <div className="bottom_div_history">
          <button
            className="button_concept"
            onClick={() =>
              this.props.submit_function("patients", this.props.filters)
            }
          >
            {" "}
            Back To Patients Page
          </button>
          <button
            className="button_concept"
            onClick={() =>
              this.props.submit_function(
                "patient images",
                this.props.app_state.prev_state
              )
            }
          >
            {" "}
            See All Patient Images
          </button>
        </div>
      </div>
    );
  }
}

export default PatientHistoryPage;
