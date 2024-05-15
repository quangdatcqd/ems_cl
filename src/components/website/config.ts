import type { NavItemConfig } from '../../../types/nav';
import { paths } from '../../../paths';
import { getCurrentUser } from '../../../helpers/common.helper';

const auth = getCurrentUser();

const AccountType = {
  Client: 'Client',
  Admin: 'Admin' 
};

let navItems = [ ] as NavItemConfig[];

if (auth?.userInfo?.type === AccountType.Admin) {
  navItems.push(
    { key: '', title: '', href: paths.dashboard.accountManager, icon: 'users' },
    { key: 'edit', title: '', href: paths.dashboard.eventManager, icon: 'users' },
  );
} 

export { navItems };

