

import * as React from 'react';
import { Sidenav, Nav, IconButton } from 'rsuite';
import AddOutlineIcon from '@rsuite/icons/AddOutline';
import SiteIcon from '@rsuite/icons/Site';
import CloseIcon from '@rsuite/icons/Close';
import { ListSections } from './components/sections/ListSections';
import { paths } from '../../paths';
export function SideNav({handleDrag}:{handleDrag:Function}): React.JSX.Element {
  const [activeKey, setActiveKey] = React.useState('');

  const handleSelectNav = (navKey: string) => {
    setActiveKey(navKey)
  }

  return (
    <div className='h-screen fixed top-[80px] pt-5 w-14 bg-white web-side-nav z-50'>
      <Sidenav expanded={false}  >
        <Sidenav.Body>
          <Nav activeKey={activeKey} onSelect={handleSelectNav}>
            <Nav.Item eventKey="Elements" style={{ backgroundColor: "white" }} icon={<AddOutlineIcon />}>Elements </Nav.Item>
            <Nav.Item eventKey="Sections" icon={<SiteIcon />}> Section </Nav.Item> 
          </Nav>
        </Sidenav.Body>
      </Sidenav>
      <SideNavExpand activeKey={activeKey} setActiveKey={setActiveKey} handleDrag={handleDrag} />
    </div>
  );
}

export function SideNavExpand({ activeKey, setActiveKey,handleDrag }: { activeKey: string, setActiveKey: any,handleDrag:Function }): React.JSX.Element {
  let components;
  if (activeKey === "Sections") components = ListSections;
  return (
    <>
      {
        activeKey !== "" &&
        <div className="fixed bg-white left-14 top-[80px]   drop-shadow-xl w-[25rem] z-10 h-screen " >
          <div className=' right-0 relative w-full '>
            <p className='px-5 py-3  font-[500] ' > Add {activeKey}</p>
            <IconButton onClick={() => setActiveKey("")} className='absolute right-2 top-2 z-10' circle icon={<CloseIcon />} />
          </div>
          <div className='w-full flex  '>
            <div className='py-2 px-3 bg-slate-50 flex    flex-col items-start'>
              <span className='py-1 px-5 pb-2 hover:bg-sky-100 hover:text-sky-600 cursor-pointer rounded-3xl'>Text</span>
              <span className='py-1 px-5 pb-2 hover:bg-sky-100 hover:text-sky-600 cursor-pointer rounded-3xl'>Text</span>
              <span className='py-1 px-5 pb-2 hover:bg-sky-100 hover:text-sky-600 cursor-pointer rounded-3xl'>Text</span>
            </div>
            <div className=' p-2 drop-shadow-sm bg-white overflow-y-scroll custom-scroll w-full '>
              {
                components?.map((section, index) => {
                  return <div key={index}
                    onDragStart={()=>handleDrag(section.name)}
                    className='border-transparent border-4 hover:border-green-200    w-100 h-[150px] overflow-hidden mt-2   rounded-xl select-none cursor-move' draggable
                  >
                    <iframe style={{
                      width: '939.4px',
                      height: '900px',
                      transform: 'scale(0.3)',
                      transformOrigin: 'top left',
                      border: 'none',
                      userSelect: "none",
                      pointerEvents: 'none',
                    }} src={paths.sections.sectionPath + section.name.toLowerCase()}></iframe>
                  </div>
                })
              }
            </div>
          </div>


        </div >
      }
    </>

  );
}