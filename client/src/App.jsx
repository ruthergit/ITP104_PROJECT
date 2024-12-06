import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import React, { useState } from 'react';
import Employee from './pages/Employee';
import Project from './pages/Project';
import Department from './pages/Department';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';

// Simulate authentication state
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Public Route */}
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        
        {/* Protected Route */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <MainLayout />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route index element={<Employee />} />
          <Route path="/Project" element={<Project />} />
          <Route path="/Department" element={<Department />} />
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
