import { useEffect, useState } from "react";
import PermissionItem from "../../general/PermissionItem";

function PermissionGroup(props) {
  const [opened, setOpened] = useState(false);
  const [elements, setElements] = useState([]);
  useEffect(() => {
    console.log("hi");
  }, []);

  useEffect(() => {
    setElements(
      Object.keys(props.permission[props.permissionGroup]).map((permissionItem, permissionIndex) => {
        props.setIndex(props.index + 1);
        return (
          <PermissionItem
            key={permissionIndex}
            id={props.id ? props.id : props.currentEdit.id}
            index={props.index}
            permissionGroupIndex={props.permissionGroupIndex}
            permissionItem={permissionItem}
            permissionGroup={props.permissionGroup}
            permission={props.permission}
            role={props.role}
            setRole={props.setRole}
            roleErrors={props.roleErrors}
            setRoleErrors={props.setRoleErrors}
            roleSchema={props.roleSchema}
          />
        );
      })
    );
  }, [props.role]);
  return (
    <>
      <div className="permissions-group" onClick={() => setOpened(!opened)}>
        {props.permissionGroup}
      </div>
      {opened ? elements : null}
    </>
  );
}

export default PermissionGroup;
