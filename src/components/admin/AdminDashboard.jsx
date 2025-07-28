import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { currentUser, role, logout } = useAuth();

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        if (!currentUser || role !== 'admin') {
          navigate('/admin-login');
          return;
        }

        const querySnapshot = await getDocs(collection(db, 'properties'));
        const properties = querySnapshot.docs.map(doc => doc.data());

        setStats({
          total: properties.length,
          available: properties.filter(p => p.status === 'available').length,
          rented: properties.filter(p => p.status === 'rented').length,
          featured: properties.filter(p => p.featured).length
        });
      } catch (err) {
        console.error("Dashboard error:", err);
        setError(err.message || 'Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [currentUser, role, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/admin-login');
  };

  if (loading) {
    return <div className="admin-loading">Loading dashboard...</div>;
  }

  if (error) {
    return (
      <div className="admin-error">
        <h3>Dashboard Error</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Refresh</button>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </header>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Properties</h3>
          <p>{stats.total}</p>
        </div>
        <div className="stat-card">
          <h3>Available</h3>
          <p>{stats.available}</p>
        </div>
        <div className="stat-card">
          <h3>Rented</h3>
          <p>{stats.rented}</p>
        </div>
        <div className="stat-card">
          <h3>Featured</h3>
          <p>{stats.featured}</p>
        </div>
      </div>

      <div className="quick-actions">
        <button onClick={() => navigate('/admin/properties')} className="action-btn primary">
          Manage Properties
        </button>
        <button onClick={() => navigate('/admin/properties/add')} className="action-btn secondary">
          + Add New Property
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
