'use client'
import React, { createContext, useContext, useMemo, useReducer, ReactNode, Dispatch, useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/router";
import { IInitialState } from "./initial-state-type";
import { initialStateData } from "./initial-state";
import { getPropertyHighlightsApi, getPropertyResourcesApi, getPropertyPreferncesApi } from "@/api/property";
import { getNotifications } from "@/api/notifications";
import { getProfileApi } from "@/api/profiles/my-profile";
import { getConnectionsApi } from "@/api/connections";
import { chatApi } from "@/api/chat";
import { IPropertyDetails } from "@/types/property";

type GlobalContextType = {
  state: IInitialState;
  setState: Dispatch<Partial<IInitialState>>;
  fetchNotification: () => Promise<void>;
  fetchProfile: () => Promise<void>;
  fetchConnections: () => Promise<void>;
  fetchChatRooms: () => Promise<void>;
  handleLoginDialog: (open: boolean) => void;
};

const GlobalContext = createContext<GlobalContextType>({
  state: initialStateData,
  setState: () => { },
  fetchNotification: async () => { },
  fetchProfile: async () => { },
  fetchConnections: async () => { },
  fetchChatRooms: async () => { },
  handleLoginDialog: () => { },
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
  const [isStorageLoaded, setIsStorageLoaded] = useState(false);
  const isInitialized = useRef(false);
  const router = useRouter();

  const fetchNotification = useCallback(async () => {
    try {
      const res = await getNotifications();
      setState({ notifications: res?.data?.data || [] });
    } catch (e) {
      console.error("Failed to fetch notifications", e);
    }
  }, [setState]);


  const isAuthPage = ["/create-profile", "/add-listing", "/my-profile", "/notifications", "/register", "/connections", "/edit-listing"]
  // Load from localStorage first
  useEffect(() => {
    if (isAuthPage.includes(window.location.pathname) && !state.userData.isLoggedIn) {
      router.push("/");
    }
  }, [state]);

  useEffect(() => {
    try {
      const savedState = localStorage.getItem("state");
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        setState(parsedState);
      }
      setIsStorageLoaded(true);
    } catch (e) {
      console.error("Could not load state from local storage", e);
      setIsStorageLoaded(true);
    }
  }, []);

  // Fetch requirements only after localStorage is loaded and state is updated
  useEffect(() => {
    if (!isStorageLoaded || isInitialized.current) {
      return;
    }

    const fetchRequirements = async () => {
      try {
        // Only fetch if data is not already present
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
    isInitialized.current = true;
  }, [isStorageLoaded, state]);

  const fetchProfile = useCallback(async () => {
    try {
      const res = await getProfileApi();
      setState({ userData: { ...res?.data?.data, isLoggedIn: true } });
    } catch (e) {
      console.error("Failed to fetch profile", e);
    }
  }, [setState]);

  const handleLoginDialog = useCallback((open: boolean) => {
    setState({ openLoginDialog: open });
  }, [setState]);

  const fetchConnections = useCallback(async () => {
    try {
      const res = await getConnectionsApi();
      console.log(res?.data?.data);
      setState({ connections: res?.data?.data || [] });
    } catch (e) {
      console.error("Failed to fetch profile", e);
    }
  }, [setState]);

  const fetchChatRooms = useCallback(async () => {
    try {
      const res = await chatApi.getChatRooms();
      setState({ chatRooms: res?.data || [] });
    } catch (e) {
      console.error("Failed to fetch chat rooms", e);
    }
  }, [setState]);


  useEffect(() => {
    if (isStorageLoaded) {
      fetchNotification();
    }
  }, [isStorageLoaded]);

  // Fetch notifications and connections on route change
  useEffect(() => {
    const handleRouteChange = () => {
      fetchNotification();
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events]);

  const providerValue = useMemo(() => ({
    state,
    setState,
    fetchNotification,
    fetchProfile,
    fetchConnections,
    fetchChatRooms,
    handleLoginDialog
  }), [state, fetchNotification, fetchProfile, fetchConnections, fetchChatRooms, handleLoginDialog]);

  // Save to localStorage when state changes (but not during initial load)
  useEffect(() => {
    if (isStorageLoaded && state !== initialStateData) {
      localStorage.setItem("state", JSON.stringify(state));
    }
  }, [state, isStorageLoaded]);

  return (
    <GlobalContext.Provider value={providerValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);

export { GlobalContextProvider, GlobalContext };
