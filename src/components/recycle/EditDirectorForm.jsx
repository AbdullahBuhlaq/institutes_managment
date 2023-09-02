import Input from "./Input";
import GENDER from "../constants/gender";
import handleSave from "../functions/handleSave";
import validateForm from "../functions/validateForm";
import Joi from "joi";
import messages from "../constants/messages";
import requestOptions from "../constants/requestOptions";
import { Fragment, useState } from "react";

function EditDirectorForm(props) {
  const [duringAdd, setDuringAdd] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [director, setDirector] = useState({
    name: props.institute.user.name,
    gender: props.institute.user.gender,
    email: props.institute.user.email,
    phoneNumber: props.institute.user.phoneNumber,
    username: props.institute.user.username,
    password: props.institute.user.password,
  });
  const [directorErrors, setDirectorErrors] = useState({});
  const directorSchema = {
    name: Joi.string().required().min(2).max(50).trim().messages(messages).label("اسم المدير"),
    gender: Joi.boolean().required().messages(messages).label("الجنس"),
    email: Joi.string()
      .trim()
      .pattern(/[a-zA-Z0-9]+[a-zA-Z0-9\_\.]*(@gmail\.com)$/)
      .allow(null)
      .messages({ ...messages, "string.pattern.base": "{{#label}} يجب أن يتضمن بريد Gmail, مثل user@gmail.com" })
      .label("البريد الإلكتروني"),
    phoneNumber: Joi.string()
      .trim()
      .required()
      .pattern(/^(09)(\d{8})$/)
      .messages({ ...messages, "string.pattern.base": "{{#label}} يجب أن يتضمن رقم موبايل, مثل 0987654321" })
      .label("رقم الموبايل"),
    username: Joi.string()
      .trim()
      .pattern(/^[A-Za-z]+[a-zA-Z0-9\_\.]*$/)
      .min(3)
      .max(30)
      .required()
      .messages({ ...messages, "string.pattern.base": "{{#label}} يجب أن يتضمن فقط أحرف إنجليزية وأرقام" })
      .label("اسم المستخدم"),
    password: Joi.string().required().min(8).max(50).messages(messages).label("كلمة السر"),
  };
  const joiDirector = Joi.object(directorSchema);

  async function EditDirector(event) {
    const isValid = await validateForm(event, joiDirector, director, setDirectorErrors);
    if (isValid) {
      const newData = director;
      setErrorMessage("");
      const infoRequestOptions = {
        ...requestOptions,
        body: JSON.stringify({
          ...director,
        }),
      };
      setDuringAdd(true);
      const response = await fetch("http://localhost:3001/admin-site/training_center/new-training", infoRequestOptions);
      const data = await response.json();
      if (data.success) {
        props.setInstitute({ ...props.institute, user: newData });
      } else {
        console.log(data.error);
        setErrorMessage("عذرا, حدث خطأ في السيرفر");
      }
      setDuringAdd(false);
    } else {
      setErrorMessage("يوجد معلومات خاطئة");
    }
  }

  return (
    <>
      {errorMessage ? <div>{errorMessage}</div> : null}
      <div className="adddirector">
        <Input label={""} type={"text"} name={"name"} onChange={handleSave} state={director} setState={setDirector} errors={directorErrors} setErrors={setDirectorErrors} schema={directorSchema} />
        <Input label={""} type={"text"} name={"username"} onChange={handleSave} state={director} setState={setDirector} errors={directorErrors} setErrors={setDirectorErrors} schema={directorSchema} />
        <Input label={""} type={"email"} name={"email"} onChange={handleSave} state={director} setState={setDirector} errors={directorErrors} setErrors={setDirectorErrors} schema={directorSchema} />
        <Input label={""} type={"tel"} name={"phoneNumber"} onChange={handleSave} state={director} setState={setDirector} errors={directorErrors} setErrors={setDirectorErrors} schema={directorSchema} />
        <Input label={""} type={"password"} name={"password"} onChange={handleSave} state={director} setState={setDirector} errors={directorErrors} setErrors={setDirectorErrors} schema={directorSchema} />
        {GENDER.map((genderItem, index) => {
          return (
            <Fragment key={index}>
              <label htmlFor="">{genderItem.name}</label>
              <input
                type="radio"
                value={genderItem.value}
                name="gender"
                checked={genderItem.value == (director.gender == "true")}
                onChange={(event) => {
                  handleSave(event, director, setDirector, directorErrors, setDirectorErrors, directorSchema);
                }}
              />
            </Fragment>
          );
        })}
        <button
          disabled={duringAdd}
          onClick={async (event) => {
            const isValid = await validateForm(event, joiDirector, director, setDirectorErrors);
            isValid && (await EditDirector(event));
          }}
        >
          press
        </button>
      </div>
    </>
  );
}

export default EditDirectorForm;
