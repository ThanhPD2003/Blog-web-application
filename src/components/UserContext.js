import { createContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState(sessionStorage.getItem('userEmail'));
  const [userId, setUserId] = useState(sessionStorage.getItem('userId'));
  const [roleId, setRoleId] = useState(parseInt(sessionStorage.getItem('roleId'))); // Parse roleId as an integer

  const loginUser = (email, id, roleId) => {
    setUserEmail(email);
    setUserId(id);
    setRoleId(roleId);
  };

  const logoutUser = () => {
    setUserEmail(null);
    setUserId(null);
    setRoleId(null);
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('roleId');
  };

  return (
    <UserContext.Provider value={{ userEmail, userId, roleId, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;