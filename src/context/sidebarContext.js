import { createContext, useContext, useState } from "react";

export const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [fullwindow, setFullwindow] = useState(true);
  return (
    <SidebarContext.Provider
      value={{ sidebarOpen, setSidebarOpen, fullwindow, setFullwindow }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
