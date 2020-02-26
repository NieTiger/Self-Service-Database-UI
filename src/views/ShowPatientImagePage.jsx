import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import CustomButton from "components/CustomButton/CustomButton";
import TableList from "./TableList.jsx";
import { saveAs } from 'file-saver';
import image from "../demo/images/samplePicture.jpg"

import { apiBaseURL } from "./Dashboard.jsx";


var JSZip = require("jszip");
const axios = require("axios");

class ShowPatientImagePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageID: this.props.pageStatus.ShowPatientImagePage.imageID
    };
    this.backButtonPressed = this.backButtonPressed.bind(this);
    this.downloadButtonPressed = this.downloadButtonPressed.bind(this);
  }

  backButtonPressed() {
    let newState = {
      page: "PatientImagesPage",
    };
    this.props.changePage(newState);
  }

  downloadButtonPressed() {
    var zip = new JSZip();
    zip.file("Hello.txt", "Hello World\n");

    var imgData = {
      uri: "../demo/images/samplePicture.jpg"
    }

    var img = zip.folder("images");
    img.file("../demo/images/samplePicture.jpg", imgData, { base64: true });

    zip.generateAsync({ type: "blob" })
      .then(function (content) {
        // see FileSaver.js
        saveAs(content, "example.zip");
      });
  }

  render() {
    return (
      <div>
        <Grid fluid>
          <Row style={styles.mainDivContainer}>
            <Col lg={6} sm={3} style={styles.mainDivPicture}>
              <img src={require("../demo/images/samplePicture.jpg")} style={styles.image} />
            </Col>
            <Col lg={4} sm={6} style={styles.mainDivButtons}>
              <CustomButton
                style={styles.buttonUpperBack}
                onClick={() => this.backButtonPressed()}
              >
                BACK TO IMAGES PAGE
              </CustomButton>
              <CustomButton
                style={styles.buttonUpperDownload}
                onClick={() => this.downloadButtonPressed()}
              >
                DOWNLOAD IMAGE
              </CustomButton>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default ShowPatientImagePage;

const styles = {
  mainDivContainer: {
    height: "85vh",
    "margin-bottom": "2vh"
  },
  mainDivPicture: {
    width: "80vh",
    height: "96vh",
    margin: "2vh",
    display: "flex",
    "align-items": "center",
    "justify-content": "center",
  },
  buttonUpperBack: {
    width: "30vh",
    color: "black",
    border: "solid 2px black",
    "font-weight": "bold",
    "background-color": "#eef27c",
    margin: "2vh"
  },
  buttonUpperDownload: {
    width: "30vh",
    color: "black",
    border: "solid 2px black",
    "font-weight": "bold",
    "background-color": "#eef27c",
    margin: "2vh"
  },
  mainDivButtons: {
    display: "flex",
    "flex-direction": "row"
  },
  image: {
    height: "100%"
  }
};
