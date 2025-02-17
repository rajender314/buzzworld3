import { createContext, useMemo, useState } from 'react';
import { getLocalStorage } from '@app/core/localStorage/localStorage';

type AuthContextType = {
  userInfo: any;
  setUserInfo?: any;
};

type Props = {
  children: any;
};

export const AuthContext = createContext<AuthContextType>({
  userInfo: null,
});

/*  eslint "require-jsdoc": ["error", {
      "require": {
          "FunctionDeclaration": true,
          "ArrowFunctionExpression": true,
          "FunctionExpression": true
      }
}] */
/**
 * @return {void}
 */
export function AuthProvider({ children }: Props) {
  const storedUser: any = getLocalStorage('userPermission');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const [userInfo, setUserInfo] = useState<any>(user);
  // const value = { userInfo, setUserInfo };

  const value = useMemo(() => ({ userInfo, setUserInfo }), []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
