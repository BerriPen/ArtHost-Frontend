const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/IndexPage.vue"),
      },
      {
        path: "events",
        component: () => import("pages/EventPage.vue"),
      },
      {
        path: "eventdetails/:id",
        component: () => import("pages/EventDetailPage.vue"),
        props: true,
      },
      {
        path: "userprofile",
        component: () => import("pages/UserProfilePage.vue"),
      },
      {
        path: "createevent",
        component: () => import("pages/CreateEventPage.vue"),
      },
      {
        path: "secure-data",
        component: () => import("pages/SecureDataPage.vue"),
      },
    ],
  },
  {
    path: "/register",
    component: () => import("layouts/MiniLayout.vue"),
    children: [
      { path: "", component: () => import("pages/RegistrationPage.vue") },
    ],
  },
  {
    path: "/login",
    component: () => import("layouts/MiniLayout.vue"),
    children: [{ path: "", component: () => import("pages/LoginPage.vue") }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;