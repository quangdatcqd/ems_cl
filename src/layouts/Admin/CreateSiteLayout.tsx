import * as React from 'react'; 
import { SideNav } from '../../components/website/layout/side-nav';
interface LayoutProps {
  children: React.ReactNode;
}

export default function CreateSiteLayout({ children }: LayoutProps): React.JSX.Element {
  
  return (    <>
  <SideNav/> 
  
  </>

);
}
