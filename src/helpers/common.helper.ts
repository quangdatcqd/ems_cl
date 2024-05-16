import { Footer1Config } from "../components/website/components/footers/Footer1";
import { Header1Config } from "../components/website/components/headers/Header1";
import { Form1Config } from "../components/website/components/sections/Form1";
import { Section1Config } from "../components/website/components/sections/Section1";

export const getCurrentUser = () => {
    return getLocalStorage('auth')
}
export const getLocalStorage = (key: string): any => {
    const auth = localStorage.getItem(key) || null;
    return auth ? JSON.parse(auth) : null
}

export const getBaseConfigSection = (name: string) => {
    switch (name) {
        case "Section1":
            return Section1Config;


        case "Form1":
            return Form1Config;


        case "Header1":
            return Header1Config;


        case "Footer1":
            return Footer1Config;



        default:
            break;
    }
    return
}