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
import { Route, Switch } from "react-router-dom";
import NotificationSystem from "react-notification-system";


import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";
import CustomButton from "components/CustomButton/CustomButton";

import { style } from "variables/Variables.jsx";

import routes from "routes.js";

import image from "assets/img/sidebar-2.jpg"; /*sidebar-2 is the default hot air balloon image*/
import loginBackgroundImage from "assets/img/nmh.jpg";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _notificationSystem: null,
      image: image,
      color: "black" /*black is the default color for the sidebar*/,
      hasImage: true,
      fixedClasses: "dropdown show-dropdown open",
      accessGranted: false,
      loginInfo: {
        username: null,
        password: null,
      }
    };
    this.pageDisplayed = this.pageDisplayed.bind(this);
    this.textFieldChanged = this.textFieldChanged.bind(this);
    this.loginButtonPressed = this.loginButtonPressed.bind(this);
  }
  handleNotificationClick = position => {
    var color = Math.floor(Math.random() * 4 + 1);
    var level;
    switch (color) {
      case 1:
        level = "success";
        break;
      case 2:
        level = "warning";
        break;
      case 3:
        level = "error";
        break;
      case 4:
        level = "info";
        break;
      default:
        break;
    }
    /*Eliminated the notificatino that pops up in the original template*/
    /*
    this.state._notificationSystem.addNotification({
      title: <span data-notify="icon" className="pe-7s-gift" />,
      message: (
        <div>
          Welcome to <b>Light Bootstrap Dashboard</b> - a beautiful freebie for
          every web developer.
        </div>
      ),
      level: level,
      position: position,
      autoDismiss: 15
    });
    */
  };
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            render={props => (
              <prop.component
                {...props}
                handleClick={this.handleNotificationClick}
              />
            )}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  handleImageClick = image => {
    this.setState({ image: image });
  };
  handleColorClick = color => {
    this.setState({ color: color });
  };
  handleHasImage = hasImage => {
    this.setState({ hasImage: hasImage });
  };
  handleFixedClick = () => {
    if (this.state.fixedClasses === "dropdown") {
      this.setState({ fixedClasses: "dropdown show-dropdown open" });
    } else {
      this.setState({ fixedClasses: "dropdown" });
    }
  };
  componentDidMount() {
    this.setState({ _notificationSystem: this.refs.notificationSystem });
    var _notificationSystem = this.refs.notificationSystem;
    var color = Math.floor(Math.random() * 4 + 1);
    var level;
    switch (color) {
      case 1:
        level = "success";
        break;
      case 2:
        level = "warning";
        break;
      case 3:
        level = "error";
        break;
      case 4:
        level = "info";
        break;
      default:
        break;
    }
    {
      /*
    _notificationSystem.addNotification({
      title: <span data-notify="icon" className="pe-7s-gift" />,
      message: (
        <div>
          Welcome to <b>Light Bootstrap Dashboard</b> - a beautiful freebie for
          every web developer.
        </div>
      ),
      level: level,
      position: "tr",
      autoDismiss: 15
    });
    */
    }
  }
  componentDidUpdate(e) {
    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
    }
    if (e.history.action === "PUSH") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
  }

  //update state loginInfo values according to the values in Text Fields
  textFieldChanged(e) {
    var fieldName = e.target.title
    var value = e.target.value

    var tempLoginInfo = this.state.loginInfo
    tempLoginInfo[[fieldName]] = value

    this.setState({
      loginInfo: tempLoginInfo
    })
  }

  //logins the user if the username and password is correct
  loginButtonPressed() {
    var username = this.state.loginInfo.username
    var password = this.state.loginInfo.password
    if (username === "SelfService2020@northwestern.edu" && password === "SelfService2020") {
      this.setState({
        accessGranted: true
      })
    }
  }

  pageDisplayed() {
    if (this.state.accessGranted) {
      return (
        <div className="wrapper">
          <NotificationSystem ref="notificationSystem" style={style} />
          <Sidebar
            {...this.props}
            routes={routes}
            image={this.state.image}
            color={this.state.color}
            hasImage={this.state.hasImage}
          />
          <div id="main-panel" className="main-panel" ref="mainPanel">
            <AdminNavbar
              {...this.props}
              style={styles.NavStyle}
              brandText={this.getBrandText(this.props.location.pathname)}
            />
            <Switch>{this.getRoutes(routes)}</Switch>
            <Footer />
            {/*Commented this out to exclude the popup box on the side*/}
            {/*
            <FixedPlugin
              handleImageClick={this.handleImageClick}
              handleColorClick={this.handleColorClick}
              handleHasImage={this.handleHasImage}
              bgColor={this.state["color"]}
              bgImage={this.state["image"]}
              mini={this.state["mini"]}
              handleFixedClick={this.handleFixedClick}
              fixedClasses={this.state.fixedClasses}
            />
            */}
          </div>
        </div>
      );
    }
    else {
      return(
          <div style={styles.mainDivStyle}>
            <div style={styles.cardStyle}>
              <div style={styles.innerTitleStyle}> 
                Welcome To NMH Opthamalogy Research Site!
              </div>
              <div style={styles.innerTextField}> 
                <u>Username:</u>
                <input
                  type="text"
                  title="username"
                  style={styles.textFieldStyle}
                  onChange={e => this.textFieldChanged(e)}
                />
              </div>
              <div style={styles.innerTextField}> 
                <u>Password:</u>
                <input
                  type="password"
                  title="password"
                  style={styles.textFieldStyle}
                  onChange={e => this.textFieldChanged(e)}
                />
              </div>
              <div style={styles.innerTextField}> 
                <CustomButton
                  style={styles.loginButtonStyle}
                  title="loginButton"
                  onClick={() => this.loginButtonPressed()}
                >
                  Login
                </CustomButton>
              </div>
            </div>
          </div>
      )
    }
  }
  render() {
    var page = this.pageDisplayed()
    return (
      page
    );
  }
}

export default Admin;

const styles = {
  NavStyle: {
    "font-weight": "bold",
    color: "black"
  },
  mainDivStyle: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundImage: `url(${loginBackgroundImage})`,
    backgroundSize: "cover",
    display: "flex",
    "flex-direction": "row",
    "justify-content": "center",
    "align-items": "center",
  },
  cardStyle: {
    width: "45%",
    height: "70%",
    borderRadius: "7%",
    border: "solid 2px black",
    backgroundColor: "white",
    display: "flex",
    "flex-direction": "column",
    "margin": "2%"
  },
  textFieldStyle: {
    width: "90%",
    border: "solid 2px black",
    backgroundColor: "white",
  },
  loginButtonStyle: {
    width: "90%",
    color: "black",
    border: "solid 2px black",
    "font-weight": "bold",
    "background-color": "#eef27c"
  },
  innerTitleStyle: {
    width: "90%",
    borderRadius: "7%",
    backgroundColor: "white",
    display: "flex",
    "font-weight": "bold",
    "font-size": "30px",
    "margin": "5%",
  },
  innerTextField: {
    display: "flex",
    "flex-direction": "column",
    width: "100%",
    "margin-left": "5%",
    "margin-bottom": "5%",
    "font-size": "20px",
  }
};
