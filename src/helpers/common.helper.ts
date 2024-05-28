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

export function generateNonce() { 
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }