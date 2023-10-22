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

function EditPaymentForm(props) {
  const [duringAdd, setDuringAdd] = useState(false);
  const [studentsList, setStudentsList] = useState([]);

  const [payment, setPayment] = useState({
    courseId: props.currentEdit.courseId,
    studentId: props.currentEdit.studentId,
    receiptNumber: props.currentEdit.receiptNumber,
    notebookId: props.currentEdit.notebookId,
    cost: props.currentEdit.cost,
    dateTake: props.currentEdit.dateTake,
    note: props.currentEdit.note,
  });

  useEffect(() => {
    setPayment({
      courseId: props.currentEdit.courseId,
      studentId: props.currentEdit.studentId,
      receiptNumber: props.currentEdit.receiptNumber,
      notebookId: props.currentEdit.notebookId,
      cost: props.currentEdit.cost,
      dateTake: props.currentEdit.dateTake,
      note: props.currentEdit.note,
    });
  }, [props.currentEdit]);
  const [paymentErrors, setPaymentErrors] = useState({});
  const paymentSchema = {
    courseId: Joi.number().integer().required().messages(messages).label("الدورة"),
    studentId: Joi.number().integer().required().messages(messages).label("الأستاذ"),
    receiptNumber: Joi.number().integer().required().messages(messages).label("رقم الدفعة"),
    notebookId: Joi.number().integer().required().messages(messages).label("رقم الدفتر"),
    cost: Joi.number().integer().required().messages(messages).label("المبلغ المدفوع"),
    dateTake: Joi.date().required().messages(messages).label("تاريخ الدفع"),
    note: Joi.string().max(255).trim().allow(null).empty(Joi.allow(null)).messages(messages).label("ملاحظات"),
  };
  const joiPayment = Joi.object(paymentSchema);

  async function setStudentSelect() {
    let temp = [];
    await Promise.all(
      props.courses[props.branch][payment.courseId].students.map((student) => {
        temp = [...temp, { name: student.nameAr, value: student.id, id: student.id }];
      })
    );
    setStudentsList(temp);
  }

  useEffect(() => {
    if (payment.courseId) {
      setStudentSelect();
    } else {
      setStudentsList([]);
      handleSave({ target: { name: "studentId", value: "" } }, payment, setPayment, paymentErrors, setPaymentErrors, paymentSchema);
    }
  }, [payment.courseId]);

  async function addPayment(event) {
    const isValid = await validateForm(event, joiPayment, payment, setPaymentErrors);
    if (isValid) {
      const newData = payment;
      const id = props.currentEdit.id;
      const infoRequestOptions = {
        ...requestOptions,
        method: "put",
        headers: { ...requestOptions.headers, authorization: props.userInformation.token },
        body: JSON.stringify({
          ...payment,
        }),
      };
      setDuringAdd(true);
      const response = await fetch(`${import.meta.env.VITE_URL}/admin-training/student/receipts/update/${id}`, infoRequestOptions);
      const data = await response.json();
      // const data = { success: true, data: 4 };
      if (data.success) {
        console.log("hello");
        props.setPayments({ ...props.payments, [props.branch]: { ...props.payments[props.branch], [id]: { id: id, ...newData } } });
        props.setCurrentEdit(false);
        props.toast.success("تم تعديل الدفعة", {
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
          <SelectInput label={" الدورة :"} placeholder={"اختر الدورة ..."} list={selectOptions.courses} name={"courseId"} onChange={handleSave} state={payment} setState={setPayment} errors={paymentErrors} setErrors={setPaymentErrors} schema={paymentSchema} />
          <SelectInput label={" المدرس :"} placeholder={"اختر المدرس ..."} list={studentsList} name={"studentId"} disabled={payment.courseId ? false : true} onChange={handleSave} state={payment} setState={setPayment} errors={paymentErrors} setErrors={setPaymentErrors} schema={paymentSchema} />
          <NewInput placeholder={""} label={"المبلغ "} type={"number"} name={"cost"} onChange={handleSave} state={payment} setState={setPayment} errors={paymentErrors} setErrors={setPaymentErrors} schema={paymentSchema} />
          <NewInput placeholder={""} label={"التاريخ "} type={"date"} name={"dateTake"} onChange={handleSave} state={payment} setState={setPayment} errors={paymentErrors} setErrors={setPaymentErrors} schema={paymentSchema} />
          <SelectInput label={" الدفتر :"} placeholder={"اختر الدفتر ..."} list={props.notebooks[props.branch]} name={"notebookId"} onChange={handleSave} state={payment} setState={setPayment} errors={paymentErrors} setErrors={setPaymentErrors} schema={paymentSchema} />
          <NewInput placeholder={""} label={"رقم الدفعة "} type={"number"} name={"receiptNumber"} onChange={handleSave} state={payment} setState={setPayment} errors={paymentErrors} setErrors={setPaymentErrors} schema={paymentSchema} />
          <Textarea placeholder={"ملاحظات عامة:"} label={"ملاحظات"} name={"note"} onChange={handleSave} state={payment} setState={setPayment} errors={paymentErrors} setErrors={setPaymentErrors} schema={paymentSchema} />
        </div>

        <div className="button-container">
          <button
            disabled={duringAdd}
            onClick={async (event) => {
              const isValid = await validateForm(event, joiPayment, payment, setPaymentErrors);
              isValid && (await addPayment(event));
            }}
          >
            تعديل
          </button>
        </div>
      </form>
    </>
  );
}

export default EditPaymentForm;
