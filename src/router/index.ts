import { createRouter, createWebHistory } from "vue-router"
import WelcomePage from "../views/WelcomePage.vue"
import Admin from "../views/Admin.vue"
import SignIn from "../views/SignIn.vue"
import SignUp from "../views/SignUp.vue"
import ResetPassword from "../views/ResetPasswordPage.vue"
import { useUserStore } from "@/stores"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: WelcomePage,
    },
    {
      path: "/signIn",
      name: "signIn",
      component: SignIn,
    },
    {
      path: "/signUp",
      name: "signUp",
      component: SignUp,
    },
    {
      path: "/resetPasswordz",
      name: "resetPassword",
      component: ResetPassword,
    },
    {
      path: "/admin",
      name: "admin",
      component: Admin,z
      meta: { requiresAuth: true }
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  const isAuthenticated = await userStore.isUserLogIn();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !isAuthenticated) {
    next('/');
  } else if (isAuthenticated) {
    await userStore.changeUserData();
    next()
  } else {
    next()
  }
})

export default router;
