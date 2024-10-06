import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

  const navigate = useNavigate();

  const identificationNo = useRef(atob(id));

  return (
    <>
      <div className="pageTitle">Patient Details</div>
      <button onClick={() => navigate("/patient")}>Back</button>
      <div>
        <span>Identification No: </span>
        <span>{identificationNo.current}</span>
      </div>
      <PatientDetails />
      <PatientSessions />
      <PatientSessionRegister outletList={outletList} timeslotList={timeslotList}/>
    </>
  );
};

export default PatientManagement;
