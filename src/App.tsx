import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import getCookie from "./utilities/getCookie";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./ProtectedRoute";
import LoginRoute from "./LoginRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import getRehabCenterData from "./api/getRehabCenterData";
import CreatePatient from "./pages/CreatePatient";
import PatientList from "./pages/PatientList";
import PatientManagement from "./pages/PatientManagement";

function App() {
  const [user, setUser] = useState(getCookie("accessToken"));
  const [outletList, setOutletList] = useState([]);
  const [timeslotList, setTimeslotList] = useState([]);

  useEffect(() => {
    if (user) {
      const rehabDataUponLogin = async () => {
        const rehabCenterData = await getRehabCenterData();
        if (rehabCenterData) {
          setOutletList(rehabCenterData.outlet_list);
          setTimeslotList(rehabCenterData.time_slot);
        }
      };
      rehabDataUponLogin();
    } else {
      setOutletList([]);
      setTimeslotList([]);
    }
  }, [user]);

  return (
    <SidebarProvider>
      {user ? <NavBar setUser={setUser} /> : null}
      {user ? <SidebarTrigger className="sidebarTrigger" /> : null}
      <div className={user ? "page" : ""}>
        <Routes>
          <Route element={<LoginRoute redirectPath="/" />}>
            <Route path={"/login"} element={<Login setUser={setUser} />} />
          </Route>
          <Route element={<ProtectedRoute redirectPath="/login" />}>
            <Route
              path={"/"}
              element={
                <Dashboard
                  outletList={outletList}
                  timeslotList={timeslotList}
                />
              }
            />
            <Route path={"/patient"} element={<PatientList />} />
            <Route path={"/patient/create"} element={<CreatePatient />} />
            <Route
              path={"/patient/:id"}
              element={
                <PatientManagement
                  outletList={outletList}
                  timeslotList={timeslotList}
                />
              }
            />
            <Route path={"/reports"} element={<Reports />} />
            <Route path="*" element={<p>Page not found 404</p>} />
          </Route>
        </Routes>
      </div>
    </SidebarProvider>
  );
}

export default App;
