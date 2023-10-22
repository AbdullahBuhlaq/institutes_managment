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

function AddPaymentForm(props) {
  const [duringAdd, setDuringAdd] = useState(false);
  const [studentsList, setStudentsList] = useState([]);
  const [studentChoosen, setStudentChoosen] = useState(false);

  const [payment, setPayment] = useState({
    courseId: "",
    studentId: "",
    notebookId: "",
    receiptNumber: 0,
    cost: 0,
    dateTake: "",
    note: "",
  });
  const [paymentErrors, setPaymentErrors] = useState({});
  const paymentSchema = {
    courseId: Joi.number().integer().required().messages(messages).label("الدورة"),
    studentId: Joi.number().integer().required().messages(messages).label("الأستاذ"),
    notebookId: Joi.number().integer().required().messages(messages).label("رقم الدفتر"),
    receiptNumber: Joi.number().integer().required().messages(messages).label("رقم الدفعة"),
    cost: Joi.number().integer().required().messages(messages).label("المبلغ المدفوع"),
    dateTake: Joi.date().required().messages(messages).label("تاريخ الدفع"),
    note: Joi.string().max(255).trim().allow(null).empty(Joi.allow(null)).messages(messages).label("ملاحظات"),
  };
  const joiPayment = Joi.object(paymentSchema);

  async function setStudentSelect() {
    let temp = [];
    await Promise.all(
      props.courses[props.branch][payment.courseId].students.map((student) => {
        temp = [...temp, { name: student.nameAr, value: student.studentId, id: student.studentId }];
      })
    );
    setStudentsList(temp);
  }

  useEffect(() => {
    if (payment.courseId) {
      setStudentSelect();
    } else if (studentChoosen) {
      setStudentsList([]);
      handleSave({ target: { name: "studentId", value: "" } }, payment, setPayment, paymentErrors, setPaymentErrors, paymentSchema);
    }
  }, [payment.courseId]);

  useEffect(() => {
    if (payment.studentId) setStudentChoosen(true);
  }, [payment.studentId]);

  async function addPayment(event) {
    const isValid = await validateForm(event, joiPayment, payment, setPaymentErrors);
    if (isValid) {
      const newData = payment;
      const infoRequestOptions = {
        ...requestOptions,
        headers: { ...requestOptions.headers, authorization: props.userInformation.token },
        body: JSON.stringify({
          ...payment,
        }),
      };
      setDuringAdd(true);
      const response = await fetch(`${import.meta.env.VITE_URL}/admin-training/student/receipts/add`, infoRequestOptions);
      const data = await response.json();
      // const data = { success: true, data: 4 };
      if (data.success) {
        props.setPayments({ ...props.payments, [props.branch]: { ...props.payments[props.branch], [data.data]: { id: data.data, ...newData } } });
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
          <SelectInput label={" الدورة :"} placeholder={"اختر الدورة ..."} list={selectOptions.courses} name={"courseId"} onChange={handleSave} state={payment} setState={setPayment} errors={paymentErrors} setErrors={setPaymentErrors} schema={paymentSchema} />
          <SelectInput label={" الطالب :"} placeholder={"اختر الطالب ..."} list={studentsList} name={"studentId"} disabled={payment.courseId ? false : true} onChange={handleSave} state={payment} setState={setPayment} errors={paymentErrors} setErrors={setPaymentErrors} schema={paymentSchema} />
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
            إضافة
          </button>
        </div>
      </form>
    </>
  );
}

export default AddPaymentForm;
