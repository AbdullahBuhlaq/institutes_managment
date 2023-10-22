import { useEffect, useState } from "react";
import Joi from "joi";
import validateForm from "../../../functions/validateForm";
import requestOptions from "../../../constants/requestOptions";
import messages from "../../../constants/messages";
import PermissionItem from "../../general/PermissionItem";
import ShowItem from "../../general/ShowItem";
import PermissionGroup from "./PermissionGroup";
import checkPermissions from "../../../functions/checkPermissions";

function RoleItem(props) {
  const [index, setIndex] = useState(1);
  const [duringAdd, setDuringAdd] = useState(false);

  const [role, setRole] = useState({
    name: props.currentEdit.name,
    show: props.currentEdit.show,
    permission: props.currentEdit.permission,
  });

  useEffect(() => {
    setRole({ name: props.currentEdit.name, show: props.currentEdit.show, permission: props.currentEdit.permission });
  }, [props.currentEdit]);

  const [roleErrors, setRoleErrors] = useState({});
  const roleSchema = {
    name: Joi.string().required().trim().messages(messages).label("اسم الدور"),
    show: Joi.array().items(Joi.string()).required().min(1).messages(messages).label("صلاحيات القراءة"),
    permission: Joi.array().items(Joi.string()).required().min(1).messages(messages).label("صلاحيات التعديل"),
  };
  const joiRole = Joi.object(roleSchema);

  async function editRole(event) {
    const newData = role;
    const id = props.currentEdit.id;
    const infoRequestOptions = {
      ...requestOptions,
      headers: { ...requestOptions.headers, authorization: props.userInformation.token },
      method: "put",
      body: JSON.stringify({
        ...role,
      }),
    };
    setDuringAdd(true);
    const response = await fetch(`${import.meta.env.VITE_URL}/${props.url}/update/${id}`, infoRequestOptions);
    const data = await response.json();
    if (data.success) {
      props.setRoles({ ...props.roles, [id]: { id: id, ...newData } });
      props.toast.success("تم تعديل الدور ", {
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
        <div className="header">صلاحيات التعديل</div>
        {Object.keys(props.permission).map((permissionGroup, permissionGroupIndex) => {
          return <PermissionGroup key={permissionGroupIndex} index={index} currentEdit={props.currentEdit} setIndex={setIndex} permission={props.permission} permissionGroup={permissionGroup} permissionGroupIndex={permissionGroupIndex} role={role} setRole={setRole} roleErrors={roleErrors} setRoleErrors={setRoleErrors} roleSchema={roleSchema} />;
        })}
        {roleErrors["permission"]}

        <div className="header upcoming">صلاحيات القراءة</div>
        {props.show.map((showItem, showIndex) => {
          return <ShowItem key={showIndex} id={props.currentEdit.id} index={showIndex} showItem={showItem} role={role} setRole={setRole} roleErrors={roleErrors} setRoleErrors={setRoleErrors} roleSchema={roleSchema} />;
        })}
      </div>
      {roleErrors["show"]}
      <form>
        <div className="button-container">
          {checkPermissions(props.userInformation, ["admin_training.subject.update", "admin_training.subject.all"], [], -1) && (
            <button
              disabled={duringAdd}
              onClick={async (event) => {
                const isValid = await validateForm(event, joiRole, role, setRoleErrors);
                if (isValid) await editRole(event);
                else {
                  props.toast.info("أدخل جميع المعلومات بشكل صحيح", {
                    position: props.toast.POSITION.TOP_CENTER,
                  });
                }
              }}
            >
              حفظ التعديل
            </button>
          )}
          {checkPermissions(props.userInformation, ["admin_training.subject.delete", "admin_training.subject.all"], [], -1) && (
            <button
              disabled={duringAdd}
              onClick={async (event) => {
                event.preventDefault();
                props.deleteRole(props.currentEdit.id);
              }}
            >
              حذف
            </button>
          )}
        </div>
      </form>
    </>
  );
}

export default RoleItem;
