import { createContext, Dispatch, SetStateAction } from "react";

export interface WebConfigType {
    name: string;
    bgType: string;
    bgValue: string;
    elements: {
        name: string;
        text: string;
    }[];
}

interface WebEditorContextProps {
    webConfigs: WebConfigType[];
    setWebConfigs: Dispatch<SetStateAction<WebConfigType[]>>;
    webConfig: WebConfigType   | null;
    setWebConfig: Dispatch<SetStateAction<WebConfigType | null>>;
    handleDragEnter: (index:number) => void;
    handleRemoveSection: (index:number) => void;
    dragComponentName: string |null;
    setDragComponentName: Dispatch<SetStateAction<string | null>>;
}

export const WebEditorContext = createContext<WebEditorContextProps>({
    webConfigs: [],
    setWebConfigs: () => { },
    webConfig: null,
    setWebConfig: () => { },
    handleDragEnter: () => { },
    handleRemoveSection: () => { },
    dragComponentName: null,
    setDragComponentName: () => { } 
})