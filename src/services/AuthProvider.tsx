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
  const MAX_INACTIVITY_TIME = 15 * 60 * 1000;

  useEffect(() => {
    const getSession = async () => {
      const {data, error} = await supabase.auth.getSession();
      if (error) console.error('❌ Error obteniendo sesión:', error);
      setSession(data?.session ?? null);
    };

    getSession();
  }, []);

  useEffect(() => {
    const {data: authListener} = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
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

  useEffect(() => {
    const interval = setInterval(() => {
      if (session && Date.now() - lastActiveTime > MAX_INACTIVITY_TIME) {
        supabase.auth.signOut();
      }
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, [session, lastActiveTime]);

  return (
    <AuthContext.Provider value={{session}}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
