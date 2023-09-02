function RoleName(props) {
  return (
    <div
      className="label-wrapper"
      onClick={() => {
        props.setCurrentEdit(props.role);
        props.setAddNew(false);
      }}
    >
      <input className={"nav-item" + (props.currentEdit.name == props.role.name ? " current-role" : "")} id={"opt" + props.role.name} name="nav" type="radio" />
      <label className="category" htmlFor={"opt" + props.role.name}>
        {props.role.name}
      </label>
    </div>
  );
}

export default RoleName;
