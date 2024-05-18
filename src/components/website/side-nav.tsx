

import * as React from 'react';
import { Sidenav, Nav, IconButton } from 'rsuite';
import SiteIcon from '@rsuite/icons/Site';
import CloseIcon from '@rsuite/icons/Close';
import { paths } from '../../paths';
import { useWebEditorConfig } from '../../provider/webEditorProvider';
import { NavComponents } from './components/WebComponent';
import { NavTemplates } from './components/WebTemplates' ;



export function SideNav(): React.JSX.Element {
  const [activeKey, setActiveKey] = React.useState('');
  const handleSelectNav = (navKey: string) => {
    setActiveKey(navKey)
  }
  return (
    <div className='h-screen fixed top-[80px] pt-5 w-14 bg-white web-side-nav z-50'>
      <Sidenav expanded={false}  >
        <Sidenav.Body>
          <Nav activeKey={activeKey} onSelect={handleSelectNav}>
            {/* <Nav.Item eventKey="Elements" style={{ backgroundColor: "white" }} icon={<AddOutlineIcon />}>Elements </Nav.Item> */}
            <Nav.Item eventKey="Sections" icon={<SiteIcon />}> Sections </Nav.Item>
            <Nav.Item eventKey="Templates" icon={<SiteIcon />}> Templates </Nav.Item>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
      <SideNavExpand activeKey={activeKey} setActiveKey={setActiveKey} />
    </div>
  );
}






export function SideNavExpand({ activeKey, setActiveKey }: { activeKey: string, setActiveKey: any }): React.JSX.Element {

  const [activeSection, setActiveSection] = React.useState(activeKey === "Sections" ? 'Headers' : "");
  const [components, setComponents] = React.useState<{
    components: any,
    config: any
  }[]>();

  const { setWebConfigs } = useWebEditorConfig();

  const handleChangeSection = (key: string) => {
    const findComp: any = NavComponents.find(comp => comp.key === key);

    if (findComp) setComponents(findComp.components)
    else setComponents([])
    setActiveSection(key)
  }

  const handleClickTemplate = (template: any) => {
    setWebConfigs(template.config)
    setActiveSection(template.name)
  }

  React.useEffect(() => {
    if (activeKey === "Sections") {
      const findComp: any = NavComponents.find(comp => comp.key === "Headers");
      if (findComp) setComponents(findComp.components)
    }
  }, [])

  return (
    <>
      {
        activeKey !== "" &&
        <div className={`fixed bg-white left-14 top-[80px]   drop-shadow-xl max-w-[24.4rem] z-10 h-screen `} >
          <div className=' right-0 relative w-full '>
            <p className='px-5 py-3  font-[500] ' > Add {activeKey}</p>
            <IconButton onClick={() => setActiveKey("")} className='absolute right-2 top-2 z-10' circle icon={<CloseIcon />} />
          </div>
          <div className='w-full flex  '>
            <div className='py-2 px-3 bg-slate-50 flex    flex-col items-start'>
              {
                activeKey === "Sections" && NavComponents.map((nav, index) => (
                  <span key={index}
                    className={`py-1 px-3 pb-2 mb-2 hover:bg-sky-100 hover:text-sky-600 cursor-pointer rounded-3xl ${activeSection === nav.key && "text-sky-600 bg-sky-100"}`}
                    onClick={() => handleChangeSection(nav.key)}
                  >{nav.key}</span>
                ))
              }
              {
                activeKey === "Templates" && NavTemplates.map((nav, index) => (
                  <span key={index}
                    className={`py-1 px-10 pb-2 mb-2 hover:bg-sky-100 hover:text-sky-600 cursor-pointer rounded-3xl ${activeSection === nav.name && "text-sky-600 bg-sky-100"}`}
                    onClick={() => handleClickTemplate(nav)}
                  >{nav.name}</span>
                ))
              }
            </div>
            {
              activeKey === "Sections" &&
              <div className='p-2 drop-shadow-sm bg-white overflow-y-scroll custom-scroll w-full '
                style={{ height: "calc(100vh - 150px)" }}
              >
                {
                  components?.map((section: any, index: number) => (
                    <ScaledIframe key={index}
                      name={section?.component.name}
                      scaleFactor={0.25}
                      src={paths.sections.sectionPath + section.component.name.toLowerCase()}
                    />))
                }
              </div>
            }
          </div>
        </div >
      }
    </>

  );
}




interface IframeProps {
  src: string;
  scaleFactor: number;
  name: string;
}

const ScaledIframe: React.FC<IframeProps> = ({ src, scaleFactor, name }) => {
  const { setDragComponentName } = useWebEditorConfig();
  const [iframeHeight, setIframeHeight] = React.useState(0);
  const adjustIframeHeight = (event: any) => {
    if (event.target) {
      const iframeH = event.target.contentWindow?.document.body.scrollHeight || 0;
      const newHeight = iframeH * scaleFactor;
      event.target.style.height = `${iframeH}px`;
      setIframeHeight(newHeight)
    }
  };

  return (
    <div
      onDragStart={() => setDragComponentName(name)}
      className={`border-sky-50 border-4 hover:border-sky-200   w-100  overflow-hidden mt-2   rounded-xl select-none cursor-move`}
      style={{ height: iframeHeight }}
      draggable
    >
      <iframe
        onLoad={adjustIframeHeight}
        src={src}
        style={{
          width: '939.4px',
          height: 'auto',
          transform: `scale(${scaleFactor})`,
          transformOrigin: 'top left',
          userSelect: "none",
          pointerEvents: 'none'
        }}
      />
    </div>
  );
};
