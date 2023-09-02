import handleSave from "../../functions/handleSave";

function Textarea(props) {
  return (
    <>
      <div className="column">
        <h3>{props.label}</h3>
        <textarea
          type={"text"}
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
          required
        />
        <div className="validating-error">{props.errors[props.name] && <div>{props.errors[props.name]}</div>}</div>
      </div>
    </>
  );
}

export default Textarea;
