import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { Form } from "./Form";
import { FormMobile } from './FormMobile'
import  React, { useState, useEffect, createContext, useContext } from "react";

interface ViewportContextType {
  width: number;
  height: number;
}

type Props = {
  children?: React.ReactNode
};

const viewportContext = createContext<ViewportContextType | undefined>(undefined);

const ViewportProvider: React.FC<Props> = ({children}) => {
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [height, setHeight] = useState<number>(window.innerHeight);

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };
  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <viewportContext.Provider value={{ width, height }}>
    {children}
    </viewportContext.Provider>
  );
  };

const useViewport = (): ViewportContextType => {
  const context = useContext(viewportContext);
  if(context === undefined) {
    throw new Error("useViewport must be used within a ViewportProvider");
  }
  return context;
};

const Responsive: React.FC = () => {
  const { width } = useViewport();
  const breakpoint = 620;

  return width < breakpoint ? <FormMobile /> : <Form/>;

}
export default function Component() {
  return (
      <ViewportProvider> 
        <Responsive/>
      </ViewportProvider>

  );
};