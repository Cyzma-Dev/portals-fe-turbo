import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import SideNav from './components/side-nav';
import { ThemeProvider } from './components/theme-provider';
import { AuthProvider, PatientNotesContainer, PatientProvider, ProtectRoute } from '@repo/common/common-library';
import { LoginContainer, PermissionGate } from './pages';
import AuthLayout from './pages/auth/authLayout';
import { RoleConstant } from './utility';
import { PatientMessagesContainer } from './pages/patient-messages/container';
import { Toaster } from 'sonner';

function App() {

  return (
    <>
      <ThemeProvider>
        <AuthProvider>
          <PatientProvider>
            <Toaster />
            <Router>
              <Routes>
                <Route
                  path='/'
                  element={<AuthLayout />}
                >
                  <Route
                    index
                    element={
                      <Navigate
                        to='/login'
                        replace
                      />
                    }
                  />
                  <Route
                    path='/login'
                    element={<LoginContainer />}
                  />
                </Route>
                <Route path='/' 
                  element={
                    <ProtectRoute>
                      <SideNav/>
                    </ProtectRoute>
                  }
                >
                  <Route
                    path='/patient-notes'
                    element={
                      <ProtectRoute>
                        <PermissionGate
                          requiredPermission={[RoleConstant.patient.view]}
                        >
                          <PatientNotesContainer />
                        </PermissionGate>
                      </ProtectRoute>

                    }
                  />
                  <Route
                    path='/patient-messages'
                    element={
                      <ProtectRoute>
                        <PermissionGate
                          requiredPermission={[RoleConstant.patient.view]}
                        >
                          <PatientMessagesContainer />
                        </PermissionGate>
                      </ProtectRoute>

                    }
                  />
                  {/* <Route
                path='/account-info'
                element={<AccountInfo/>}
              />
              <Route
                path='/messages'
                element={<Messages/>}
              /> */}
                </Route>
              </Routes>
            </Router>
          </PatientProvider>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
