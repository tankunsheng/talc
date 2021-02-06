import React from 'react';
const defaultContextValues = {
  text: 'test',
  setUser: (user) => {
    console.log(user);
  },
};
const AppContext = React.createContext(defaultContextValues);
export { AppContext };
