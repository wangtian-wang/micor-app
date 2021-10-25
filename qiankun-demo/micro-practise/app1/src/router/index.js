import Home from "../views/home.vue";

const routes = [
  {
    name: "app",
    path: "/app1",
    redirect: "/app1/home",
  },
  {
    name: "app1",
    path: "/app1/home",
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
];

export { routes };
