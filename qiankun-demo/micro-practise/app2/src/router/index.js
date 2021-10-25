import Home from "../views/home.vue";
/**
 关于对路由 '/' 的处理 
    无论在那个项目里面 URL必须确保主应用路由 和 子应用路由 独一无二，
    访问 '/'默认启动的是主应用；
    若微应用 存在 ' / ' 路由，在微应用加载时，访问 '/' 会回到主应用里面
    微应用中不要出现 '/' 路由，


  关于微前端的路由结构图
  container   - >  project main -> app.vue
   micro-app  -> project  micro   -> app.vue    以#app2开头的 一级路由 在app.vue容器中
                  other page's router-view           页面的二级路由
 
必须先加载微应用的app.vue 路由容器才能被加载 微应用的page才能根据url挂载到路由容器中

关于路由跳转：
    经过测试，微应用之间跨模块跳转正常，不用使用主应用传递过来的router实例对象
    主应用跳转到子应用页运行正常 
    以上的跳转均使用this.router.push()
疑问： 当子应用跨模块跳转的时候 子应用的router卸载了吗？

 */
const routes = [
  {
    name: "app2",
    path: "/app2",
    //redirect: "/app2/home", // 启动app2默认跳转到homepage页面
  },
  {
    name: "homePage",
    path: "/app2/home",
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
        component: () => import("../views/users.vue"),
      },
    ],
  },
  {
    name: "userPage",
    path: "/app2/user",
    component: () => import("../views/user.vue"),
  },
];

export { routes };
