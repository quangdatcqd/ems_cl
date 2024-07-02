// const WEB_URL = "http://localhost:5173"
// const SERVER_URL = "http://localhost:3000"


export const pathAdmin = "/admin";
export const pathClient = "/auth";
// export const GOOGLE_CLIENT_ID = "";

export const paths = {
  admin: {
    auth: {
      signIn: pathAdmin + '/sign-in',
      signUp: pathAdmin + '/sign-up',
      resetPassword: pathAdmin + '/reset-password',
      changePassword: pathAdmin + '/reset-password/:userId/:code'
    },
    dashboard: {
      overview: pathAdmin + '/dashboard',
      account: pathAdmin + '/dashboard/account',
      customers: pathAdmin + '/dashboard/customers',
      integrations: pathAdmin + '/dashboard/integrations',
      settings: pathAdmin + '/dashboard/settings',
      adminAccountManager: pathAdmin + '/dashboard/account-manager',
      clientAccountManager: pathAdmin + '/dashboard/client-account-manager',
      eventManager: pathAdmin + '/dashboard/event-manager',
      eventFoodRegis: pathAdmin + '/dashboard/event-food-regis',
    },
    website: {
      setupRouter: pathAdmin + '/website/setup/:id',
      setupPath: pathAdmin + '/website/setup',
      viewRouter: pathAdmin + '/website/:id',
      viewPath: pathAdmin + '/website/',
      viewTemplateRouter: pathAdmin + '/website-demo/:template',
      viewTemplatePath: pathAdmin + '/website-demo/',
    },
    sections: {
      sectionRouter: pathAdmin + '/section/:id',
      sectionPath: pathAdmin + '/section/',
    },
  },
  client: {
    auth: {
      signIn: pathClient + '/sign-in',
      signInFBRouter: pathClient + '/sign-in/:userData',
      signFBPath: import.meta.env.VITE_SERVER_URL + '/client/auth/facebook/redirect',
      signUp: pathClient + '/sign-up',
      resetPassword: pathClient + '/reset-password',
      changePassword: pathClient + '/reset-password/:userId/:code'
    },
    home: '/',

  },
  imagePath: import.meta.env.VITE_SERVER_URL + "/images/",
  website: {
    viewRouter: '/website/:id',
    viewPath: '/website/',
    joinEventRouter: '/website/join-event/:eventId',
    joinEventPath: '/website/join-event/',
  },
  errors: { notFound: pathAdmin + '/errors/not-found' },
} as const;




