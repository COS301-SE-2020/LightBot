import Overview from "../views/Overview";
import Notifications from "../views/Notifications";
import Forum from "../views/Forum";
import Configuration from "../views/Configuration";
import Simulation from "../views/Simulation";
import Profile from "../views/Profile";

var homeRoutes = [
  {
    path: "/overview",
    name: "Overview",
    icon: "design_app",
    component: Overview,
    layout: "/home",
  },
  {
    path: "/profile",
    name: "Profile",
    icon: "design_app",
    component: Profile,
    layout: "/home",
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "design_app",
    component: Notifications,
    layout: "/home",
  },
  {
    path: "/forum",
    name: "Forum",
    icon: "design_app",
    component: Forum,
    layout: "/home",
  },
  {
    path: "/configuration",
    name: "Configuration",
    icon: "design_app",
    component: Configuration,
    layout: "/home",
  },
  {
    path: "/simulation",
    name: "Simulation",
    icon: "design_app",
    component: Simulation,
    layout: "/home",
  },
]
export default homeRoutes