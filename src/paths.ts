export const paths = {
  home: '/',
  admin: {
    signIn: '/admin/sign-in',
    signUp: '/admin/sign-up',
    resetPassword: '/auth/reset-password'
  },
  dashboard: {
    overview: '/dashboard',
    account: '/dashboard/account',
    customers: '/dashboard/customers',
    integrations: '/dashboard/integrations',
    settings: '/dashboard/settings',
    accountManager:'/dashboard/account-manager',
  },
  errors: { notFound: '/errors/not-found' },
} as const;
