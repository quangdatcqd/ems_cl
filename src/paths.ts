
const base = "";
export const paths = {
  home: base+'/',
  admin: {
    signIn: base+'/admin/sign-in',
    signUp:base+ '/admin/sign-up',
    resetPassword: base+'/admin/reset-password',
    changePassword: base+'/admin/reset-password/:userId/:code'
  },

  dashboard: {
    overview: base+'/dashboard',
    account: base+'/dashboard/account',
    customers:base+ '/dashboard/customers',
    integrations: base+'/dashboard/integrations',
    settings:base+ '/dashboard/settings',
    accountManager:base+'/dashboard/account-manager',
    eventManager:base+'/dashboard/event-manager',
  },
  website: {
    setupRouter: base+'/website/setup/:id',
    setupPath :base+'/website/setup',
    viewRouter:base+ '/website/:id',
    viewPath:base+ '/website/',
 
  },
  sections: {
    sectionRouter: base+'/section/:id',
    sectionPath :base+'/section/', 
  },
  errors: { notFound: base+'/errors/not-found' },
} as const;
