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
import { thArray, tdArray } from "variables/Variables.jsx";
import CustomButton from "components/CustomButton/CustomButton";

class TableList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: this.props.columns,
      rows: this.props.rows
    };
    console.log(this.props.columns);
    console.log("thArray", thArray);
  }

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              {/*Commented this out to not use Card*/}
              {/*
              <Card
                title="Patient Cohort"
                category="Here is a table of all patients that match your criteria"
                ctTableFullWidth
                ctTableResponsive
              content={*/}
              <Table
                bordered
                striped
                hover
                responsive
                style={styles.TableStyle}
              >
                <thead>
                  <tr>
                    {this.state.columns.map((prop, key) => {
                      return (
                        <th key={key} style={styles.TableTitleStyle}>
                          {prop}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {this.state.rows.map((prop, key) => {
                    return (
                      <tr key={key}>
                        {prop.map((prop, key) => {
                          var type = prop["type"];
                          var text = prop["text"];
                          if (type === "button") {
                            var submitFunction = prop["submitFunction"];
                            var submitInformation = prop["submitInformation"];
                          }
                          if (type === "button") {
                            return (
                              <td key={key}>
                                <CustomButton
                                  style={styles.button}
                                  onClick={() =>
                                    submitFunction(submitInformation)
                                  }
                                >
                                  {text}
                                </CustomButton>
                              </td>
                            );
                          }
                          return (
                            <td key={key} style={styles.TableFontStyle}>
                              {text}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              {/*}}
              />*/}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default TableList;

const styles = {
  button: {
    width: "70%",
    margin: "1vh",
    "background-color": "#d4d5d7",
    color: "black",
    border: "solid 2px black"
  },
  TableStyle: {
    border: "solid 2 px black"
  },
  TableTitleStyle: {
    "font-weight": "bold",
    color: "black"
  },
  TableFontStyle: {
    color: "black"
  }
};
