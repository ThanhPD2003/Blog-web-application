import { createContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState(sessionStorage.getItem('userEmail'));
  const [userId, setUserId] = useState(sessionStorage.getItem('userId'));

  const loginUser = (email, id) => {
    setUserEmail(email);
    setUserId(id);
  };

  const logoutUser = () => {
    setUserEmail(null);
    setUserId(null);
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('userId');
  };

  return (
    <UserContext.Provider value={{ userEmail, userId, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
