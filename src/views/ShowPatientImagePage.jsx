import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import CustomButton from "components/CustomButton/CustomButton";
import TableList from "./TableList.jsx";

import { apiBaseURL } from "./Dashboard.jsx";

const axios = require("axios");

class ShowPatientImagePage extends Component {
    constructor(props) {
        super(props)
        console.log(this.props)
        this.state = {
            "imageID": this.props.additionalInfo.imageID
        }
        this.backButtonPressed = this.backButtonPressed.bind(this);
        this.downloadButtonPressed = this.downloadButtonPressed.bind(this)
    }

    backButtonPressed() {
        let newState = {
            "page": "PatientImagesPage",
            "additionalInfo": {
                "patientID": this.props.additionalInfo.patientID
            }
        }
        this.props.changePage(newState)
    }

    downloadButtonPressed() {

    }

    render() {
        return(
            <div>
                <Grid fluid>
                    <Row style = {styles.mainDivContainer}>
                        <Col lg={6} sm={3} style = {styles.mainDivPicture}>
                            Image ID: {this.state.imageID}
                        </Col>
                        <Col lg={4} sm={6} style = {styles.mainDivButtons}>
                            <CustomButton  style = {styles.buttonUpperBack} onClick={() => this.backButtonPressed()}>BACK TO IMAGES PAGE</CustomButton>
                            <CustomButton  style = {styles.buttonUpperDownload} onClick={() => this.downloadButtonPressed()}>DOWNLOAD IMAGE</CustomButton>
                        </Col>
                    </Row> 
                </Grid>
            </div>
        )
    }
}

export default ShowPatientImagePage;

const styles = {
    mainDivContainer: {
        "height": "85vh",
        "margin-bottom": "2vh",
    },
    mainDivPicture: {
        "width": "80vh",
        "height": "96vh",
        "border": "solid 5px black",
        "margin": "2vh"
    },
    buttonUpperBack: {
        "width": "30vh",
        "color": "black",
        "border": "solid 2px black",
        "font-weight": "bold",
        "background-color": "#eef27c",
        "margin": "2vh",
    },
    buttonUpperDownload: {
        "width": "30vh",
        "color": "black",
        "border": "solid 2px black",
        "font-weight": "bold",
        "background-color": "#eef27c",
        "margin": "2vh",
    },
    mainDivButtons: {
        "display": "flex",
        "flex-direction": "row"
    }
}
