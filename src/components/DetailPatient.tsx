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
  setDetailID: (Status: string) => void;
};

const DetailPatient = ({ outletList, timeslotList, setDetailID }: PatientManagementProp) => {
  return <div>DetailPatient</div>;
};

export default DetailPatient;
// Detail page
//TODO: edit patient
//TODO: list patient's session
//TODO: register a session
//TODO: update attendance
