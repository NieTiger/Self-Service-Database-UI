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
import {
  Grid,
  Row,
  Col,
  Table,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import { thArray, tdArray } from "variables/Variables.jsx";
import avatar from "assets/img/faces/face-3.jpg";

{
  /*The original template didn't import thArray, tdArray, or Table, added due to incorporation of those components*/
  /*This is the filter results page*/
}

// This is the Filter results page and currently also the patient images page (need to change later)
//The checkboxes are currently really large, not sure how to format it properly
class UserProfile extends Component {
  render() {
    return (
      <div className="content">
        <Grid fluid>
          {/*First Column: show/hide list*/}
          <Row>
            <Col sm={4}>
              <Card
                title="Show/Hide"
                content={
                  <form>
                    <FormInputs
                      ncols={["col-md-4", "col-md-4", "col-md-4"]}
                      properties={[
                        {
                          label: "Patient ID",
                          type: "checkbox",
                          bsClass: "form-control",
                          placeholder: "Company",
                          defaultValue: "Creative Code Inc.",
                          disabled: false
                        },
                        {
                          label: "Age",
                          type: "checkbox",
                          bsClass: "form-control",
                          placeholder: "Username",
                          defaultValue: "michael23"
                        },
                        {
                          label: "Images",
                          type: "checkbox",
                          bsClass: "form-control",
                          placeholder: "Email"
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-4", "col-md-4", "col-md-4"]}
                      properties={[
                        {
                          label: "Eye Diagnosis",
                          type: "checkbox",
                          bsClass: "form-control",
                          placeholder: "First name",
                          defaultValue: "Mike"
                        },
                        {
                          label: "Systemic Diagnosis",
                          type: "checkbox",
                          bsClass: "form-control",
                          placeholder: "Last name",
                          defaultValue: "Andrew"
                        },
                        {
                          label: "Age",
                          type: "checkbox",
                          bsClass: "form-control",
                          placeholder: "Last name",
                          defaultValue: "Andrew"
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-4", "col-md-4", "col-md-4"]}
                      properties={[
                        {
                          label: "Ethnicity",
                          type: "checkbox",
                          bsClass: "form-control",
                          placeholder: "First name",
                          defaultValue: "Mike"
                        },
                        {
                          label: "Image Procedure Type",
                          type: "checkbox",
                          bsClass: "form-control",
                          placeholder: "Last name",
                          defaultValue: "Andrew"
                        },
                        {
                          label: "Labs",
                          type: "checkbox",
                          bsClass: "form-control",
                          placeholder: "Last name",
                          defaultValue: "Andrew"
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-4", "col-md-4", "col-md-4"]}
                      properties={[
                        {
                          label: "Medication Generic Name",
                          type: "checkbox",
                          bsClass: "form-control",
                          placeholder: "First name",
                          defaultValue: "Mike"
                        },
                        {
                          label: "Medication Therapeutic Name",
                          type: "checkbox",
                          bsClass: "form-control",
                          placeholder: "Last name",
                          defaultValue: "Andrew"
                        },
                        {
                          label: "Vision",
                          type: "checkbox",
                          bsClass: "form-control",
                          placeholder: "Last name",
                          defaultValue: "Andrew"
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-4"]}
                      properties={[
                        {
                          label:
                            "Pressure: checkboxes are below text->not sure how to format it properly",
                          type: "checkbox",
                          bsClass: "form-control",
                          placeholder: "First name",
                          defaultValue: "Mike"
                        }
                      ]}
                    />
                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>
            {/*Second Column: Actual table*/}
            <Col sm={8}>
              <Card
                title="Your Patient Cohort"
                category="Here is a subtitle for this table"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        {thArray.map((prop, key) => {
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {tdArray.map((prop, key) => {
                        return (
                          <tr key={key}>
                            {prop.map((prop, key) => {
                              return <td key={key}>{prop}</td>;
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default UserProfile;
