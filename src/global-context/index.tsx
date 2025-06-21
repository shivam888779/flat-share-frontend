import React, {
  createContext,
  useContext,
  useMemo,
  useReducer,
  ReactNode,
  Dispatch,
  useEffect,
} from "react";
import { IInitialState } from "./initial-state-type";
import { initialStateData } from "./initial-state";

type GlobalContextType = {
  state: IInitialState;
  setState: Dispatch<Partial<IInitialState>>;
};

const GlobalContext = createContext<GlobalContextType>({
  state: initialStateData,
  setState: () => {},
});

const simpleReducer = (
  state: IInitialState,
  payload: Partial<IInitialState>
): IInitialState => ({
  ...state,
  ...payload,
});

interface GlobalContextProviderProps {
  children: ReactNode;
}

const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({
  children,
}) => {
  const [state, setState] = useReducer(simpleReducer, initialStateData);

  const providerValue = useMemo(() => ({ state, setState }), [state]);

  useEffect(() => {
    if (state !== initialStateData) {
      localStorage.setItem("state", JSON.stringify(state));
    }
  }, [state]);

  useEffect(() => {
    try {
      const savedState = localStorage.getItem("state");
      if (savedState) {
        setState(JSON.parse(savedState));
      }
    } catch (e) {
      console.error("Could not load state from local storage", e);
    }
  }, []);

  return (
    <GlobalContext.Provider value={providerValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);

export { GlobalContextProvider, GlobalContext };
