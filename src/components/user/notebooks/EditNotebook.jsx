import { useEffect, useState } from "react";
import Joi from "joi";
import validateForm from "../../../functions/validateForm";
import handleSave from "../../../functions/handleSave";
import requestOptions from "../../../constants/requestOptions";
import messages from "../../../constants/messages";
import selectOptions from "../../../constants/selectOptions";
import NewInput from "../../general/NewInput";
import SelectInput from "../../general/SelectInput";

function EditNotebook(props) {
  const [duringAdd, setDuringAdd] = useState(false);
  const [notebook, setNotebook] = useState({
    name: props.currentEdit.name,
    type: props.currentEdit.type,
    from: props.currentEdit.from,
    to: props.currentEdit.to,
  });

  useEffect(() => {
    setNotebook({
      name: props.currentEdit.name,
      type: props.currentEdit.type,
      from: props.currentEdit.from,
      to: props.currentEdit.to,
    });
  }, [props.currentEdit]);
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

  async function editNotebook(event) {
    const isValid = await validateForm(event, joiNotebook, notebook, setNotebookErrors);
    if (isValid) {
      const newData = notebook;
      const id = props.currentEdit.id;
      const infoRequestOptions = {
        ...requestOptions,
        method: "put",
        headers: { ...requestOptions.headers, authorization: props.userInformation.token },
        body: JSON.stringify({
          ...notebook,
        }),
      };
      setDuringAdd(true);
      const response = await fetch(`${import.meta.env.VITE_URL}/admin-training/notebook/update/${id}`, infoRequestOptions);
      const data = await response.json();
      // const data = { success: true };
      if (data.success) {
        props.setNotebooks({ ...props.notebooks, [props.branch]: { ...props.notebooks[props.branch], [id]: { id: id, ...newData } } });
        props.setCurrentEdit(false);
        props.toast.success("تم تعديل المادة", {
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
              isValid && (await editNotebook(event));
            }}
          >
            حفظ
          </button>
        </div>
      </form>
    </>
  );
}

export default EditNotebook;
