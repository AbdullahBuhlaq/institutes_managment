import { useEffect, useState } from "react";
import PermissionItem from "../../general/PermissionItem";

function PermissionGroup(props) {
  const [opened, setOpened] = useState(false);
  const [elements, setElements] = useState([]);

  useEffect(() => {
    setElements(
      Object.keys(props.permission[props.permissionGroup]).map((permissionItem, permissionIndex) => {
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
      <div className="panel panel-default">
        <div className="panel-heading" role="tab" id="headingOne" onClick={() => setOpened(!opened)}>
          <h4 className="panel-title">
            <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded={opened ? "true" : "false"} aria-controls="collapseOne">
              {props.permissionGroup}
            </a>
          </h4>
        </div>

        {opened ? elements : null}
      </div>
    </>
  );
}

export default PermissionGroup;
