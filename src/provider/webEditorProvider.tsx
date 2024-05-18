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
  
  const handleDragEnter = (index: number) => { 
    if (dragComponentName) {
      const baseConfigSection = getBaseConfigSection(dragComponentName);
      console.log(baseConfigSection);
      
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
      handleRemoveSection
    }),
    [webConfig, webConfigs, dragComponentName]
  );

  return <WebEditorContext.Provider value={contextValue}>{children}</WebEditorContext.Provider>;
}

export const useWebEditorConfig = () => useContext(WebEditorContext);