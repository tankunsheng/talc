import React from 'react';
const userContextValues = {
  text: 'test',
  setUser: (user) => {
    console.log(user);
  },
};
const UserContext = React.createContext(userContextValues);
export { UserContext };
const adminContextValues = {
  text: 'test',
  setUser: (user) => {
    console.log(user);
  },
};
const BusinessContext = React.createContext(adminContextValues);
export { BusinessContext };
