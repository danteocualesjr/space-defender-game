import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import Goals from './pages/Goals/Goals';
import Social from './pages/Social/Social';
import Pricing from './pages/Pricing/Pricing';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/Auth/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/goals" element={
            <ProtectedRoute>
              <Layout>
                <Goals />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/social" element={
            <ProtectedRoute>
              <Layout>
                <Social />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/pricing" element={
            <Layout>
              <Pricing />
            </Layout>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;