import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import SideNav from './components/side-nav';
import { ThemeProvider } from './components/theme-provider';
import { AuthProvider, PatientDocumentsContainer, NotificationProvider, PatientNotesContainer, PatientProvider, ProtectRoute } from '@repo/common/common-library';
import { AccountCreated, LoginContainer, PatientInBoundContainer, PermissionGate } from './pages';
import AuthLayout from './pages/auth/authLayout';
import { RoleConstant } from './utility';
import { Toaster } from 'sonner';
import { AuthSteps } from './pages/auth/stepper/stepper-container';

function App() {

  return (
    <>
      <ThemeProvider>
        <AuthProvider>
          <PatientProvider>
            <NotificationProvider>
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
                    <Route
                      path='/patient-signup'
                      element={<AuthSteps />}
                    />
                  </Route>
                  <Route path='/'
                    element={
                      <ProtectRoute>
                        <SideNav />
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
                      path='/documents'
                      element={
                        <ProtectRoute>
                          <PermissionGate
                            requiredPermission={[RoleConstant.patient.view]}
                          >
                            <PatientDocumentsContainer />
                          </PermissionGate>
                        </ProtectRoute>
                      }
                    />
                    <Route
                      path='/inBound'
                      element={
                        <ProtectRoute>
                          <PermissionGate
                            requiredPermission={[RoleConstant.patient.view]}
                          >
                            <PatientInBoundContainer />
                          </PermissionGate>
                        </ProtectRoute>

                      }
                    />
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
                  </Route>
                  <Route
                      path='/account-created'
                      element={<AccountCreated />}
                  />
                </Routes>
              </Router>
            </NotificationProvider>
          </PatientProvider>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
