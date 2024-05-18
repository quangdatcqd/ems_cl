import {  WebComponents } from "../components/website/components/WebComponent"; 

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