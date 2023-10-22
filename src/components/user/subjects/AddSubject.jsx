import { useState } from "react";
import Joi from "joi";
import validateForm from "../../../functions/validateForm";
import handleSave from "../../../functions/handleSave";
import requestOptions from "../../../constants/requestOptions";
import messages from "../../../constants/messages";
import selectOptions from "../../../constants/selectOptions";
import NewInput from "../../general/NewInput";
import SelectInput from "../../general/SelectInput";

function AddSubject(props) {
  const [duringAdd, setDuringAdd] = useState(false);

  const [subject, setSubject] = useState({
    name: "",
    subjectType: "",
  });
  const [subjectErrors, setSubjectErrors] = useState({});
  const subjectSchema = {
    name: Joi.string()
      .regex(/^[\u0621-\u064Aa-zA-Z1-9\_\s]+$/)
      .required()
      .trim()
      .messages({ ...messages, "string.pattern.base": "{{#label}} يجب أن يتضمن أحرف وأرقام فقط" })
      .label("اسم المادة"),
    subjectType: Joi.string().required().messages(messages).label("نوع المادة"),
  };
  const joiSubject = Joi.object(subjectSchema);

  async function addSubject(event) {
    const isValid = await validateForm(event, joiSubject, subject, setSubjectErrors);
    if (isValid) {
      const newData = subject;
      const infoRequestOptions = {
        ...requestOptions,
        headers: { ...requestOptions.headers, authorization: props.userInformation.token },
        body: JSON.stringify({
          ...subject,
        }),
      };
      setDuringAdd(true);
      const response = await fetch(`${process.env.REACT_APP_URL_STRING}/admin-training/subject/add`, infoRequestOptions);
      const data = await response.json();
      // const data = { success: true, data: 4 };
      if (data.success) {
        selectOptions.subjects.push({ name: newData.name, value: data.data, id: data.data });
        props.setSubjects({ ...props.subjects, [props.branch]: { ...props.subjects[props.branch], [data.data]: { id: data.data, ...newData } } });
        props.setAddNew(false);
        props.toast.success("تمت إضافة المادة", {
          position: props.toast.POSITION.TOP_CENTER,
        });
      } else {
        console.log(data.error);
        props.toast.error(data.error, {
          position: props.toast.POSITION.TOP_CENTER,
        });
      }
      setDuringAdd(false);
    } else {
      props.toast.info("أدخل جميع المعلومات بشكل صحيح", {
        position: props.toast.POSITION.TOP_CENTER,
      });
    }
  }

  return (
    <>
      <form>
        <div className="row">
          <NewInput placeholder={""} label={"اسم المادة"} type={"text"} name={"name"} onChange={handleSave} state={subject} setState={setSubject} errors={subjectErrors} setErrors={setSubjectErrors} schema={subjectSchema} />
          <SelectInput placeholder={"اختر نوع المادة ..."} label={"نوع المادة"} name={"subjectType"} list={selectOptions.subjectType} onChange={handleSave} state={subject} setState={setSubject} errors={subjectErrors} setErrors={setSubjectErrors} schema={subjectSchema} />
        </div>
        <div className="button-container">
          <button
            disabled={duringAdd}
            onClick={async (event) => {
              const isValid = await validateForm(event, joiSubject, subject, setSubjectErrors);
              isValid && (await addSubject(event));
            }}
          >
            إضافة
          </button>
        </div>
      </form>
    </>
  );
}

export default AddSubject;
