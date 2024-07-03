import React, { useState } from "react";
import {
  createContext,
  useContext,
  useMemo,
  useReducer,
} from "react";

// import { BASE_URL } from "../shared/constants";

const initialState = {
    "name" : "shivam",
    "course":"B.tech"
}

const GlobalContext = createContext({ state: initialState,setState:(data)=>console.log(data)});

 const simpleReducer = (state, payload) => ({
  ...state,
  ...payload,
});

const { Provider, Consumer } = GlobalContext;


const GlobalContextProvider = ({ children }) => {

  const [state, setState] = useReducer(simpleReducer, initialState);
  const [statedata, setStateData] = useState(initialState);


  const providerValue = useMemo(() => ({ state,setState}),[state,setState]);
  return <Provider value={providerValue}>{children}</Provider>;
};

export const useGlobalContext = () => useContext(GlobalContext);

export { GlobalContextProvider, Consumer as GlobalConsumer, GlobalContext };