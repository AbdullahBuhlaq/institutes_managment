import { useState } from "react";
import validateProperty from "./validateProperty";

async function handleSave(event, state, setState, errors, setErrors, schema) {
  const { name, value } = event.target;
  const errorMessage = await validateProperty(event, schema);
  if (errorMessage) {
    errors[name] = errorMessage;
  } else {
    delete errors[name];
  }
  state[name] = value;
  setState((state) => ({ ...state }));
  setErrors({ ...errors });
}

export default handleSave;
