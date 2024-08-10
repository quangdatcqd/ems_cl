import { createContext, Dispatch, SetStateAction } from "react";

export interface WebConfigType {
    name: string;
    bgType: string;
    bgValue: string;
    elements: {
        name: string;
        text:string;
        ENG_text: string;
        TW_text: string;
        VI_text: string;
        color: string;
        align: string;

    }[];
}

interface WebEditorContextProps {
    webConfigs: WebConfigType[];
    setWebConfigs: Dispatch<SetStateAction<WebConfigType[]>>;
    webConfig: WebConfigType | null;
    setWebConfig: Dispatch<SetStateAction<WebConfigType | null>>;
    handleDragEnter: (index: number) => void;
    handleRemoveSection: (index: number) => void;
    dragComponentName: string | null;
    setDragComponentName: Dispatch<SetStateAction<string | null>>;
    activeLang: { name:  "ENG_text"|"TW_text"|"VI_text", placeholder: string } ;
    setActiveLang: Dispatch<SetStateAction<{ name: "ENG_text"|"TW_text"|"VI_text", placeholder: string }  >>;
}

export const WebEditorContext = createContext<WebEditorContextProps>({
    webConfigs: [],
    setWebConfigs: () => { },
    webConfig: null,
    setWebConfig: () => { },
    handleDragEnter: () => { },
    handleRemoveSection: () => { },
    dragComponentName: null,
    setDragComponentName: () => { },
    activeLang: { name: "ENG_text", placeholder: "Type your text here..." },
    setActiveLang: () => { }
})