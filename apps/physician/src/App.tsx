import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import { Toaster } from 'sonner';
import { AuthProvider, NotificationProvider, PhysicianProvider, ProtectRoute } from "@repo/common/common-library"
import AuthLayout from './pages/auth/authLayout';
import { LoginContainer, PermissionGate } from './pages';
import SideNav from './components/side-nav';
import { RoleConstant } from './utility';
import { DashboardContainer } from './pages/dashboard/container';

function App() {

  return (
    <>
      <ThemeProvider>
        <AuthProvider>
          <PhysicianProvider>
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
                        <SideNav/>
                      </ProtectRoute>
                    }
                  >
                    <Route
                      path='/dashboard'
                      element={
                        <ProtectRoute>
                          <PermissionGate
                            requiredPermission={[RoleConstant.patient.view]}
                          >
                            <DashboardContainer />
                          </PermissionGate>
                        </ProtectRoute>

                      }
                    />
                    {/* <Route
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
                    /> */}
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
            </NotificationProvider>
          </PhysicianProvider>
        </AuthProvider>
      </ThemeProvider>
    </>
  )
}

export default App
