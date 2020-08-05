import Overview from "../views/home.views/Overview.js";
import Notifications from "../views/home.views/Notifications.js";
import Configuration from "../views/home.views/Configuration.js";
import Forum from "../views/home.views/Forum.js";
import Simulation from "../views/home.views/Simulation.js";
import Logout from "../views/home.views/Logout.js";
import Profile from "../views/home.views/Profile.js";

var homeRoutes = [
  {
    path: "/overview",
    name: "Overview",
    icon: "design_app",
    component: Overview,
    layout: "/home",
  },
  {
    path: "/simulation",
    name: "Simulation",
    icon: "location_map-big",
    component: Simulation,
    layout: "/home",
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "ui-1_bell-53",
    component: Notifications,
    layout: "/home",
  },
  {
    path: "/profile",
    name: "Profile",
    icon: "users_single-02",
    component: Profile,
    layout: "/home",
  },
  {
    path: "/forum",
    name: "Forum",
    icon: "files_paper",
    component: Forum,
    layout: "/home",
  },
  {
    path: "/configuration",
    name: "Configuration",
    icon: "design-2_ruler-pencil",
    component: Configuration,
    layout: "/home",
  },
  {
    path: "/logout",
    name: "Logout",
    icon: "objects_spaceship",
    component: Logout,
    layout: "/home",
  },
];
export default homeRoutes;
