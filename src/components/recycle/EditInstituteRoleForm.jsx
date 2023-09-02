import { useState } from "react";
import Joi from "joi";
import Input from "./Input";
import validateForm from "../functions/validateForm";
import handleSave from "../functions/handleSave";
import requestOptions from "../constants/requestOptions";
import messages from "../constants/messages";

function EditInstituteRoleForm(props) {
  const [duringAdd, setDuringAdd] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [instituteRole, setInstituteRole] = useState({
    name: props.currentEdit.name,
    show: props.currentEdit.show,
    permission: props.currentEdit.permission,
  });

  const [instituteRoleErrors, setInstituteRoleErrors] = useState({});
  const instituteRoleSchema = {
    name: Joi.string().required().trim().messages(messages).label("اسم الدور"),
    show: Joi.array().items(Joi.string()).required().min(1).messages(messages).label("ما يمكنه رؤيته"),
    permission: Joi.array().items(Joi.string()).required().min(1).messages(messages).label("السماحيات"),
  };
  const joiInstituteRole = Joi.object(instituteRoleSchema);

  async function editInstituteRole(event) {
    const isValid = await validateForm(event, joiInstituteRole, instituteRole, setInstituteRoleErrors);
    if (isValid) {
      setErrorMessage("");
      const infoRequestOptions = {
        ...requestOptions,
        body: JSON.stringify({
          ...instituteRole,
        }),
      };
      setDuringAdd(true);
      const response = await fetch(`/admin-training/role/update/${props.currentEdit.id}`, infoRequestOptions);
      const data = await response.json();
      if (data.result) props.setInstituteRoles({ ...props.roles, [data.instituteRole.id]: data.instituteRole });
      else setErrorMessage(data.error);
      setDuringAdd(false);
    } else {
      setErrorMessage("Form is Not Correct");
    }
  }

  return (
    <>
      {errorMessage ? <div>Form is Not Correct</div> : null}
      <div className="addrole">
        <Input label={""} type={"text"} name={"name"} onChange={handleSave} state={instituteRole} setState={setInstituteRole} errors={instituteRoleErrors} setErrors={setInstituteRoleErrors} schema={instituteRoleSchema} />
        <select
          onChange={async (event) => {
            await handleSave({ target: { name: "permission", value: [...instituteRole.permission, event.target.value] } }, instituteRole, setInstituteRole, instituteRoleErrors, setInstituteRoleErrors, instituteRoleSchema);
          }}
        >
          <option value="">select permission ...</option>
          {Object.keys(props.permission).map((permissionItem, permissionIndex) => {
            if (!instituteRole.permission.includes(props.permission[permissionItem].name))
              return (
                <option key={permissionIndex} value={props.permission[permissionItem].name}>
                  {props.permission[permissionItem].name}
                </option>
              );
            else return null;
          })}
        </select>
        <div>
          {instituteRole.permission.map((perm, permIndex) => {
            return (
              <div
                key={permIndex}
                onClick={() => {
                  instituteRole.permission.splice(instituteRole.permission.indexOf(perm), 1);
                  setInstituteRole({ ...instituteRole });
                }}
              >
                {perm}
              </div>
            );
          })}
        </div>
        {instituteRoleErrors["permission"]}
        <select
          onChange={async (event) => {
            await handleSave({ target: { name: "show", value: [...instituteRole.show, event.target.value] } }, instituteRole, setInstituteRole, instituteRoleErrors, setInstituteRoleErrors, instituteRoleSchema);
          }}
        >
          <option value="">select show ...</option>
          {Object.keys(props.show).map((showItem, showIndex) => {
            if (!instituteRole.show.includes(props.show[showItem].name))
              return (
                <option key={showIndex} value={props.show[showItem].name}>
                  {props.show[showItem].name}
                </option>
              );
            else return null;
          })}
        </select>
        <div>
          {instituteRole.show.map((sh, shIndex) => {
            return (
              <div
                key={shIndex}
                onClick={() => {
                  instituteRole.show.splice(instituteRole.show.indexOf(sh), 1);
                  setInstituteRole({ ...instituteRole });
                }}
              >
                {sh}
              </div>
            );
          })}
        </div>
        {instituteRoleErrors.show}
        <button
          onClick={async (event) => {
            const isValid = await validateForm(event, joiInstituteRole, instituteRole, setInstituteRoleErrors);
            isValid && (await editInstituteRole(event));
          }}
        ></button>
      </div>
    </>
  );
}

export default EditInstituteRoleForm;
