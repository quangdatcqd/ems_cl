import { useContext, useMemo, useState, ReactNode } from "react";
import { WebConfigType, WebEditorContext } from "../context/webEditorContext";
import { getBaseConfigSection } from "../helpers/common.helper";

interface WebEditorProviderProps {
  children: ReactNode;
}

export default function WebEditorProvider({ children }: WebEditorProviderProps) {
  const [webConfig, setWebConfig] = useState<WebConfigType | null>(null);
  const [dragComponentName, setDragComponentName] = useState<string | null>(null);
  const [webConfigs, setWebConfigs] = useState<WebConfigType[]>([]); 
  const [activeLang, setActiveLang] = useState<{ name:  "ENG_text"|"TW_text"|"VI_text", placeholder: string }  >({
    name: "ENG_text",
    placeholder: "Type your text here..."
  }); 
  
  
  const handleDragEnter = (index: number) => { 
    if (dragComponentName) {
      const baseConfigSection = getBaseConfigSection(dragComponentName); 
      if (baseConfigSection)
        setWebConfigs((prevWebConfigs) => {
          const newWebConfigs = [...prevWebConfigs];
          newWebConfigs.splice(index, 0, baseConfigSection);
          return newWebConfigs;
        });
    }
  };

  const handleRemoveSection = (index: number) => { 
    if (index>=0)
      setWebConfigs((prevWebConfigs) => {
        const newWebConfigs = [...prevWebConfigs];
        newWebConfigs.splice(index, 1); 
        return newWebConfigs;
      });
  }

  const contextValue = useMemo(
    () => ({
      webConfig,
      setWebConfig,
      webConfigs,
      setWebConfigs,
      handleDragEnter,
      setDragComponentName,
      dragComponentName,
      handleRemoveSection,
      activeLang,
      setActiveLang
    }),
    [webConfig, webConfigs, dragComponentName,activeLang]
  );

  return <WebEditorContext.Provider value={contextValue}>{children}</WebEditorContext.Provider>;
}

export const useWebEditorConfig = () => useContext(WebEditorContext);