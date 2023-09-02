import { useState } from "react";
import Joi from "joi";
import validateForm from "../../../functions/validateForm";
import handleSave from "../../../functions/handleSave";
import requestOptions from "../../../constants/requestOptions";
import messages from "../../../constants/messages";
import selectOptions from "../../../constants/selectOptions";
import NewInput from "../../general/NewInput";
import SelectInput from "../../general/SelectInput";

function AddNotebook(props) {
  const [duringAdd, setDuringAdd] = useState(false);

  const [notebook, setNotebook] = useState({
    name: "",
    type: "",
    from: 0,
    to: 0,
  });
  const [notebookErrors, setNotebookErrors] = useState({});
  const notebookSchema = {
    name: Joi.string()
      .regex(/^[\u0621-\u064Aa-zA-Z1-9\_\s]+$/)
      .required()
      .trim()
      .messages({ ...messages, "string.pattern.base": "{{#label}} يجب أن يتضمن أحرفا وأرقاما فقط" })
      .label("اسم الدفتر"),
    type: Joi.string().required().messages(messages).label("نوع الدفتر"),
    from: Joi.number().integer().required().precision(0).messages(messages).label("من"),
    to: Joi.number().integer().required().precision(0).messages(messages).label("إلى"),
  };
  const joiNotebook = Joi.object(notebookSchema);

  async function addNotebook(event) {
    const isValid = await validateForm(event, joiNotebook, notebook, setNotebookErrors);
    if (isValid) {
      const newData = notebook;
      const infoRequestOptions = {
        ...requestOptions,
        headers: { ...requestOptions.headers, authorization: props.userInformation.token },
        body: JSON.stringify({
          ...notebook,
          nameBranch: props.branchName,
        }),
      };
      setDuringAdd(true);
      const response = await fetch("http://localhost:3001/admin-training/notebook/add", infoRequestOptions);
      const data = await response.json();
      // const data = { success: true, data: 4 };
      if (data.success) {
        selectOptions.notebooks.push({ name: newData.name, value: data.data, id: data.data });
        props.setNotebooks({ ...props.notebooks, [props.branch]: { ...props.notebooks[props.branch], [data.data]: { id: data.data, ...newData } } });
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
          <NewInput placeholder={""} label={"اسم الدفتر"} type={"text"} name={"name"} onChange={handleSave} state={notebook} setState={setNotebook} errors={notebookErrors} setErrors={setNotebookErrors} schema={notebookSchema} />
          <SelectInput placeholder={"اختر نوع الدفتر ..."} label={"نوع الدفتر"} name={"type"} list={selectOptions.type} onChange={handleSave} state={notebook} setState={setNotebook} errors={notebookErrors} setErrors={setNotebookErrors} schema={notebookSchema} />
          <NewInput placeholder={""} label={"من"} type={"number"} name={"from"} onChange={handleSave} state={notebook} setState={setNotebook} errors={notebookErrors} setErrors={setNotebookErrors} schema={notebookSchema} />
          <NewInput placeholder={""} label={"الى"} type={"number"} name={"to"} onChange={handleSave} state={notebook} setState={setNotebook} errors={notebookErrors} setErrors={setNotebookErrors} schema={notebookSchema} />
        </div>
        <div className="button-container">
          <button
            disabled={duringAdd}
            onClick={async (event) => {
              const isValid = await validateForm(event, joiNotebook, notebook, setNotebookErrors);
              isValid && (await addNotebook(event));
            }}
          >
            إضافة
          </button>
        </div>
      </form>
    </>
  );
}

export default AddNotebook;
