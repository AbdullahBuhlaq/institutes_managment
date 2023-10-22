import { useEffect, useState } from "react";
import Joi from "joi";
import validateForm from "../../../functions/validateForm";
import handleSave from "../../../functions/handleSave";
import requestOptions from "../../../constants/requestOptions";
import messages from "../../../constants/messages";
import selectOptions from "../../../constants/selectOptions";
import NewInput from "../../general/NewInput";
import SelectInput from "../../general/SelectInput";
import Textarea from "../../general/Textarea";

function AddReceiptForm(props) {
  const [duringAdd, setDuringAdd] = useState(false);
  const [teachersList, setTeachersList] = useState([]);
  const [teacherChoosen, setTeacherChoosen] = useState(false);

  const [receipt, setReceipt] = useState({
    courseId: "",
    teacherId: "",
    notebookId: "",
    receiptNumber: 0,
    cost: 0,
    dateTake: "",
    note: "",
  });
  const [receiptErrors, setReceiptErrors] = useState({});
  const receiptSchema = {
    courseId: Joi.number().integer().required().messages(messages).label("الدورة"),
    teacherId: Joi.number().integer().required().messages(messages).label("الأستاذ"),
    notebookId: Joi.number().integer().required().messages(messages).label("رقم الدفتر"),
    receiptNumber: Joi.number().integer().required().messages(messages).label("رقم الدفعة"),
    cost: Joi.number().integer().required().messages(messages).label("المبلغ المدفوع"),
    dateTake: Joi.date().required().messages(messages).label("تاريخ الدفع"),
    note: Joi.string().max(255).trim().allow(null).empty(Joi.allow(null)).messages(messages).label("ملاحظات"),
  };
  const joiReceipt = Joi.object(receiptSchema);

  async function setTeacherSelect() {
    let temp = [];
    await Promise.all(
      props.courses[props.branch][receipt.courseId].teachers.map((teacher) => {
        temp = [...temp, { name: teacher.nameAr, value: teacher.id, id: teacher.id }];
      })
    );
    setTeachersList(temp);
  }

  useEffect(() => {
    if (receipt.courseId) {
      setTeacherSelect();
    } else if (teacherChoosen) {
      setTeachersList([]);
      handleSave({ target: { name: "teacherId", value: "" } }, receipt, setReceipt, receiptErrors, setReceiptErrors, receiptSchema);
    }
  }, [receipt.courseId]);

  useEffect(() => {
    if (receipt.teacherId) setTeacherChoosen(true);
  }, [receipt.teacherId]);

  async function addReceipt(event) {
    const isValid = await validateForm(event, joiReceipt, receipt, setReceiptErrors);
    if (isValid) {
      const newData = receipt;
      const infoRequestOptions = {
        ...requestOptions,
        headers: { ...requestOptions.headers, authorization: props.userInformation.token },
        body: JSON.stringify({
          ...receipt,
        }),
      };
      setDuringAdd(true);
      const response = await fetch(`${import.meta.env.VITE_URL}/admin-training/teacher/receipts/add`, infoRequestOptions);
      const data = await response.json();
      // const data = { success: true, data: 4 };
      if (data.success) {
        props.setReceipts({ ...props.receipts, [data.data]: { id: data.data, ...newData } });
        props.setAddNew(false);
        props.toast.success("تمت إضافة الدفعة", {
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
          <SelectInput label={" الدورة :"} placeholder={"اختر الدورة ..."} list={selectOptions.courses} name={"courseId"} onChange={handleSave} state={receipt} setState={setReceipt} errors={receiptErrors} setErrors={setReceiptErrors} schema={receiptSchema} />
          <SelectInput label={" المدرس :"} placeholder={"اختر المدرس ..."} list={teachersList} name={"teacherId"} disabled={receipt.courseId ? false : true} onChange={handleSave} state={receipt} setState={setReceipt} errors={receiptErrors} setErrors={setReceiptErrors} schema={receiptSchema} />
          <NewInput placeholder={""} label={"المبلغ "} type={"number"} name={"cost"} onChange={handleSave} state={receipt} setState={setReceipt} errors={receiptErrors} setErrors={setReceiptErrors} schema={receiptSchema} />
          <NewInput placeholder={""} label={"التاريخ "} type={"date"} name={"dateTake"} onChange={handleSave} state={receipt} setState={setReceipt} errors={receiptErrors} setErrors={setReceiptErrors} schema={receiptSchema} />
          <NewInput placeholder={""} label={"رقم الدفعة "} type={"number"} name={"receiptNumber"} onChange={handleSave} state={receipt} setState={setReceipt} errors={receiptErrors} setErrors={setReceiptErrors} schema={receiptSchema} />
          <SelectInput label={" الدفتر :"} placeholder={"اختر الدفتر ..."} list={props.notebooks[props.branch]} name={"notebookId"} onChange={handleSave} state={receipt} setState={setReceipt} errors={receiptErrors} setErrors={setReceiptErrors} schema={receiptSchema} />
          <Textarea placeholder={"ملاحظات عامة:"} label={"ملاحظات"} name={"note"} onChange={handleSave} state={receipt} setState={setReceipt} errors={receiptErrors} setErrors={setReceiptErrors} schema={receiptSchema} />
        </div>

        <div className="button-container">
          <button
            disabled={duringAdd}
            onClick={async (event) => {
              const isValid = await validateForm(event, joiReceipt, receipt, setReceiptErrors);
              isValid && (await addReceipt(event));
            }}
          >
            إضافة
          </button>
        </div>
      </form>
    </>
  );
}

export default AddReceiptForm;
