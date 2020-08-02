import Login from "../views/landing.views/Login.js";
import Register from "../views/landing.views/Register.js";
import Recovery from "../views/landing.views/Recovery.js";
import Reset from "../views/landing.views/Reset.js";

var landingRoutes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    layout: "/landing",
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    layout: "/landing",
  },
  {
    path: "/reset",
    name: "Reset",
    component: Reset,
    layout: "/landing",
  },
  {
    path: "/recovery",
    name: "Recovery",
    component: Recovery,
    layout: "/landing",
  },
];
export default landingRoutes;
