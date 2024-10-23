import { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PatientDetails from "../components/PatientDetails";
import PatientSessions from "../components/PatientSessions";
import PatientSessionRegister from "../components/PatientSessionRegister";

type PatientManagementProp = {
  outletList: {
    id: string;
    outlet_name: string;
  }[];
  timeslotList: {
    id: string;
    start_time: string;
    end_time: string;
  }[];
};

const PatientManagement = ({
  outletList,
  timeslotList,
}: PatientManagementProp) => {
  const { id = "" } = useParams();
  const [registerForm, setRegisterForm] = useState(false);

  const navigate = useNavigate();

  const identificationNo = useRef(atob(id));

  return (
    <>
      <div className="pageTitle">Patient Details</div>
      <Button variant="outline" className="mr-4 mb-3" onClick={() => navigate("/patient")}>Back to previous page</Button>
      <Button variant="outline" onClick={() => setRegisterForm(true)}>Register Session</Button>
      <div>
        <span>Identification No: </span>
        <span>{identificationNo.current}</span>
      </div>
      <PatientDetails />
      <PatientSessions />
      {registerForm ? (
        <PatientSessionRegister
          outletList={outletList}
          timeslotList={timeslotList}
          setRegisterForm={setRegisterForm}
        />
      ) : null}
    </>
  );
};

export default PatientManagement;
