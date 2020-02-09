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

/* 2/4/2020 changed path, name, etc*/
import Dashboard from "views/Dashboard.jsx";
// import FilterPage from "views/FilterPage.jsx";
// import PatientsPage from "views/PatientsPage.jsx";
// import PatientHistoryPage from "views/PatientHistoryPage.jsx";
// import PatientImagesPage from "views/PatientImagesPage.jsx";

// import UserProfile from "views/UserProfile.jsx";
// import TableList from "views/TableList.jsx";
// import Typography from "views/Typography.jsx";
// import Icons from "views/Icons.jsx";
// import Maps from "views/Maps.jsx";
// import Notifications from "views/Notifications.jsx";
// import Upgrade from "views/Upgrade.jsx";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Filters Page",
    icon: "pe-7s-graph",
    component: Dashboard,
    layout: "/admin"
  }
  /*commented out for now since links are currently in progress*/
  /*
  {
    path: "/cohort",
    name: "Patient Cohort",
    icon: "pe-7s-user",
    component: PatientsPage,
    layout: "/admin"
  },
  {
    path: "/history",
    name: "Patient History",
    icon: "pe-7s-note2",
    component: PatientHistoryPage,
    layout: "/admin"
  },
  {
    path: "/imageslist",
    name: "Patient Images",
    icon: "pe-7s-news-paper",
    component: PatientImagesPage,
    layout: "/admin"
  }
  */
  /*Commented out the irrelevant tabs*/
  /*path: what shows up in the website address bar*/
  /*name: name that shows up on the sidebar*/
  /*component: which jsx file it comes from (see top, import ___ from ___)
  /*layout: 
  /*
  {
    path: "/icons", 
    name: "Icons", 
    icon: "pe-7s-science",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "pe-7s-map-marker",
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "pe-7s-bell",
    component: Notifications,
    layout: "/admin"
  },
  {
    upgrade: true,
    path: "/upgrade",
    name: "Upgrade to PRO",
    icon: "pe-7s-rocket",
    component: Upgrade,
    layout: "/admin"
  }
  */
];

export default dashboardRoutes;
