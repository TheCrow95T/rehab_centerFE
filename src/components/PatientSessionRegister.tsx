import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import registerSession from "../api/registerSession";
import "./PatientSessionRegister.css";

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
  setRegisterForm: (Status: boolean) => void;
};

const PatientSessionRegister = ({
  outletList,
  timeslotList,
  setRegisterForm,
}: PatientManagementProp) => {
  const { id = "" } = useParams();
  const [outletId, setOutletId] = useState("1");
  const [timeslotId, setTimeSlotId] = useState("1");
  const [treatmentDate, setTreatmentDate] = useState("YYYY-MM-DD");

  const identificationNo = useRef(atob(id));

  useEffect(() => {
    const today = new Date();
    const todayDate = new Date(today).toISOString().split("T")[0];
    setTreatmentDate(todayDate);
  }, []);

  const savePatientChange = async () => {
    const result = await registerSession(
      identificationNo.current,
      outletId,
      timeslotId,
      treatmentDate,
    );

    if (
      result.message == "Patient register attendance success" ||
      result.message == "This patient has register today!" ||
      result.message == "This patient has reach weekly limit!" ||
      result.message == "Busy time slot, try another time slot!"
    ) {
      alert(result.message);
    } else {
      alert("Failed to register");
    }
  };

  return (
    <div className="popUpForm">
      <div className="pageTitle">Register Session</div>
      <form className="popUpFormContent">
        <label>Outlet Name:</label>
        <select
          id="groupName"
          name="groupName"
          value={outletId}
          onChange={(e) => setOutletId(e.target.value)}
          required
        >
          {outletList.map((outlet) => {
            return (
              <option key={outlet.id + outlet.outlet_name} value={outlet.id}>
                {outlet.outlet_name}
              </option>
            );
          })}
        </select>
        <label>Treatment Date:</label>
        <input
          type="date"
          value={treatmentDate}
          onChange={(e) => setTreatmentDate(e.target.value)}
          required
        />
        <label>Time Slot:</label>
        <select
          id="groupName"
          name="groupName"
          value={timeslotId}
          onChange={(e) => setTimeSlotId(e.target.value)}
          required
        >
          {timeslotList.map((timeslot) => {
            return (
              <option
                key={timeslot.id + timeslot.start_time}
                value={timeslot.id}
              >
                {timeslot.start_time + " - " + timeslot.end_time}
              </option>
            );
          })}
        </select>
        <div className="button_section">
          <button type="button" onClick={() => savePatientChange()}>
            Create
          </button>
          <button type="button" onClick={() => setRegisterForm(false)}>
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientSessionRegister;
