//import libraries
import React, { createContext, useReducer, useState } from 'react';
const initialState = {
  user: null,
};
//context
const CreateContext = createContext(initialState);

//login means auth is true 
const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: {
          ...action.payload,
          isAuthenticated: true,
        }
      };
    //if not it becomes null
    case 'LOGOUT':
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
};

//contsins all child routes
const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  return (
    <CreateContext.Provider value={{ state, dispatch }}>
      {children}
    </CreateContext.Provider>
  );
};

export { CreateContext, UserProvider };
