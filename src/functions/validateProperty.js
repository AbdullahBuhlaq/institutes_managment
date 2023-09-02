import Joi from "joi";

async function validateProperty(event, schema) {
  const { name, value } = event.target;
  const obj = { [name]: value };
  const subJoi = Joi.object({ [name]: schema[name] });
  const result = subJoi.validate(obj);
  const { error } = result;
  return error ? error.details[0].message : null;
}

export default validateProperty;
