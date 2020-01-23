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
import { Grid, Row, Col, Table } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { thArray, tdArray } from "variables/Variables.jsx";

//This is the patient history page
class Typography extends Component {
  render() {
    return (
      <div className="content">
        <Grid fluid>
          {/*First row*/}
          <Row>
            {/*First column*/}
            <Col sm={3}></Col>
            {/*Second column*/}
            <Col sm={9}>
              <Card
                plain
                title="Patient Current Values"
                category="Note: All the values from this table are coded in Variables.jsx. This is a list of exams for patients that meet the filter criteria."
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table hover>
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
          {/*Second row*/}
          <Row>
            {/*Second row, first column*/}
            <Col sm={3}>
              {/*Card Component with FormInputs contained insdie*/}
              <Card
                title="Show/Hide"
                content={
                  <form>
                    <FormInputs
                      ncols={["col-md-4", "col-md-4", "col-md-4"]}
                      properties={[
                        {
                          label: "Date",
                          type: "checkbox",
                          bsClass: "form-control",
                          placeholder: "Company",
                          defaultValue: "Creative Code Inc.",
                          disabled: false
                        },
                        {
                          label: "Medication",
                          type: "checkbox",
                          bsClass: "form-control",
                          placeholder: "Username",
                          defaultValue: "michael23"
                        },
                        {
                          label: "Therapeutic Class",
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
                          label: "Eye Diagnoses",
                          type: "checkbox",
                          bsClass: "form-control",
                          placeholder: "First name",
                          defaultValue: "Mike"
                        },
                        {
                          label: "Systemic Diagnoses",
                          type: "checkbox",
                          bsClass: "form-control",
                          placeholder: "Last name",
                          defaultValue: "Andrew"
                        },
                        {
                          label: "Lab Values",
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
                          label: "Left Vision",
                          type: "checkbox",
                          bsClass: "form-control",
                          placeholder: "First name",
                          defaultValue: "Mike"
                        },
                        {
                          label: "Right Vision",
                          type: "checkbox",
                          bsClass: "form-control",
                          placeholder: "Last name",
                          defaultValue: "Andrew"
                        },
                        {
                          label: "Left Pressure",
                          type: "checkbox",
                          bsClass: "form-control",
                          placeholder: "Last name",
                          defaultValue: "Andrew"
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-4", "col-md-4"]}
                      properties={[
                        {
                          label: "Right Pressure",
                          type: "checkbox",
                          bsClass: "form-control",
                          placeholder: "First name",
                          defaultValue: "Mike"
                        },
                        {
                          label: "Exam ID",
                          type: "checkbox",
                          bsClass: "form-control",
                          placeholder: "Last name",
                          defaultValue: "Andrew"
                        }
                      ]}
                    />
                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>
            {/*Second row, second column*/}
            <Col md={9}>
              <Card
                plain
                title="Individual Patient History"
                category="Note: All the values from this table are coded in Variables.jsx. This is a list of exams for patients that meet the filter criteria."
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table hover>
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
          <Row>
            <Col md={12}>
              <Card
                title="Light Bootstrap Table Heading: Illustration of different font sizes and styles"
                category="Created using Roboto Font Family"
                content={
                  <div>
                    <div className="typo-line">
                      <h1>
                        <p className="category">Header 1</p>Light Bootstrap
                        Table Heading{" "}
                      </h1>
                    </div>

                    <div className="typo-line">
                      <h2>
                        <p className="category">Header 2</p>Light Bootstrap
                        Table Heading
                      </h2>
                    </div>
                    <div className="typo-line">
                      <h3>
                        <p className="category">Header 3</p>Light Bootstrap
                        Table Heading
                      </h3>
                    </div>
                    <div className="typo-line">
                      <h4>
                        <p className="category">Header 4</p>Light Bootstrap
                        Table Heading
                      </h4>
                    </div>
                    <div className="typo-line">
                      <h5>
                        <p className="category">Header 5</p>Light Bootstrap
                        Table Heading
                      </h5>
                    </div>
                    <div className="typo-line">
                      <h6>
                        <p className="category">Header 6</p>Light Bootstrap
                        Table Heading
                      </h6>
                    </div>
                    <div className="typo-line">
                      <p>
                        <span className="category">Paragraph</span>Lorem ipsum
                        dolor sit amet, consectetuer adipiscing elit, sed diam
                        nonummy nibh euismod tincidunt ut laoreet dolore magna
                        aliquam erat volutpat. Ut wisi enim ad minim veniam.
                      </p>
                    </div>
                    <div className="typo-line">
                      <p className="category">Quote</p>
                      <blockquote>
                        <p>
                          Lorem ipsum dolor sit amet, consectetuer adipiscing
                          elit, sed diam nonummy nibh euismod tincidunt ut
                          laoreet dolore magna aliquam erat volutpat. Ut wisi
                          enim ad minim veniam.
                        </p>
                        <small>Steve Jobs, CEO Apple</small>
                      </blockquote>
                    </div>

                    <div className="typo-line">
                      <p className="category">Muted Text</p>
                      <p className="text-muted">
                        Lorem ipsum dolor sit amet, consectetuer adipiscing
                        elit, sed diam nonummy nibh euismod tincidunt ut
                        laoreet.
                      </p>
                    </div>
                    <div className="typo-line">
                      {/* <!--
                                             there are also "text-info", "text-success", "text-warning", "text-danger" clases for the text
                                             --> */}
                      <p className="category">Coloured Text</p>
                      <p className="text-primary">
                        Text Primary - Light Bootstrap Table Heading and complex
                        bootstrap dashboard you've ever seen on the internet.
                      </p>
                      <p className="text-info">
                        Text Info - Light Bootstrap Table Heading and complex
                        bootstrap dashboard you've ever seen on the internet.
                      </p>
                      <p className="text-success">
                        Text Success - Light Bootstrap Table Heading and complex
                        bootstrap dashboard you've ever seen on the internet.
                      </p>
                      <p className="text-warning">
                        Text Warning - Light Bootstrap Table Heading and complex
                        bootstrap dashboard you've ever seen on the internet.
                      </p>
                      <p className="text-danger">
                        Text Danger - Light Bootstrap Table Heading and complex
                        bootstrap dashboard you've ever seen on the internet.
                      </p>
                    </div>

                    <div className="typo-line">
                      <h2>
                        <p className="category">Small Tag</p>Header with small
                        subtitle <br />
                        <small>".small" is a tag for the headers</small>{" "}
                      </h2>
                    </div>
                  </div>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Typography;
