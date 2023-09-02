async function validateForm(event, joi, obj, setErrors) {
  event && event.preventDefault();
  const result = joi.validate(obj, { abortEarly: false });
  const { error } = result;
  if (!error) {
    setErrors({});
    return true;
  } else {
    const errorData = {};
    await Promise.all(
      error.details.map((item) => {
        const name = item.path[0];
        const message = item.message;
        errorData[name] = message;
      })
    );
    setErrors(errorData);
    return false;
  }
}

export default validateForm;
