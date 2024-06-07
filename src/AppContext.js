import React, { createContext, useState } from 'react';
export const AppContext = createContext();


export const AppProvider = ({ children }) => {
  const [state, setState] = useState({

    user: null,
    isAuthenticated: false,
    formData:{}
  });

  const login = (user) => {
    setState({
      ...state,
      user,
      isAuthenticated: true,
    });
  };

  const logout = () => {
    setState({
      ...state,
      user: null,
      isAuthenticated: false,
    });
  };

  const setFormData = (data) => {
    setState({
      ...state,
      formData: data,
    });
  };

  return (
    <AppContext.Provider value={{ state, login, logout,setFormData }}>
      {children}
    </AppContext.Provider>
  );
};
