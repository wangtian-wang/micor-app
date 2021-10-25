import Home from "../views/home.vue";

const routes = [
  {
    name: "main",
    path: "/",
    redirect: "mainhome",
  },
  {
    name: "mainhome",
    path: "/mainhome",
    component: Home,
    children: [
      {
        name: "other",
        path: "other",
        component: () => import("../views/other.vue"),
      },
      {
        name: "user",
        path: "user",
        component: () => import("../views/user.vue"),
      },
    ],
  },
  {
    name: "maincompo",
    path: "/maincompo",
    component: () => import("../views/home-compo.vue"),
  },
];

export { routes };
