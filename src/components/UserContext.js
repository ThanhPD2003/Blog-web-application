import { createContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState(sessionStorage.getItem('userEmail'));

  const loginUser = (email) => {
    setUserEmail(email);
  };

  const logoutUser = () => {
    setUserEmail(null);
    sessionStorage.removeItem('userEmail');
  };

  return (
    <UserContext.Provider value={{ userEmail, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
