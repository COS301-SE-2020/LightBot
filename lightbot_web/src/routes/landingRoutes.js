import Login from "../views/landing.views/Login.js";
import Register from "../views/landing.views/Register.js";
import Recovery from "../views/landing.views/Recovery.js";
import Reset from "../views/landing.views/Reset.js";
import Aboutus from "../views/landing.views/Aboutus.js";

var landingRoutes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    layout: "",
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    layout: "",
  },
  {
    path: "/reset",
    name: "Reset",
    component: Reset,
    layout: "",
  },
  {
    path: "/recovery",
    name: "Recovery",
    component: Recovery,
    layout: "",
  },
  {
    path: "/aboutus",
    name: "Aboutus",
    component: Aboutus,
    layout: "",
  },
];
export default landingRoutes;
