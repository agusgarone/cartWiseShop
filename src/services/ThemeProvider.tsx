import React, {createContext, useEffect, useState} from 'react';
import theme from '../common/theme';
import {supabase} from '../services/supabase';

interface ThemeContextType {
  theme: typeof theme.light;
  mode: 'light' | 'dark';
  setMode: (mode: 'light' | 'dark') => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: theme.light,
  mode: 'light',
  setMode: () => {},
});

const ThemeProvider = ({children}: {children: React.ReactNode}) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const fetchUserTheme = async () => {
      const {data: sessionData} = await supabase.auth.getSession();
      const uid = sessionData?.session?.user?.id;
      if (!uid) return;

      const {data} = await supabase
        .from('users')
        .select('theme')
        .eq('uid', uid)
        .single();

      if (data?.theme === 'dark') setMode('dark');
    };

    fetchUserTheme();
  }, []);

  return (
    <ThemeContext.Provider value={{theme: theme[mode], mode, setMode}}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
