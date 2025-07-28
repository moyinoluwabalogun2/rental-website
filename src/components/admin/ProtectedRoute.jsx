import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ adminOnly = false }) => {
  const { currentUser, userData, loading, authChecked } = useAuth();

  // Wait for Firebase Auth + Firestore role to load
  if (!authChecked || loading) {
    return (
      <div className="protected-loading">
        <p>Loading...</p>
      </div>
    );
  }

  // If not logged in, send to login
  if (!currentUser) {
    return <Navigate to="/admin-login" replace />;
  }

  // If adminOnly is true and user is not admin, block access
  if (adminOnly && userData?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  // Otherwise, show the protected route
  return <Outlet />;
};

export default ProtectedRoute;
