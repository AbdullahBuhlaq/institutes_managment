import InstituteRoleItem from "./InstituteRoleItem";
import AddInstituteRoleForm from "./AddInstituteRoleForm";
import EditInstituteRoleForm from "./EditInstituteRoleForm";
import { useState } from "react";
import requestOptions from "../../constants/requestOptions";
import permission from "../../constants/permission";
function InstituteRoles(props) {
  const [currentEdit, setCurrentEdit] = useState({});

  async function deleteInstituteRole(id) {
    const infoRequestOptions = {
      ...requestOptions,
      body: JSON.stringify({
        id: id,
      }),
    };
    const response = await fetch(`/admin-training/role/delete/${id}`, infoRequestOptions);
    const data = await response.json();
    delete props.instituteRole[data.role.id];
    props.setInstituteRoles({ ...props.instituteRole });
  }

  async function showEdit(instituteRole) {
    setCurrentEdit(instituteRole);
    // show
  }

  return (
    <>
      {Object.keys(props.instituteRoles).map((instituteRole, instituteRoleIndex) => {
        <InstituteRoleItem key={instituteRoleIndex} instituteRoleId={instituteRole} instituteRole={props.instituteRoles[instituteRole]} deleteInstituteRole={deleteInstituteRole} showEdit={showEdit} />;
      })}

      <AddInstituteRoleForm instituteRoles={props.instituteRoles} setInstituteRoles={props.setInstituteRoles} permission={permission} show={permission} />
      <EditInstituteRoleForm instituteRoless={props.instituteRoless} setInstituteRoles={props.setInstituteRoles} currentEdit={currentEdit} permission={permission} show={permission} />
    </>
  );
}

export default InstituteRoles;
