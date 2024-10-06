import { useState } from "react";
import PatientList from "../components/PatientList";
import DetailPatient from "../components/DetailPatient";

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
  const [detailID, setDetailID] = useState("");

  return (
    <>
      <div className="pageTitle">Patient Management</div>
      {detailID == "" ? (
        <PatientList setDetailID={setDetailID} />
      ) : (
        <DetailPatient
          outletList={outletList}
          timeslotList={timeslotList}
          detailID={detailID}
          setDetailID={setDetailID}
        />
      )}
    </>
  );
};

export default PatientManagement;
