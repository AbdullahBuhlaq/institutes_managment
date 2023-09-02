import { useState } from "react";
import Joi from "joi";
import Input from "../Input";
import validateForm from "../../functions/validateForm";
import handleSave from "../../functions/handleSave";
import requestOptions from "../../constants/requestOptions";
import messages from "../../constants/messages";

function EditRoleForm(props) {
  const [duringAdd, setDuringAdd] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [role, setRole] = useState({
    name: props.currentEdit.name ? props.currentEdit.name : "",
    show: props.currentEdit.show ? props.currentEdit.show : [],
    permission: props.currentEdit.permission ? props.currentEdit.permission : [],
  });
  const [roleErrors, setRoleErrors] = useState({});
  const roleSchema = {
    name: Joi.string().required().trim().messages(messages).label("اسم الدور"),
    show: Joi.array().items(Joi.string()).required().min(1).messages(messages).label("ما يمكنه رؤيته"),
    permission: Joi.array().items(Joi.string()).required().min(1).messages(messages).label("السماحيات"),
  };
  const joiRole = Joi.object(roleSchema);

  async function editRole(event) {
    const isValid = await validateForm(event, joiRole, role, setRoleErrors);
    if (isValid) {
      const newData = role;
      setErrorMessage("");
      const infoRequestOptions = {
        ...requestOptions,
        body: JSON.stringify({
          ...role,
        }),
      };
      setDuringAdd(true);
      const response = await fetch(`http://localhost:3001/admin-site/roles/update/${props.currentEdit.id}`, infoRequestOptions);
      const data = await response.json();
      if (data.success) {
        props.setRoles({ ...props.roles, [data.id]: newData });
      } else {
        console.log(data.error);
        setErrorMessage("عذرا, حدث خطأ في السيرفر");
      }
      setDuringAdd(false);
    } else {
      setErrorMessage("Form is Not Correct");
    }
  }

  return (
    <>
      {errorMessage ? <div>Form is Not Correct</div> : null}
      <div className="addrole">
        <Input label={"اسم المركز"} type={"text"} name={"name"} onChange={handleSave} state={role} setState={setRole} errors={roleErrors} setErrors={setRoleErrors} schema={roleSchema} />

        <select
          onChange={async (event) => {
            await handleSave({ target: { name: "permission", value: [...role.permission, event.target.value] } }, role, setRole, roleErrors, setRoleErrors, roleSchema);
          }}
        >
          <option value="">select permission ...</option>
          {Object.keys(props.permission).map((permissionItem, permissionIndex) => {
            if (!role.permission.includes(props.permission[permissionItem].name))
              return (
                <option key={permissionIndex} value={props.permission[permissionItem].name}>
                  {props.permission[permissionItem].name}
                </option>
              );
            else return null;
          })}
        </select>
        <div>
          {role.permission.map((perm, permIndex) => {
            return (
              <div
                key={permIndex}
                onClick={() => {
                  role.permission.splice(role.permission.indexOf(perm), 1);
                  setRole({ ...role });
                }}
              >
                {perm}
              </div>
            );
          })}
        </div>
        {roleErrors["permission"]}
        <select
          onChange={async (event) => {
            await handleSave({ target: { name: "show", value: [...role.show, event.target.value] } }, role, setRole, roleErrors, setRoleErrors, roleSchema);
          }}
        >
          <option value="">select show ...</option>
          {Object.keys(props.show).map((showItem, showIndex) => {
            if (!role.show.includes(props.show[showItem].name))
              return (
                <option key={showIndex} value={props.show[showItem].name}>
                  {props.show[showItem].name}
                </option>
              );
            else return null;
          })}
        </select>
        <div>
          {role.show.map((sh, shIndex) => {
            return (
              <div
                key={shIndex}
                onClick={() => {
                  role.show.splice(role.show.indexOf(sh), 1);
                  setRole({ ...role });
                }}
              >
                {sh}
              </div>
            );
          })}
        </div>
        {roleErrors.show}
        <button
          onClick={async (event) => {
            const isValid = await validateForm(event, joiRole, role, setRoleErrors);
            isValid && (await editRole(event));
          }}
        ></button>
      </div>
    </>
  );
}

export default EditRoleForm;
