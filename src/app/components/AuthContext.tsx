// This context will be used for passing the authentication
// related value pass, whoever retouch the context need to be careful
// to not break the auth flow
import React from 'react';
import { IAuthContextType } from '../types';

const AuthContext = React.createContext<IAuthContextType | undefined>(
  undefined
);

export default AuthContext;
