import handleSave from "../../functions/handleSave";

function Input(props) {
  return (
    <>
      <div className="row title">
        <label htmlFor={props.name} className="header">
          {props.label}
        </label>
        <input
          type={props.type}
          name={props.name}
          id={props.name}
          value={props.state[props.name]}
          onChange={async (event) => {
            const cursor = event.target.selectionStart;
            await handleSave(event, props.state, props.setState, props.errors, props.setErrors, props.schema);
            if (event.target.type == "text" || event.target.type == "password" || event.target.type == "tel") event.target.setSelectionRange(cursor, cursor);
          }}
          spellCheck="false"
        />
        <div className="validating-error">{props.errors[props.name] && <div>{props.errors[props.name]}</div>}</div>
      </div>
    </>
  );
}

export default Input;
