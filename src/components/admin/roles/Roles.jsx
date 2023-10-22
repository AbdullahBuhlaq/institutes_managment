import { useEffect, useState } from "react";
import RoleItem from "./RoleItem";
import RoleName from "./RoleName";
import AddRoleForm from "./AddRoleForm";
import permission from "../../../constants/permission";
import { adminPermission } from "../../../constants/permission";
import searchOptions from "../../../constants/searchOptions";
import selectOptions from "../../../constants/selectOptions";
import requestOptions from "../../../constants/requestOptions";
import compare from "../../../functions/compare";
import checkPermissions from "../../../functions/checkPermissions";

function Roles(props) {
  const url = props.type == "admin-site" ? "admin-site/roles" : "admin-training/role";
  const [currentEdit, setCurrentEdit] = useState(false);
  const [addNew, setAddNew] = useState(false);

  useEffect(() => {
    currentEdit ? props.setCurrentRole(currentEdit) : setAddNew(true);
  }, [currentEdit]);

  const [items, setItems] = useState([]);
  useEffect(() => {
    const populateArray = async () => {
      const newArr = await Promise.all(
        Object.keys(props.roles).map(async (role, roleIndex) => {
          const isTrue = await compare(searchOptions["roles"][props.search.field], props.search.operator, props.roles[role][props.search.field], props.search.word);
          if (isTrue) {
            return <RoleName key={roleIndex} role={props.roles[role]} currentEdit={currentEdit} setCurrentEdit={setCurrentEdit} setAddNew={setAddNew} />;
          }
        })
      );
      setItems([...newArr]);
    };

    populateArray();
  }, [props.search, props.roles, currentEdit]);

  useEffect(() => {
    setCurrentEdit(false);
  }, [props.search]);

  async function deleteRole(id) {
    const response = await fetch(`${process.env.REACT_APP_URL_STRING}/${url}/delete/${id}`, { ...requestOptions, headers: { ...requestOptions.headers, authorization: props.userInformation.token }, method: "delete" });
    const data = await response.json();
    // const data = { success: true };
    if (data.success) {
      delete props.roles[id];
      Object.keys(props.employees).map((employee) => {
        if (props.employees[employee].roleId == id) {
          delete props.employees[employee];
        }
      });
      props.setEmployees({ ...props.employees });
      props.setRoles({ ...props.roles });
      setCurrentEdit(props.roles[Object.keys(props.roles)[0]]);
      props.toast.success("تم حذف الدور", {
        position: props.toast.POSITION.TOP_CENTER,
      });
    } else {
      console.log(data.error);
      props.toast.error(data.error, {
        position: props.toast.POSITION.TOP_CENTER,
      });
    }
  }

  return (
    <>
      <div className="page-content">
        <div className="main-header-line">
          <h1 className="top-title">الأدوار</h1>
          <div className="action-buttons">
            <button
              className="open-right-area"
              onClick={() => {
                props.setRightShow(!props.rightShow);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-activity">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            </button>
            <button
              className="menu-button"
              onClick={() => {
                props.setLeftShow(!props.leftShow);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
        <div className="content-categories">
          {items.map((item) => {
            return item;
          })}
          {checkPermissions(props.userInformation, ["admin.role.add", "admin.role.all"], [], -1) && (
            <div
              className="label-wrapper"
              onClick={() => {
                setCurrentEdit(false);
                props.setCurrentRole(false);
                setAddNew(true);
              }}
            >
              <input className={"nav-item" + (addNew ? " current-role" : "")} id={"optaddnew"} name="nav" type="radio" />
              <label className="category" htmlFor={"optaddnew"}>
                + دور جديد
              </label>
            </div>
          )}
        </div>

        {currentEdit && <RoleItem toast={props.toast} currentEdit={currentEdit} deleteRole={deleteRole} roles={props.roles} setRoles={props.setRoles} permission={adminPermission} show={props.type == "admin-site" ? selectOptions.show : selectOptions.showIns} url={url} userInformation={props.userInformation} />}
        {addNew && <AddRoleForm toast={props.toast} roles={props.roles} setRoles={props.setRoles} permission={adminPermission} show={props.type == "admin-site" ? selectOptions.show : selectOptions.showIns} url={url} setCurrentEdit={setCurrentEdit} userInformation={props.userInformation} />}
      </div>
    </>
  );
}

export default Roles;
