 
import * as React from 'react';  
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { GearSix as GearSixIcon } from '@phosphor-icons/react/dist/ssr/GearSix';
import { SignOut as SignOutIcon } from '@phosphor-icons/react/dist/ssr/SignOut';
import { User as UserIcon } from '@phosphor-icons/react/dist/ssr/User';

import { paths } from '../../../paths'; 
import { useNavigate } from 'react-router-dom'; 
import { useAuth } from '../../../provider/authProvider';
import authService from '../../../services/adminAuth.service';

export interface UserPopoverProps {
  anchorEl: Element | null;
  onClose: () => void;
  open: boolean;
}

export function UserPopover({ anchorEl, onClose, open }: UserPopoverProps): React.JSX.Element {
  const {auth,setAuth} = useAuth();

  const router = useNavigate();

  const handleSignOut = React.useCallback(async (): Promise<void> => {
    try {
      const data = await authService.signOut(auth?.userInfo); 
      if(data.statusCode = 201){ 
        localStorage.removeItem("auth");
        setAuth(null);
        // UserProvider, for this case, will not refresh the router and we need to do it manually
        router(paths.admin.signIn);
      } 
      // After refresh, AuthGuard will handle the redirect
    } catch (err) { 
    }
  }, [  router]); 
  
  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      onClose={onClose}
      open={open}
      slotProps={{ paper: { sx: { width: '240px' } } }}
    >
      <Box sx={{ p: '16px 20px ' }}>
        <Typography variant="subtitle1">{auth?.userInfo?.name}</Typography>
        <Typography color="text.secondary" variant="body2">
          {/* sofia.rivers@devias.io */}
        </Typography>
      </Box>
      <Divider />
      <MenuList disablePadding sx={{ p: '8px', '& .MuiMenuItem-root': { borderRadius: 1 } }}>
        <MenuItem  onClick={()=>router(paths.dashboard.settings)}>
          <ListItemIcon>
            <GearSixIcon fontSize="var(--icon-fontSize-md)" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem   onClick={()=>router(paths.dashboard.account)}>
          <ListItemIcon>
            <UserIcon fontSize="var(--icon-fontSize-md)" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={handleSignOut}>
          <ListItemIcon>
            <SignOutIcon fontSize="var(--icon-fontSize-md)" />
          </ListItemIcon>
          Sign out
        </MenuItem>
      </MenuList>
    </Popover>
  );
}
