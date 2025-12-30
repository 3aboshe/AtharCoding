import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, ToastContainer } from './contexts/AppContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Navbar } from './components/layout';
import { HomePage, LevelPage, TaskPage, LoginPage, RegisterPage } from './pages';
import {
  AdminLayout,
  AdminDashboard,
  CoursesManagement,
  CourseEditor,
  UsersManagement
} from './pages/admin';
import { PageLoading } from './components/ui';

// Protected Route wrapper
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <PageLoading />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

// Admin Route wrapper
function AdminRoute({ children }: { children: React.ReactNode }) {
  const { isAdmin, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <PageLoading />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={
        isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />
      } />
      <Route path="/register" element={
        isAuthenticated ? <Navigate to="/" replace /> : <RegisterPage />
      } />

      {/* Protected routes */}
      <Route path="/" element={
        <ProtectedRoute>
          <Navbar />
          <HomePage />
        </ProtectedRoute>
      } />
      <Route path="/levels" element={<Navigate to="/" replace />} />
      <Route path="/level/:levelId" element={
        <ProtectedRoute>
          <Navbar />
          <LevelPage />
        </ProtectedRoute>
      } />
      <Route path="/task/:taskId" element={
        <ProtectedRoute>
          <Navbar />
          <TaskPage />
        </ProtectedRoute>
      } />

      {/* Admin routes */}
      <Route path="/admin" element={
        <AdminRoute>
          <AdminLayout />
        </AdminRoute>
      }>
        <Route index element={<AdminDashboard />} />
        <Route path="courses" element={<CoursesManagement />} />
        <Route path="courses/:id" element={<CourseEditor />} />
        <Route path="users" element={<UsersManagement />} />
        <Route path="settings" element={
          <div className="p-8">
            <h1 className="font-display font-bold text-3xl text-white">Settings</h1>
            <p className="text-gray-400 mt-2">Platform settings coming soon...</p>
          </div>
        } />
      </Route>

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function AppContent() {
  return (
    <>
      <AppRoutes />
      <ToastContainer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <div className="min-h-screen bg-gradient-deep">
            <AppContent />
          </div>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
