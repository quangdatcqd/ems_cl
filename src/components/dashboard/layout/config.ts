import type { NavItemConfig } from '../../../types/nav';
import { paths } from '../../../paths';
import { getCurrentUser } from '../../../helpers/common.helper';

const auth = getCurrentUser();

const AccountType = {
  Client: 'Client',
  Admin: 'Admin' 
};

let navItems = [
     // { key: 'overview', title: 'Overview', href: paths.dashboard.overview, icon: 'chart-pie' },
//  { key: 'account-manager', title: 'Account Manager', href: paths.dashboard.accountManager, icon: 'users' },
 // { key: 'customers', title: 'Customers', href: paths.dashboard.customers, icon: 'users' },
 // { key: 'integrations', title: 'Integrations', href: paths.dashboard.integrations, icon: 'plugs-connected' },
 { key: 'settings', title: 'Settings', href: paths.dashboard.settings, icon: 'gear-six' },
 { key: 'account', title: 'Profile', href: paths.dashboard.account, icon: 'user' },
 // { key: 'error', title: 'Error', href: paths.errors.notFound, icon: 'x-square' },
] as NavItemConfig[];

if (auth?.userInfo?.type === AccountType.Admin) {
  navItems.push(
    { key: 'account-manager', title: 'Accounts', href: paths.dashboard.accountManager, icon: 'users' },
    { key: 'event-manager', title: 'Events', href: paths.dashboard.eventManager, icon: 'users' },
  );
} else if (auth?.userInfo?.type === AccountType.Admin) {
  navItems.push(
    // { key: 'error', title: 'Error', href: paths.errors.notFound, icon: 'x-square' },
  );
} else if (auth?.userInfo?.type === AccountType.Client) {
  navItems.push();
}  

export { navItems };

