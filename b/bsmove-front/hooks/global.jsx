import { createContext, useContext, useState, useEffect } from "react";
import { debounce } from "lodash";
import Routes from "../helpers/routes";

const GlobalContext = createContext({
  setGlobal: (global) => undefined,
});

// This component is declared at the top level,
export const GlobalProvider = ({ children }) => {
  const [global, setGlobal] = useState({ screenWidth: 9999, redirect: Routes.HOME_PAGE });

  function addToGlobalStateByKey(key, value) {
      return setGlobal((previousGlobal) => ({
          ...previousGlobal,
          [key]: value,
      }))
  }

  function resetRedirect() {
      if (global?.redirect !== Routes.HOME_PAGE) {
          addToGlobalStateByKey('redirect', Routes.HOME_PAGE)
      }
  }

  useEffect(() => {
    if (typeof window === "undefined") return;
    window?.addEventListener(
      "resize",
      debounce(() => {
        addToGlobalStateByKey('screenWidth', window?.innerWidth)
      }, 300)
    );
    addToGlobalStateByKey('screenWidth', window?.innerWidth)
    return () => window?.removeEventListener("resize", null);
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        global,
        setGlobal,
        addToGlobalStateByKey,
        resetRedirect,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => useContext(GlobalContext);
