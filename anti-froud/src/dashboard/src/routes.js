import Index from "views/Index.js";
import Tables from "views/examples/Tables.js";
import Insert from "views/examples/Insert.js";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: <Tables />,
    layout: "/admin",
  },
  {
    path: "/insert",
    name: "Insert",
    icon: "ni ni-bullet-list-67 text-red",
    component: <Insert />,
    layout: "/admin",
  }
];
export default routes;
