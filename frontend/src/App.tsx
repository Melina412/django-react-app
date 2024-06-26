import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import Fallback from './components/error/Fallback';

function Logout() {
  localStorage.clear();
  console.log('local storage cleared, redirecting to login');
  return <Navigate to='/login' />;
}

// nach register local storage leeren um fehler durch abgelaufene access token zu vermeiden
function RegisterAndLogout() {
  localStorage.clear();
  console.log('local storage cleared, redirecting to register');
  return <Register />;
}

function App() {
  return (
    <ErrorBoundary FallbackComponent={Fallback}>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/register' element={<RegisterAndLogout />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
