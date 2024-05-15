

import * as React from 'react';
import { Sidenav, Nav, Drawer, Button } from 'rsuite';
import MagicIcon from '@rsuite/icons/legacy/Magic';
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';
import AddOutlineIcon from '@rsuite/icons/AddOutline';
import SiteIcon from '@rsuite/icons/Site';

export function ListElement(): React.JSX.Element {
  const [activeKey, setActiveKey] = React.useState('1');
  const [openNavExpand, setOpenNavExpand] = React.useState<boolean>(true);

  const handleSelectNav = (navKey: string) => {
    setActiveKey(navKey)
    setOpenNavExpand(Number(navKey) >= 0 ? true : false)
  }

  return (
    <>

      <Sidenav expanded={false} defaultOpenKeys={['3', '4']}>
        <Sidenav.Body>

          <Nav activeKey={activeKey} onSelect={handleSelectNav}>
            <Nav.Item eventKey="1" icon={<AddOutlineIcon />}> </Nav.Item>
            <Nav.Item eventKey="2" icon={<SiteIcon />}> Section </Nav.Item>
            <Nav.Menu placement="rightStart" eventKey="3" title="Advanced" icon={<MagicIcon />}>
              <Nav.Item eventKey="3-1">Geo</Nav.Item>
              <Nav.Item eventKey="3-2">Devices</Nav.Item>
              <Nav.Item eventKey="3-3">Loyalty</Nav.Item>
              <Nav.Item eventKey="3-4">Visit Depth</Nav.Item>
            </Nav.Menu>
            <Nav.Menu
              placement="rightStart"
              eventKey="4"
              title="Settings"
              icon={<GearCircleIcon />}
            >
              <Nav.Item eventKey="4-1">Applications</Nav.Item>
              <Nav.Item eventKey="4-2">Channels</Nav.Item>
              <Nav.Item eventKey="4-3">Versions</Nav.Item>
              <Nav.Menu eventKey="4-5" title="Custom Action">
                <Nav.Item eventKey="4-5-1">Action Name</Nav.Item>
                <Nav.Item eventKey="4-5-2">Action Params</Nav.Item>
              </Nav.Menu>
            </Nav.Menu>

          </Nav>
        </Sidenav.Body>
      </Sidenav>
      <SideNavExpand open={openNavExpand} setOpen={setOpenNavExpand} />

    </>



  );
}

export function SideNavExpand({ open, setOpen }: { open: boolean, setOpen: Function }): React.JSX.Element {
  return (
    <Drawer
      backdrop={false}
      open={open}
      onClose={() => setOpen(false)}
      placement={"left"}
      style={{ left: "55px" }}
 
    >
      <Drawer.Header >
        <Drawer.Title>Drawer Title</Drawer.Title>
        <Drawer.Actions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => setOpen(false)} appearance="primary">
            Confirm
          </Button>
        </Drawer.Actions>
      </Drawer.Header>
      <Drawer.Body>
        sdf
      </Drawer.Body>
    </Drawer>
  );
}