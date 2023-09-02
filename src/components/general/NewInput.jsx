import { useState } from "react";
import handleSave from "../../functions/handleSave";

function NewInput(props) {
  const [isText, setIsText] = useState(false);
  return (
    <>
      <div className="column" style={{ position: "relative" }}>
        <h3>{props.label}</h3>
        <input
          type={isText ? "text" : props.type}
          name={props.name}
          id={props.name}
          placeholder={props.placeholder}
          value={props.state[props.name]}
          onChange={async (event) => {
            const cursor = event.target.selectionStart;
            await handleSave(event, props.state, props.setState, props.errors, props.setErrors, props.schema);
            if (event.target.type == "text" || event.target.type == "password" || event.target.type == "tel") event.target.setSelectionRange(cursor, cursor);
          }}
          spellCheck="false"
          dir="rtl"
          disabled={props.disabled}
          required
        />
        <div className="validating-error">{props.errors[props.name] && <div>{props.errors[props.name]}</div>}</div>
        {props.type == "password" ? (
          <span
            style={{ position: "absolute", left: "15px", top: "47px", cursor: "pointer" }}
            onClick={() => {
              setIsText(!isText);
            }}
          >
            {isText ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>}
          </span>
        ) : null}
      </div>
    </>
  );
}

export default NewInput;
