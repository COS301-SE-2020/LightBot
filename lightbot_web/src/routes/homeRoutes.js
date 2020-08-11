import Overview from "../views/home.views/Overview.js";
import Notifications from "../views/home.views/Notifications.js";
import Configuration from "../views/home.views/Configuration.js";
import Forum from "../views/home.views/Forum.js";
import Simulation from "../views/home.views/Simulation.js";
import Profile from "../views/home.views/Profile.js";

var homeRoutes = [
  {
    path: "/overview",
    name: "Overview",
    icon: "now-ui-icons design_bullet-list-67",
    component: Overview,
    layout: "/home",
    auth: false,
  },
  {
    path: "/profile",
    name: "Profile",
    icon: "now-ui-icons users_circle-08",
    component: Profile,
    layout: "/home",
    auth: false,
  },
  {
    path: "/forum",
    name: "Notification Forum",
    icon: "now-ui-icons objects_globe",
    component: Forum,
    layout: "/home",
    auth: true,
  },
  {
    path: "/simulation",
    name: "Simulation",
    icon: "now-ui-icons media-1_button-play",
    component: Simulation,
    layout: "/home",
    auth: false,
  },
  {
    path: "/configuration",
    name: "Configuration",
    icon: "now-ui-icons loader_gear spin",
    component: Configuration,
    layout: "/home",
    auth: true,
  },
];
export default homeRoutes;
