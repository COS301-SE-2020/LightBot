import Dashboard from "views/Dashboard.js";
import Icons from "views/Icons.js";
import ManualOverride from "views/ManualOverride.js";
import Notifications from "views/Notifications.js";
//import Rtl from "views/Rtl.js";
import Forum from "views/Forum.js";
import Simulation from "views/Simulation.js";
import UserProfile from "views/UserProfile.js";

import Login from "views/Login.js";
import Register from "views/Register";
import ForgotPassword from "views/ForgotPassword.js";


var routes = [
	{
		path: "/login",
		name: "Login",
		icon: "tim-icons icon-chart-pie-36",
		component: Login,
		layout: "/login",
		showOnDash: false,
	},

	{
		path: "/register",
		name: "Register",
		icon: "tim-icons icon-chart-pie-36",
		component: Register,
		layout: "/register",
		showOnDash: false,
	},

	{
		path: "/forgot-password",
		name: "Forgot Password",
		icon: "tim-icons icon-chart-pie-36",
		component: ForgotPassword,
		layout: "/forgotpassword",
		showOnDash: false,
	},

	{
		path: "/dashboard",
		name: "System Overview",
		icon: "tim-icons icon-chart-pie-36",
		component: Dashboard,
		layout: "/admin",
		showOnDash: true,
	},

	{
		path: "/manualoverride",
		name: "Manual Override",
		icon: "tim-icons icon-pin",
		component: ManualOverride,
		layout: "/admin",
		showOnDash: true,
	},
	{
		path: "/simulation",
		name: "Simulation",
		icon: "tim-icons icon-align-center",
		component: Simulation,
		layout: "/admin",
		showOnDash: true,
	},
	{
		path: "/forum",
		name: "Forum",
		icon: "tim-icons icon-puzzle-10",
		component: Forum,
		layout: "/admin",
		showOnDash: true,
	},
	{
		path: "/notifications",
		name: "Notifications",
		icon: "tim-icons icon-bell-55",
		component: Notifications,
		layout: "/admin",
		showOnDash: false,
	},
	{
		path: "/user-profile",
		name: "User Profile",
		icon: "tim-icons icon-single-02",
		component: UserProfile,
		layout: "/admin",
		showOnDash: true,
	},
];
export default routes;
