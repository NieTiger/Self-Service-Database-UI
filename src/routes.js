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
import Dashboard from "views/Dashboard.jsx";
import UserProfile from "views/UserProfile.jsx";
import TableList from "views/TableList.jsx";
import Typography from "views/Typography.jsx";
import Icons from "views/Icons.jsx";
import Maps from "views/Maps.jsx";
import Notifications from "views/Notifications.jsx";
import Upgrade from "views/Upgrade.jsx";

const dashboardRoutes = [
  {
    path: "/Dashboard",
    name: "Select Filters",
    icon: "pe-7s-search",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/userprofile",
    name: "Filter Results",
    icon: "pe-7s-filter",
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/table",
    name: "Patient Exams",
    icon: "pe-7s-note2",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/typography",
    name: "Patient History",
    icon: "pe-7s-albums",
    component: Typography,
    layout: "/admin"
  },
  {
    path: "/UserProfile",
    name: "Patient Images",
    icon: "pe-7s-photo",
    component: UserProfile,
    layout: "/admin"
  },

  {
    path: "/icons",
    name: "Admin- list of icons",
    icon: "pe-7s-science",
    component: Icons,
    layout: "/admin"
  },
  {
    upgrade: true,
    path: "/upgrade",
    name: "Keeping This For Now",
    icon: "pe-7s-rocket",
    component: Upgrade,
    layout: "/admin"
  }
];

export default dashboardRoutes;
