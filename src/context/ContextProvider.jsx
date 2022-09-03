import AuthContext from './context';
import { useState } from 'react';

const ContextProvider = ({ children }) => {
  const [token, setToken] = useState('')
  
  return (
    <AuthContext.Provider value={ { token, setToken, afterRegisterMessage: '' }}>
      {children}
    </AuthContext.Provider>
  )
}

export default ContextProvider