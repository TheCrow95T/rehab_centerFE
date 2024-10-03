import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import './App.css'

import getCookie from "./utilities/getCookie";
import NavBar from './components/NavBar';
import ProtectedRoute from './ProtectedRoute';
import LoginRoute from './LoginRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PatientManagement from './pages/PatientManagement';
import Reports from './pages/Reports';

function App() {
  const [user, setUser] = useState(getCookie("accessToken"));

  return (
    <>
      <div className={user ? "main" : ""}>
        {user ? <NavBar setUser={setUser} /> : null}
        <div className={user ? "page" : ""}>
          <Routes>
            <Route element={<LoginRoute  redirectPath="/" />}>
              <Route path={"/login"} element={<Login setUser={setUser} />} />
            </Route>
            <Route
              element={<ProtectedRoute  redirectPath="/login" />}
            >
              <Route path={"/"} element={<Dashboard />} />
              <Route path={"/patient"} element={<PatientManagement />} />
              <Route path={"/reports"} element={<Reports />} />
              <Route path="*" element={<p>Page not found 404</p>} />
            </Route>
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
