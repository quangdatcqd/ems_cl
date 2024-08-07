import { getCurrentUser } from "../../helpers/common.helper";
import { paths } from "../../paths";
import { NavItemConfig } from "../../interface/nav";

  

const auth = getCurrentUser();

const AccountType = {
  Client: 'Client',
  Admin: 'Admin' 
};

let navItems = [ ] as NavItemConfig[];

if (auth?.userInfo?.type === AccountType.Admin) {
  navItems.push(
    { key: '', title: '', href: paths.admin.dashboard.adminAccountManager, icon: 'users' },
    { key: 'edit', title: '', href: paths.admin.dashboard.eventManager, icon: 'users' },
  );
} 

export { navItems };

