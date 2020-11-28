// This context will be used for passing the authentication
// related value pass, whoever retouch the context need to be careful
// to not break the auth flow
import React from 'react';
import { IAuthContextType } from '../types';

const DefaultPromise = (_data: string) =>
  new Promise<void>(() => {
    return null;
  });

const AuthContext = React.createContext<IAuthContextType>({
  signIn: DefaultPromise,
  signOut: () => {},
});

export default AuthContext;
