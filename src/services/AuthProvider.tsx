import React, {createContext, useEffect, useState} from 'react';
import {AppState} from 'react-native';
import {supabase} from './supabase';

interface AuthContextType {
  session: any | null;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({children}: any) => {
  const [session, setSession] = useState<any>(null);
  const [lastActiveTime, setLastActiveTime] = useState(Date.now());
  // const MAX_INACTIVITY_TIME = 2 * 60 * 1000;

  useEffect(() => {
    const initSession = async () => {
      const {data, error} = await supabase.auth.getSession();
      if (error) console.error('❌ Error obteniendo sesión:', error);
      setSession(data?.session ?? null);
    };

    initSession();

    const {data: authListener} = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('🔄 Supabase auth event:', event);
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          setSession(session);
        }
        if (event === 'SIGNED_OUT') {
          setSession(null);
        }
      },
    );

    const appStateListener = AppState.addEventListener(
      'change',
      nextAppState => {
        if (nextAppState === 'background') {
          setLastActiveTime(Date.now());
        }
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
      appStateListener.remove();
    };
  }, []);

  // * Esta funcion tiene que cerrar la sesion del usuario cuando se cumple el MAX_INACTIVITY_TIME en modo BACKGROUND
  // Opción: cerrar sesión manualmente tras inactividad
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (session && Date.now() - lastActiveTime > MAX_INACTIVITY_TIME) {
  //       console.log('Cerrar sesion por inactividad');
  //       supabase.auth.signOut();
  //     }
  //   }, 60 * 1000);

  //   return () => clearInterval(interval);
  // }, [session, lastActiveTime]);

  return (
    <AuthContext.Provider value={{session}}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
