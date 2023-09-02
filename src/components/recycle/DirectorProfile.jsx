import { useState } from "react";
import EditDirectorForm from "./EditDirectorForm";

function DirectorProfile(props) {
  const [edit, setEdit] = useState(false);
  return <>{edit && <EditDirectorForm institute={props.institute} setInstitute={props.setInstitute} />}</>;
}

export default DirectorProfile;
