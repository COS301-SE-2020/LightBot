import Overview from "../views/home.views/Overview.js";
import Visualizer from "../views/home.views/Visualizer.js";
import Forum from "../views/home.views/Forum.js";
import Scenario from "../views/home.views/Scenario Runner.js";
import Profile from "../views/home.views/Profile.js";
import Users from "../views/home.views/Users.js";

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
    path: "/users",
    name: "Users",
    icon: "now-ui-icons users_circle-08",
    component: Users,
    layout: "/home",
    auth: true,
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
    path: "/scenario",
    name: "Scenario Runner",
    icon: "now-ui-icons loader_gear spin",
    component: Scenario,
    layout: "/home",
    auth: true,
  },
  {
    path: "/Visualizer",
    name: "Visualizer",
    icon: "now-ui-icons design_image",
    component: Visualizer,
    layout: "/home",
    auth: false,
  },
];
export default homeRoutes;
