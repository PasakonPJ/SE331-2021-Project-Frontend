import { createRouter, createWebHistory } from "vue-router";
import list from "@/views/patient_list.vue";
import About from "../views/About.vue";
import PatientLayout from "@/views/vaccines/Layout.vue";
import Dates from "@/views/vaccines/Date.vue";
import PatientDetails from "@/views/vaccines/PatientDetails.vue";
import RoleDetails from "@/views/vaccines/RoleDetails.vue";
import Doctorcomment from "@/views/vaccines/Doctor.vue";
import KProgress from "nprogress";
import notFound from "@/views/notFound.vue";
import patient_api from "@/services/patient_api.js";
import Global_Store from "@/store";
import PNotFound from "@/views/404Patient.vue";
import network_error from "@/views/network_error.vue";
import Login from "@/views/LoginForm.vue";
import Register from "@/views/RegisterForm.vue";
import Admin from "@/views/AdminForm.vue";
import AddDV from "@/views/AdminAdddata.vue";
import ChangeRole from "@/views/ChangeRole.vue";
import Profile from "@/views/Profile.vue";
const routes = [
  {
    path: "/changerole",
    name: "ChangeRole",
    component: ChangeRole,
    props: true,
    beforeEnter: (to) => {
      return patient_api
        .get_user_id(to.params.id)
        .then((response) => {
          Global_Store.user = response.data;
        })
        .catch((error) => {
          if (error.response && error.response.status == 404) {
            return {
              name: "404Patient",
            };
          } else {
            return {
              name: "network_error",
            };
          }
        });
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/",
    name: "list",
    component: list,
    props: (url) => ({ page: parseInt(url.query.page || 1) }),
  },
  {
    path: "/addDV",
    name: "AddDV",
    component: AddDV,
    props: true,
    beforeEnter: (to) => {
      return patient_api
        .get_patient_id(to.params.id)
        .then((response) => {
          Global_Store.patient = response.data;
        })
        .catch((error) => {
          if (error.response && error.response.status == 404) {
            return {
              name: "404Patient",
            };
          } else {
            return {
              name: "network_error",
            };
          }
        });
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/patient/:id",
    name: "PatientLayout",
    component: PatientLayout,
    props: true,
    beforeEnter: (to) => {
      return patient_api
        .get_patient_id(to.params.id)
        .then((response) => {
          Global_Store.patient = response.data;
        })
        .catch((error) => {
          if (error.response && error.response.status == 404) {
            return {
              name: "404Patient",
            };
          } else {
            return {
              name: "network_error",
            };
          }
        });
    },
    children: [
      {
        path: "",
        name: "PatientDetails",
        props: true,
        component: PatientDetails,
      },
      {
        path: "",
        name: "RoleDetails",
        props: true,
        component: RoleDetails,
      },
      {
        path: "date",
        name: "Dates",
        props: true,
        component: Dates,
      },
      {
        path: "doctorcomment",
        name: "Doctorcomment",
        props: true,
        component: Doctorcomment,
      },
    ],
  },
  {
    path: "/:catchAll(.*)",
    name: "notFound",
    component: notFound,
    props: true,
  },
  {
    path: "/404/patient",
    name: "404Patient",
    component: PNotFound,
  },
  {
    path: "/network_error",
    name: "network_error",
    component: network_error,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach(() => {
  KProgress.start();
});
router.afterEach(() => {
  KProgress.done();
});

export default router;
