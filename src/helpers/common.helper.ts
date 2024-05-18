import { NavComponents, WebComponents } from "../components/website/components/WebComponent";
import { Footer1Config } from "../components/website/components/footers/Footer1";
import { Header1Config } from "../components/website/components/headers/Header1";
import { Form1Config } from "../components/website/components/wellcomes/Form1";
import { Wellcome1Config } from "../components/website/components/wellcomes/Wellcome1";

export const getCurrentUser = () => {
    return getLocalStorage('auth')
}
export const getLocalStorage = (key: string): any => {
    const auth = localStorage.getItem(key) || null;
    return auth ? JSON.parse(auth) : null
}

 

export const getBaseConfigSection = (name: string) => {  
    const comp = WebComponents.find(comp=>comp.component.name  === name) 
    return comp?.config
}