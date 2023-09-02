import handleSave from "../../functions/handleSave";

function SelectInput(props) {
  return (
    <>
      <div className="column" style={{ position: "relative" }}>
        <h3>{props.label}</h3>
        <select
          id="my-listbox"
          onChange={async (event) => {
            await handleSave({ target: { name: props.name, value: event.target.value } }, props.state, props.setState, props.errors, props.setErrors, props.schema);
          }}
          value={props.state[props.name]}
          disabled={props.disabled}
        >
          <option value="">{props.placeholder}</option>
          {Object.keys(props.list).map((listItem, listIndex) => {
            return (
              <option key={listIndex} value={props.list[listItem].id ? props.list[listItem].id : props.list[listItem].value}>
                {props.list[listItem].name}
              </option>
            );
          })}
        </select>
        {props.addNew ? (
          <span
            onClick={() => {
              props.addNew(true);
            }}
          >
            +
          </span>
        ) : null}
        <div className="validating-error">{props.errors[props.name] && <div>{props.errors[props.name]}</div>}</div>
      </div>
    </>
  );
}

export default SelectInput;
