import handleSave from "../../functions/handleSave";
import colorList from "../../constants/colorList";
import { color, motion } from "framer-motion";
function PermissionItem(props) {
  return (
    <motion.div key={props.id} className="task" initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { duration: 0.12 * props.index } }} whileHover={{ x: -5 }}>
      <input
        className="task-item"
        type="checkbox"
        value={props.permission[props.permissionGroup][props.permissionItem]}
        id={"item" + props.permissionGroup + props.permissionItem}
        onChange={async (event) => {
          if (event.target.checked) await handleSave({ target: { name: "permission", value: [...props.role.permission, event.target.value] } }, props.role, props.setRole, props.roleErrors, props.setRoleErrors, props.roleSchema);
          else {
            props.role.permission.splice(props.role.permission.indexOf(event.target.value), 1);
            props.setRole({ ...props.role });
          }
        }}
        checked={props.role.permission.includes(props.permission[props.permissionGroup][props.permissionItem]) ? true : false}
      />
      <label htmlFor={"item" + props.permissionGroup + props.permissionItem}>
        <span className="label-text">{props.permissionItem}</span>
      </label>
      <span className="tag approved" style={{ color: "black", border: "1px solid" + colorList[props.permissionGroupIndex % colorList.length], backgroundColor: "transparent" }}>
        {props.permissionGroup}
      </span>
    </motion.div>
  );
}

export default PermissionItem;
