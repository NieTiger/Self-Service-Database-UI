import React, { Component } from "react";
import "./ShowPatientImagePage.css";
import show_patient_image_example from "./images/show_patient_image_example.jpg";

class ShowPatientImagePage extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    let previous_page = null;
    let return_value = null;
    if (this.props.app_state.prev_state["Exam ID"]) {
      previous_page = "patient images";
      return_value = this.props.app_state.prev_state;
      if (this.props.app_state.prev_state["PT ID"]) {
        return_value["PT_ID"] = this.props.app_state.prev_state["PT ID"];
      }
    } else {
      previous_page = "patients";
      return_value = this.props.filters;
    }
    return (
      <div className="whole_div">
        <div className="body_div_show_patient_image ">
          <img
            src={show_patient_image_example}
            className="image_show_patient_image"
            alt="Medical Scan"
          />
          <button className="button_concept_show_patient_image">
            {" "}
            Download Image
          </button>
          <button
            className="button_concept_show_patient_image"
            onClick={() =>
              this.props.submit_function(previous_page, return_value)
            }
          >
            {" "}
            Back To Previous Page
          </button>
        </div>
      </div>
    );
  }
}

export default ShowPatientImagePage;
