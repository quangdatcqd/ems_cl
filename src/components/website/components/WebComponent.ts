
import About1, { About1Config } from "./abouts/About1";
import Footer1, { Footer1Config } from "./footers/Footer1";
import Gallery1, { Gallery1Config } from "./gallery/Gallery1";
import Gallery2, { Gallery2Config } from "./gallery/Gallery2";
import Header1, { Header1Config } from "./headers/Header1";
import Service1, { Service1Config } from "./services/Service1";
import Wellcome1, { Wellcome1Config } from "./wellcomes/Wellcome1";
import Wellcome2, { Wellcome2Config } from "./wellcomes/Wellcome2";
import Wellcome3, { Wellcome3Config } from "./wellcomes/Wellcome3";


export interface NavComponentsType {
    key: string,
    components: {
        component: any ,
        config: any
    }[] 
}


export const NavComponents: NavComponentsType[] = [
    {
        key: "Headers",
        components: [
            {
                component: Header1,
                config: Header1Config
            }
        ] 

    },
    {
        key: "Wellcomes",
        components: [
            {
                component: Wellcome1,
                config: Wellcome1Config
            },
            {
                component: Wellcome2,
                config: Wellcome2Config
            },
            {
                component: Wellcome3,
                config: Wellcome3Config
            }
        ] 
    },
    {
        key: "Gallery",
        components: [
            {
                component: Gallery1,
                config: Gallery1Config
            },
            {
                component: Gallery2,
                config: Gallery2Config
            }
        ] 
    }, {
        key: "Services",
        components: [
            {
                component: Service1,
                config: Service1Config
            } 
        ] 
    },
    {
        key: "Abouts",
        components: [
            {
                component: About1,
                config: About1Config
            } 
        ] 
    }, 
    {
        key: "Footers",
        components: [
            {
                component: Footer1,
                config: Footer1Config
            }
        ] 
    }
]
 




export const WebComponents = NavComponents.flatMap((comp: NavComponentsType) => {
    return comp.components
})

