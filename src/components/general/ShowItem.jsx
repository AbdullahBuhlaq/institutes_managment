import handleSave from "../../functions/handleSave";
import { motion } from "framer-motion";
function ShowItem(props) {
  return (
    <motion.div key={props.id} className="task" whileHover={{ x: -5 }}>
      <input
        className="task-item"
        type="checkbox"
        value={props.showItem.value}
        id={"item" + props.showItem.value}
        onChange={async (event) => {
          if (event.target.checked) await handleSave({ target: { name: "show", value: [...props.role.show, event.target.value] } }, props.role, props.setRole, props.roleErrors, props.setRoleErrors, props.roleSchema);
          else {
            props.role.show.splice(props.role.show.indexOf(event.target.value), 1);
            props.setRole({ ...props.role });
          }
        }}
        checked={props.role.show.includes(props.showItem.value) ? true : false}
      />
      <label htmlFor={"item" + props.showItem.value}>
        <span className="label-text">{props.showItem.name}</span>
      </label>
    </motion.div>
  );
}

export default ShowItem;
