import React, { Component } from "react";
import "./PatientsPage.css";
import Table from "./Table.js";
import axios from "axios";
import { apiBaseURL } from "./config";

class PatientsPage extends Component {
  constructor(props) {
    super(props);
    this.get_filters = this.get_filters.bind(this);
    this.get_data = this.get_data.bind(this);
    this.get_patients = this.get_patients.bind(this);
    this.state = {
      original_filters: ["PT_ID"].concat(this.get_filters()).concat(["images"]),
      filters: ["PT_ID"].concat(this.get_filters()).concat(["images"]),
      patient_data: {}
    };
    this.show_hide_category_changed = this.show_hide_category_changed.bind(
      this
    );
    this.get_data_categories = this.get_data_categories.bind(this);
    this.categories_selected = this.categories_selected.bind(this);
    this.export_button_pressed = this.export_button_pressed.bind(this);
    this.export_filter_pressed = this.export_filter_pressed.bind(this);
    this.begin_export = this.begin_export.bind(this);
    this.export_category_selected = this.export_category_selected.bind(this);
    this.edit_patient_data = this.edit_patient_data.bind(this);
  }

  componentDidMount() {
    this.get_patients();
  }

  export_button_pressed() {
    if (this.state.export_dropdown) {
      this.setState({ export_dropdown: false });
    } else {
      this.setState({ export_dropdown: [] });
    }
  }

  export_category_selected(category) {
    return this.state.export_dropdown.indexOf(category) !== -1;
  }

  export_filter_pressed(category, item) {
    if (this.state[category].indexOf(item) === -1) {
      this.state[category].push(item);
      this.setState({ [category]: this.state[category] });
    } else {
      var new_list = this.state[category].filter(function(name) {
        return name !== item;
      });
      this.setState({ [category]: new_list });
    }
  }

  begin_export() {
    console.log(this.state.export_dropdown);
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

  get_filters() {
    let previous_state = this.props.app_state.prev_state;
    let show_hide_filters = [];
    for (var key in previous_state) {
      if (previous_state[key] instanceof Array) {
        let value = previous_state[key];
        if (!key.endsWith("categories")) {
          if (value instanceof Array && typeof value[0] === "string") {
            show_hide_filters.push(key);
          } else if (
            value instanceof Array &&
            value[1] &&
            value[1].length !== 0
          ) {
            show_hide_filters.push(key);
          }
        }
      }
    }
    return show_hide_filters;
  }

  get_patients() {
    let currentState = this;
    let values = this.props.app_state.prev_state;
    let input_values = {};
    var categories = this.get_filters();

    if (this.state.original_filters.length === 2) {
      axios
        .post(apiBaseURL + "/ssd_api/filter", {
          filters: {}
        })
        .then(function(response) {
          currentState.setState(
            { patients: response.data.result.pt_id },
            () => {
              currentState.get_data();
            }
          );
        })
        .catch(function(error) {
          console.log(error);
        });
      return;
    }
    for (var i in categories) {
      var key = categories[i];
      if (key === "eye_diagnosis") {
        input_values["eye_diagnosis"] = values["eye_diagnosis"];
      } else if (key === "systemic_diagnosis") {
        input_values["systemic_diagnosis"] = values["systemic_diagnosis"];
      } else if (key === "age") {
        let age_values = values["age"][0];
        let temp_value = {};
        for (var j = 1; j < values["age"].length; j++) {
          let selected_value = values["age"][j];
          if (selected_value === "less than") {
            temp_value["less"] = parseInt(age_values["less"]);
          } else if (selected_value === "greater than") {
            temp_value["more"] = parseInt(age_values["greater"]);
          } else if (selected_value === "equal to") {
            temp_value["equal"] = parseInt(age_values["equal"]);
          } else if (selected_value === "between") {
            temp_value["between"] = [
              parseInt(age_values["between_less"]),
              parseInt(age_values["between_greater"])
            ];
          }
        }
        input_values["age"] = temp_value;
      } else if (key === "ethnicity") {
        input_values["ethnicity"] = values["ethnicity"];
      } else if (key === "image_procedure_type") {
        input_values["image_procedure_type"] = values["image_procedure_type"];
      } else if (key === "labs") {
        //console.log(values["labs"])
      } else if (key === "medication_generic_name") {
        input_values["medication_generic_name"] =
          values["medication_generic_name"];
      } else if (key === "medication_therapuetic_name") {
        input_values["medication_therapuetic_name"] =
          values["medication_therapuetic_name"];
      } else if (key === "vision") {
        let left_vision = {};
        let right_vision = {};
        let vision_values = values["vision"][0];
        for (let j = 1; j < values["vision"].length; j++) {
          let selected_value = values["vision"][j];
          if (selected_value === "left_less") {
            left_vision["less"] = vision_values["left_less"];
          } else if (selected_value === "left_greater") {
            left_vision["more"] = vision_values["left_greater"];
          } else if (selected_value === "left_equal") {
            left_vision["equal"] = vision_values["left_equal"];
          } else if (selected_value === "left_between") {
            left_vision["between"] = [
              vision_values["left_between_less"],
              vision_values["left_between_greater"]
            ];
          } else if (selected_value === "right_less") {
            right_vision["less"] = vision_values["right_less"];
          } else if (selected_value === "right_greater") {
            right_vision["more"] = vision_values["right_greater"];
          } else if (selected_value === "right_equal") {
            right_vision["equal"] = vision_values["right_equal"];
          } else if (selected_value === "right_between") {
            right_vision["between"] = [
              vision_values["right_between_less"],
              vision_values["right_between_greater"]
            ];
          }
        }
        input_values["left_vision"] = left_vision;
        input_values["right_vision"] = right_vision;
      } else if (key === "pressure") {
        let left_pressure = {};
        let right_pressure = {};
        let pressure_values = values["pressure"][0];
        for (let j = 1; j < values["pressure"].length; j++) {
          let selected_value = values["pressure"][j];
          if (selected_value === "left_less") {
            left_pressure["less"] = parseInt(pressure_values["left_less"]);
          } else if (selected_value === "left_greater") {
            left_pressure["more"] = parseInt(pressure_values["left_greater"]);
          } else if (selected_value === "left_equal") {
            left_pressure["equal"] = parseInt(pressure_values["left_equal"]);
          } else if (selected_value === "left_between") {
            left_pressure["between"] = [
              parseInt(pressure_values["left_between_less"]),
              parseInt(pressure_values["left_between_greater"])
            ];
          } else if (selected_value === "right_less") {
            right_pressure["less"] = parseInt(pressure_values["right_less"]);
          } else if (selected_value === "right_greater") {
            right_pressure["more"] = parseInt(pressure_values["right_greater"]);
          } else if (selected_value === "right_equal") {
            right_pressure["equal"] = parseInt(pressure_values["right_equal"]);
          } else if (selected_value === "right_between") {
            right_pressure["between"] = [
              parseInt(pressure_values["right_between_less"]),
              parseInt(pressure_values["right_between_greater"])
            ];
          }
        }
        input_values["left_pressure"] = left_pressure;
        input_values["right_pressure"] = right_pressure;
      }
    }
    axios
      .post(apiBaseURL + "/ssd_api/filter", {
        filters: input_values
      })
      .then(function(response) {
        currentState.setState({ patients: response.data.result.pt_id }, () => {
          currentState.get_data();
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  get_data() {
    let currentState = this;
    let patient_ids = this.state.patients;
    let patient_ids_str = "pt_id=".concat(patient_ids[0]);

    if (this.state.patients.length === 0) {
      currentState.setState({ patient_data: [] });
      return;
    }

    for (var i = 1; i < patient_ids.length; i++) {
      let patient_id = patient_ids[i];
      patient_ids_str = patient_ids_str.concat("&pt_id=").concat(patient_id);
    }
    let link = apiBaseURL + "/ssd_api/patients?".concat(patient_ids_str);
    axios
      .get(link)
      .then(function(response) {
        let current_patient_data = currentState.state.patient_data;
        current_patient_data["lab_values"] = response.data.result;
        currentState.setState({ patient_data: current_patient_data }, () => {
          currentState.edit_patient_data();
        });
      })
      .catch(function(error) {
        console.log(error);
      });
    link =
      apiBaseURL +
      "/ssd_api/filter_table_with_ptid?"
        .concat(patient_ids_str)
        .concat("&table_name=pt_deid");
    axios
      .get(link)
      .then(function(response) {
        let current_patient_data = currentState.state.patient_data;
        current_patient_data["personal_values"] = response.data.result;
        currentState.setState({ patient_data: current_patient_data }, () => {
          currentState.edit_patient_data();
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  edit_patient_data() {
    if (
      !(
        this.state.patient_data["lab_values"] &&
        this.state.patient_data["personal_values"]
      )
    ) {
      return;
    }
    let current_data = [];
    for (let i = 0; i < this.state.patients.length; i++) {
      let patient_id = this.state.patients[i];
      let patient = { PT_ID: this.state.patients[i] };
      let eye_diagnosis_pt = "";
      for (
        var j in this.state.patient_data["lab_values"][patient_id].eye_diagnosis
      ) {
        eye_diagnosis_pt = eye_diagnosis_pt.concat(
          j
        );
        if (
          this.state.patient_data["lab_values"][patient_id].eye_diagnosis.j !== null
        ) {
          eye_diagnosis_pt = eye_diagnosis_pt.concat(" (");
          eye_diagnosis_pt = eye_diagnosis_pt.concat(
            this.state.patient_data["lab_values"][patient_id].eye_diagnosis[j].substring(0, 16)
          );
          eye_diagnosis_pt = eye_diagnosis_pt.concat(")");
        }
        eye_diagnosis_pt = eye_diagnosis_pt.concat("\n");
      }
      patient["eye_diagnosis"] = eye_diagnosis_pt;

      let systemic_diagnosis_pt = "";
      for (
        let j in this.state.patient_data["lab_values"][patient_id].systemic_diagnosis
      ) {
        systemic_diagnosis_pt = systemic_diagnosis_pt.concat(
          j
        );
        if (
          this.state.patient_data["lab_values"][patient_id].systemic_diagnosis[j] !== null
        ) {
          systemic_diagnosis_pt = systemic_diagnosis_pt.concat(" (");
          systemic_diagnosis_pt = systemic_diagnosis_pt.concat(
            this.state.patient_data["lab_values"][
              patient_id
            ].systemic_diagnosis[j].substring(0, 16)
          );
          systemic_diagnosis_pt = systemic_diagnosis_pt.concat(")");
        }
        systemic_diagnosis_pt = systemic_diagnosis_pt.concat("\n");
      }
      patient["systemic_diagnosis"] = systemic_diagnosis_pt;

      let image_procedure_type_pt = "";
      for (
        let j = 0;
        j < this.state.patient_data["lab_values"][patient_id].image_type.length;
        j++
      ) {
        image_procedure_type_pt = image_procedure_type_pt.concat(
          this.state.patient_data["lab_values"][patient_id].image_type[j]
        );
        if (
          j <
          this.state.patient_data["lab_values"][patient_id].image_type.length -
            1
        ) {
          image_procedure_type_pt = image_procedure_type_pt.concat("\n");
        }
      }
      patient["image_procedure_type"] = image_procedure_type_pt;

      let lab_values_pt = "";
      for (
        let j = 0;
        j < this.state.patient_data["lab_values"][patient_id].lab_values.length;
        j++
      ) {
        lab_values_pt = lab_values_pt
          .concat(
            this.state.patient_data["lab_values"][patient_id].lab_values[j]
              .lab_name
          )
          .concat(": ")
          .concat(
            this.state.patient_data["lab_values"][patient_id].lab_values[j]
              .lab_value
          );
        if (
          j <
          this.state.patient_data["lab_values"][patient_id].lab_values.length -
            1
        ) {
          lab_values_pt = lab_values_pt.concat("\n");
        }
      }
      patient["labs"] = lab_values_pt;

      let medication_generic_name_pt = "";
      for (
        let j = 0;
        j < this.state.patient_data["lab_values"][patient_id].medication.length;
        j++
      ) {
        medication_generic_name_pt = medication_generic_name_pt.concat(
          this.state.patient_data["lab_values"][patient_id].medication[j]
            .generic_name
        );
        if (
          j <
          this.state.patient_data["lab_values"][patient_id].medication.length -
            1
        ) {
          medication_generic_name_pt = medication_generic_name_pt.concat("\n");
        }
      }
      patient["medication_generic_name"] = medication_generic_name_pt;

      let medication_therapuetic_name_pt = "";
      for (
        let j = 0;
        j < this.state.patient_data["lab_values"][patient_id].medication.length;
        j++
      ) {
        if (
          this.state.patient_data["lab_values"][patient_id].medication[j]
            .therapeutic_class === null
        ) {
          medication_therapuetic_name_pt = medication_therapuetic_name_pt.concat(
            "none"
          );
        } else {
          medication_therapuetic_name_pt = medication_therapuetic_name_pt.concat(
            this.state.patient_data["lab_values"][patient_id].medication[j]
              .therapeutic_class
          );
        }
        if (
          j <
          this.state.patient_data["lab_values"][patient_id].medication.length -
            1
        ) {
          medication_therapuetic_name_pt = medication_therapuetic_name_pt.concat(
            "\n"
          );
        }
      }
      patient["medication_therapuetic_name"] = medication_therapuetic_name_pt;

      let vision_pt = "";
      for (
        let j = 0;
        j < this.state.patient_data["lab_values"][patient_id].vision.length;
        j++
      ) {
        vision_pt = vision_pt.concat(
          this.state.patient_data["lab_values"][patient_id].vision[j].value
        );
        if (
          j <
          this.state.patient_data["lab_values"][patient_id].vision.length - 1
        ) {
          vision_pt = vision_pt.concat("\n");
        }
      }
      patient["vision"] = vision_pt;

      let pressure_pt = "";
      for (
        let j = 0;
        j < this.state.patient_data["lab_values"][patient_id].pressure.length;
        j++
      ) {
        pressure_pt = pressure_pt.concat(
          this.state.patient_data["lab_values"][patient_id].pressure[j].value
        );
        if (
          j <
          this.state.patient_data["lab_values"][patient_id].pressure.length - 1
        ) {
          pressure_pt = pressure_pt.concat("\n");
        }
      }
      patient["pressure"] = pressure_pt;

      for (
        let j = 0;
        j < this.state.patient_data["personal_values"].data.length;
        j++
      ) {
        if (
          this.state.patient_data["personal_values"].data[j].pt_id ===
          this.state.patients[i]
        ) {
          patient["age"] =
            2019 -
            parseInt(
              this.state.patient_data["personal_values"].data[j].dob.substring(12, 16)
            );
          patient["ethnicity"] = this.state.patient_data[
            "personal_values"
          ].data[j].ethnicity;
          break;
        }
      }

      patient["images"] = "link-to-image";
      current_data.push(patient);
    }
    console.log(current_data)
    this.setState({ patient_data: current_data });
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
    let export_dropdown = null;
    if (this.state.export_dropdown) {
      export_dropdown = (
        <div className="export_dropdown">
          <div>
            <input
              type="checkbox"
              checked={this.export_category_selected("by patient ID")}
              onChange={() =>
                this.export_filter_pressed("export_dropdown", "by patient ID")
              }
            ></input>
            <label> by patient ID </label>
          </div>
          <div>
            <input
              type="checkbox"
              checked={this.export_category_selected("by diagnosis")}
              onChange={() =>
                this.export_filter_pressed("export_dropdown", "by diagnosis")
              }
            ></input>
            <label> by diagnosis </label>
          </div>
          <div>
            <input
              type="checkbox"
              checked={this.export_category_selected("by image procedure")}
              onChange={() =>
                this.export_filter_pressed(
                  "export_dropdown",
                  "by image procedure"
                )
              }
            ></input>
            <label> by image procedure </label>
          </div>
          <button
            className="export_button_concept"
            onClick={() => this.begin_export()}
          >
            {" "}
            Export Images
          </button>
        </div>
      );
    }
    return (
      <div className="whole_div">
        <div className="title_div_patients">Your Patient Cohort</div>
        <div className="body_div_patients">
          <div className="show_hide_panel_patients">
            <div className="show_hide_tt">
              Show/Hide
              <div>{show_hide_filters}</div>
            </div>
          </div>
          <div className="table_design_patients">
            <Table
              patient_data={this.state.patient_data}
              filters={this.get_data_categories()}
              submit_function={[
                ["PT_ID", this.props.submit_function, "patient history"],
                ["images", this.props.submit_function, "view image"]
              ]}
            ></Table>
          </div>
        </div>
        <div className="bottom_div_patients">
          <button
            className="button_concept"
            onClick={() => this.props.submit_function("filter")}
          >
            {" "}
            Back To Filters Page
          </button>
          <button
            className="button_concept"
            onClick={() =>
              this.props.submit_function("patient exams", this.state.patients)
            }
          >
            {" "}
            Go To All Patient Exams Page
          </button>
          <button
            className="button_concept"
            onClick={() => this.export_button_pressed()}
          >
            {" "}
            Export All Images for Patient
          </button>
          {export_dropdown}
        </div>
      </div>
    );
  }
}

export default PatientsPage;
