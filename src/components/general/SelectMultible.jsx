import { useState } from "react";
import handleSave from "../../functions/handleSave";

function SelectMultiple(props) {
  const [open, setOpen] = useState(false);
  try {
    return (
      <>
        <div className="column">
          <div className={"selectMultiple" + (open ? " open" : "")}>
            <div>
              <span className={props.state[props.name].length ? "hide" : ""} onClick={() => setOpen(!open)}>
                {props.placeholder}
              </span>
              <div className="arrow" onClick={() => setOpen(!open)}></div>
              {props.state[props.name].map((item, levelIndex) => {
                return (
                  <a
                    key={levelIndex}
                    className="notShown shown"
                    onClick={() => {
                      handleSave({ target: { name: props.name, value: [...props.state[props.name].slice(0, levelIndex), ...props.state[props.name].slice(parseInt(levelIndex) + 1)] } }, props.state, props.setState, props.errors, props.setErrors, props.schema);
                    }}
                  >
                    {item.name ? <em>{item.name}</em> : item}
                    <i></i>
                  </a>
                );
              })}
            </div>
            <ul>
              {props.list.map((item, levelIndex) => {
                if (!props.state[props.name].includes(item.name))
                  return (
                    <li
                      key={levelIndex}
                      style={{ display: "list-item" }}
                      onClick={() => {
                        handleSave({ target: { name: props.name, value: [...props.state[props.name], item.name] } }, props.state, props.setState, props.errors, props.setErrors, props.schema);
                      }}
                    >
                      {item.name}
                    </li>
                  );
              })}
            </ul>
          </div>
          <div className="validating-error">{props.errors[props.name] && <div>{props.errors[props.name]}</div>}</div>
        </div>
        {/* <div className="column">
        <h3>{props.label}</h3>
        <select
          id="my-listbox"
          onChange={async (event) => {
            await handleSave({ target: { name: props.name, value: event.target.value } }, props.state, props.setState, props.errors, props.setErrors, props.schema);
          }}
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
        
        <div className="validating-error">{props.errors[props.name] && <div>{props.errors[props.name]}</div>}</div>
      </div> */}
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default SelectMultiple;
