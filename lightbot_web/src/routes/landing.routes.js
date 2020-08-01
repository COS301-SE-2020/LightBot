import Login from "../views/LoginPanel";
import Register from "../views/RegisterPanel";
import Recovery from "../views/RecoveryPanel";
import Reset from "../views/ResetPanel";

var landingRoutes = [
  {
    path: "/login",
    name: "Login",
    icon: "design_app",
    component: Login,
    layout: "/landing",
  },
  {
    path: "/register",
    name: "Register",
    icon: "design_app",
    component: Register,
    layout: "/landing",
  },
  {
    path: "/recovery",
    name: "Recovery",
    icon: "design_app",
    component: Recovery,
    layout: "/landing",
  },
  {
    path: "/reset",
    name: "Reset",
    icon: "design_app",
    component: Reset,
    layout: "/landing",
  },
]
export default landingRoutes