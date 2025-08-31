import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.js';
import ErrorBoundary from './components/Navbar/ErrorBoundary.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import Home from './pages/Home.jsx';
import Properties from './pages/Properties.jsx';
import PropertyDetails from './pages/PropertyDetails.jsx';
import Contact from './pages/Contact.jsx';
import About from './pages/About.jsx';
import NotFound from './pages/NotFound.js';
import ErrorPage from './pages/ErrorPage.js';
import './styles/variables.css';
import './styles/main.css';
import { init } from '@emailjs/browser';

// Admin stuff
import AdminLogin from './components/admin/AdminLogin';
import ProtectedRoute from './components/admin/ProtectedRoute';
import PropertyList from './components/admin/Propertylist.jsx';
import PropertyForm from './components/admin/PropertyForm';
import AdminDashboard from './components/admin/AdminDashboard';

init('YOUR_PUBLIC_KEY');

class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("App Error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return <ErrorPage error={this.state.error} onReset={this.handleReset} />;
    }
    return this.props.children;
  }
}

function App() {
  return (
    <React.StrictMode>
      <AppErrorBoundary>
        <AuthProvider>
          <Router>
            <div className="app">
              <Navbar />
              <main>
                <ErrorBoundary>
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/properties" element={<Properties />} />
                    <Route path="/properties/:id" element={<PropertyDetails />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/about" element={<About />} />

                    {/* Admin Routes */}
                    <Route path="/admin-login" element={<AdminLogin />} />
                    <Route 
                      path="/admin"
                      element={
                        <ProtectedRoute adminOnly={true}>
                          <AdminDashboard />
                        </ProtectedRoute>
                      }
                    >
                      <Route index element={<Navigate to="dashboard" replace />} />
                      <Route path="dashboard" element={<AdminDashboard />} />
                      <Route path="properties" element={<PropertyList />} />
                      <Route path="properties/add" element={<PropertyForm />} />
                      <Route path="properties/edit/:id" element={<PropertyForm />} />
                    </Route>

                    {/* Fallback */}
                    <Route path="/error" element={<ErrorPage />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </ErrorBoundary>
              </main>
              <Footer />
            </div>
          </Router>
        </AuthProvider>
      </AppErrorBoundary>
    </React.StrictMode>
  );
}

export default App;
