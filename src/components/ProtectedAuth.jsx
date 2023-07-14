import { useContext } from 'react';
import { CreateContext } from './CreateContext';

const ProtectedAuth = () => {
  const { state, dispatch } = useContext(CreateContext);
  const { user } = state;

  const handleLogout = () => {
    //logic for logout
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <div>
      {user.utpe === 'User' && (
        {/* Render admin-specific content */}
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default ProtectedAuth;
