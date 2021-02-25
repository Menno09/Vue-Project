import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import store from "@/store";
Vue.use(Router);

const router = new Router({
  mode: "history",
  linkExactActiveClass: "vue-school-active-class",
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      const position = {};
      if (to.hash) {
        position.selector = to.hash;
        if (to.hash === "#experience") {
          position.offset = {
            y: 140
          };
        }
        if (document.querySelector(to.hash)) {
          return position;
        }

        return false;
      }
    }
  },
  routes: [{
      path: "/",
      name: "home",
      component: Home,
      props: true
    },

    {
      path: "/destination/:slug",
      name: "DestinationDetails",
      props: true,
      component: () => import("./views/DestinationDetails"),
      children: [{
        path: ":experienceSlug",
        name: "experienceDetails",
        props: true,
        component: () => import("./views/ExperienceDetails")
      }],
      beforeEnter: (to, from, next) => {
        const exists = store.destinations.find(
          destination => destination.slug === to.params.slug
        );
        if (exists) {
          next();
        } else {
          next({
            name: "notFound"
          });
        }
      }
    },
    {
      path: "/user",
      name: "user",
      component: () => import("./views/User.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/Login.vue")
    },
    {
      path: "/invoices",
      name: "invoices",
      component: () => import("./views/Invoices"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/employees",
      name: "employees",
      component: () => import("./views/Employees"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/404",
      alias: "*",
      name: "notFound",
      component: () => import("./views/NotFound")
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.user) {
      next({
        name: "login",
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;