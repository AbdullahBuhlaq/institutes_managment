import { useState } from "react";
import Joi from "joi";
import validateForm from "../../../functions/validateForm";
import handleSave from "../../../functions/handleSave";
import requestOptions from "../../../constants/requestOptions";
import messages from "../../../constants/messages";
import PermissionItem from "../../general/PermissionItem";
import ShowItem from "../../general/ShowItem";
import NewInput from "../../general/NewInput";
import selectOptions from "../../../constants/selectOptions";
import PermissionGroup from "./PermissionGroup";

function AddRoleForm(props) {
  const [index, setIndex] = useState(1);
  const [duringAdd, setDuringAdd] = useState(false);

  const [role, setRole] = useState({
    name: "",
    show: [],
    permission: [],
  });

  const [roleErrors, setRoleErrors] = useState({});
  const roleSchema = {
    name: Joi.string().required().trim().messages(messages).label("اسم الدور"),
    show: Joi.array().items(Joi.string()).required().min(1).messages(messages).label("صلاحيات القراءة"),
    permission: Joi.array().items(Joi.string()).required().min(1).messages(messages).label("صلاحيات التعديل"),
  };
  const joiRole = Joi.object(roleSchema);

  async function addRole(event) {
    const newData = role;
    const infoRequestOptions = {
      ...requestOptions,
      headers: { ...requestOptions.headers, authorization: props.userInformation.token },
      body: JSON.stringify({
        ...role,
      }),
    };
    setDuringAdd(true);
    const response = await fetch(`${import.meta.env.VITE_URL}/${props.url}/create`, infoRequestOptions);
    const data = await response.json();
    if (data.success) {
      selectOptions.roles.push({ name: newData.name, value: newData.name });

      props.setRoles({ ...props.roles, [data.data]: { id: data.data, ...newData } });
      props.setCurrentEdit(false);
      props.toast.success("تمت إضافة الدور", {
        position: props.toast.POSITION.TOP_CENTER,
      });
    } else {
      console.log(data.error);
      props.toast.error(data.error, {
        position: props.toast.POSITION.TOP_CENTER,
      });
    }
    setDuringAdd(false);
  }

  return (
    <>
      <div className="tasks-wrapper">
        <form>
          <div className="row">
            <NewInput placeholder={"اسم الدور الجديد"} label={"اسم الدور"} type={"text"} name={"name"} onChange={handleSave} state={role} setState={setRole} errors={roleErrors} setErrors={setRoleErrors} schema={roleSchema} />
          </div>
        </form>

        <div className="header upcoming">صلاحيات التعديل</div>
        {Object.keys(props.permission).map((permissionGroup, permissionGroupIndex) => {
          return <PermissionGroup key={permissionGroupIndex} id={-1} index={index} currentEdit={props.currentEdit} setIndex={setIndex} permission={props.permission} permissionGroup={permissionGroup} permissionGroupIndex={permissionGroupIndex} role={role} setRole={setRole} roleErrors={roleErrors} setRoleErrors={setRoleErrors} roleSchema={roleSchema} />;
        })}
        {roleErrors["permission"] && <div className="validating-error">{roleErrors["permission"]}</div>}

        <div className="header upcoming">صلاحيات القراءة</div>
        {props.show.map((showItem, showIndex) => {
          return <ShowItem key={showIndex} id={-1} index={showIndex} showItem={showItem} role={role} setRole={setRole} roleErrors={roleErrors} setRoleErrors={setRoleErrors} roleSchema={roleSchema} />;
        })}
        {roleErrors["show"] && <div className="validating-error">{roleErrors["show"]}</div>}
      </div>

      <form>
        <div className="button-container">
          <button
            disabled={duringAdd}
            onClick={async (event) => {
              const isValid = await validateForm(event, joiRole, role, setRoleErrors);
              if (isValid) await addRole(event);
              else {
                props.toast.info("أدخل جميع المعلومات بشكل صحيح", {
                  position: props.toast.POSITION.TOP_CENTER,
                });
              }
            }}
          >
            إضافة
          </button>
        </div>
      </form>
    </>
  );
}

export default AddRoleForm;
