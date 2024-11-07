import {createContext, ReactNode, useContext, useEffect, useState} from 'react';

import {STORAGE_KEYS} from '@constants';
import {getData} from '@storage';

const UserLoginContext = createContext<UserLoginContextType | undefined>(
  undefined,
);

export const useUserLoginContext = () => {
  const context = useContext(UserLoginContext);
  if (!context) {
    throw new Error(
      'useUserLoginContext must be used within an UserLoginProvider',
    );
  }
  return context;
};

export const UserLoginProvider: React.FC<{children: ReactNode}> = ({
  children,
}) => {
  const [token, setToken] = useState<string>('');

  const fetchUsers = async () => {
    const token = await getData(STORAGE_KEYS.TOKEN);
    setToken(token || '');
  };
  
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UserLoginContext.Provider value={{token, setToken}}>
      {children}
    </UserLoginContext.Provider>
  );
};
