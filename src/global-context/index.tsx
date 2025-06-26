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
import { getPropertyHighlightsApi, getPropertyResourcesApi, getPropertyPreferncesApi } from "@/pages/property/apis";

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

  // Fetch requirements if not already present
  useEffect(() => {
    const fetchRequirements = async () => {
      try {
        if (!state.highLights.length) {
          const res = await getPropertyHighlightsApi();
          setState({ highLights: res?.data?.data || [] });
        }
        if (!state.resources.length) {
          const res = await getPropertyResourcesApi();
          setState({ resources: res?.data?.data || [] });
        }
        if (!state.preferences.length) {
          const res = await getPropertyPreferncesApi();
          setState({ preferences: res?.data?.data || [] });
        }
      } catch (e) {
        console.error("Failed to fetch requirements", e);
      }
    };
    fetchRequirements();
  }, [state.highLights.length, state.resources.length, state.preferences.length]);

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
