import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import SideNav from './components/side-nav';
import { ThemeProvider } from './components/theme-provider';
import { AuthProvider, PatientDocumentsContainer, NotificationProvider, PatientNotesContainer, PatientProvider, ProtectRoute, PatientClinicalConditionsContainer } from '@repo/common/common-library';
import { LoginContainer, PatientInBoundContainer, PatientOutBoundContainer, PatientRxArchiveContainer, PermissionGate } from './pages';
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
                      path='/outBound'
                      element={
                        <ProtectRoute>
                          <PermissionGate
                            requiredPermission={[RoleConstant.patient.view]}
                          >
                            <PatientOutBoundContainer />
                          </PermissionGate>
                        </ProtectRoute>

                      }
                    />
                    <Route
                      path='/rxArchive'
                      element={
                        <ProtectRoute>
                          <PermissionGate
                            requiredPermission={[RoleConstant.patient.view]}
                          >
                            <PatientRxArchiveContainer />
                          </PermissionGate>
                        </ProtectRoute>

                      }
                    />
                    <Route
                      path='/clinical-conditions'
                      element={
                        <ProtectRoute>
                          <PermissionGate
                            requiredPermission={[RoleConstant.patient.view]}
                          >
                            <PatientClinicalConditionsContainer />
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
