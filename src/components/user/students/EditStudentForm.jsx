import { useEffect, useState, Fragment } from "react";
import Joi from "joi";
import validateForm from "../../../functions/validateForm";
import handleSave from "../../../functions/handleSave";
import requestOptions from "../../../constants/requestOptions";
import messages from "../../../constants/messages";
import selectOptions from "../../../constants/selectOptions";
import NewInput from "../../general/NewInput";
import SelectInput from "../../general/SelectInput";
import Textarea from "../../general/Textarea";

function EditStudentForm(props) {
  const [duringAdd, setDuringAdd] = useState(false);
  const [student, setStudent] = useState({
    nameAr: props.currentEdit.nameAr,
    nameEn: props.currentEdit.nameEn,
    gender: props.currentEdit.gender,
    phone: props.currentEdit.phone,
    level: props.currentEdit.level,
    note: props.currentEdit.note,
  });

  useEffect(() => {
    setStudent({
      nameAr: props.currentEdit.nameAr,
      nameEn: props.currentEdit.nameEn,
      gender: props.currentEdit.gender,
      phone: props.currentEdit.phone,
      level: props.currentEdit.level,
      note: props.currentEdit.note,
    });
  }, [props.currentEdit]);
  const [studentErrors, setStudentErrors] = useState({});
  const studentSchema = {
    nameAr: Joi.string().required().min(2).max(50).trim().messages(messages).label("الاسم بالعربي"),
    nameEn: Joi.string().min(2).max(50).trim().messages(messages).label("الاسم بالإنجليزي"),
    gender: Joi.string().required().messages(messages).label("الجنس"),
    phone: Joi.string()
      .trim()
      .required()
      .pattern(/^(09)(\d{8})$/)
      .messages({ ...messages, "string.pattern.base": "{{#label}} يجب أن يتضمن رقم موبايل, مثل 0987654321" })
      .label("الموبايل"),
    level: Joi.string().required().trim().max(50).messages(messages).label("المرحلة"),
    note: Joi.string().allow(null, "").trim().max(255).messages(messages).label("الملاحظات"),
  };
  const joiStudent = Joi.object(studentSchema);

  async function editStudent(event) {
    const isValid = await validateForm(event, joiStudent, student, setStudentErrors);
    if (isValid) {
      const newData = student;
      const id = props.currentEdit.id;
      const infoRequestOptions = {
        ...requestOptions,
        method: "put",
        headers: { ...requestOptions.headers, authorization: props.userInformation.token },
        body: JSON.stringify({
          ...student,
          nameBranch: props.branchName,
        }),
      };
      setDuringAdd(true);
      const response = await fetch(`${process.env.REACT_APP_URL_STRING}/admin-training/student/update/${id}`, infoRequestOptions);
      const data = await response.json();
      // const data = { success: true };
      if (data.success) {
        props.setStudents({ ...props.students, [props.branch]: { ...props.students[props.branch], [id]: { id: id, ...newData } } });
        props.setCurrentEdit(false);
        props.toast.success("تم تعديل الطالب", {
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
          <NewInput placeholder={""} label={"الاسم بالعربية"} type={"text"} name={"nameAr"} onChange={handleSave} state={student} setState={setStudent} errors={studentErrors} setErrors={setStudentErrors} schema={studentSchema} />
          <NewInput placeholder={""} label={"الاسم بالإنجليزية"} type={"text"} name={"nameEn"} onChange={handleSave} state={student} setState={setStudent} errors={studentErrors} setErrors={setStudentErrors} schema={studentSchema} />
          <SelectInput label={"المرحلة الدراسية :"} placeholder={"اختر المرحلة الدراسية..."} list={selectOptions.level} name={"level"} onChange={handleSave} state={student} setState={setStudent} errors={studentErrors} setErrors={setStudentErrors} schema={studentSchema} />
          <Textarea placeholder={"ملاحظات عامة:"} label={"ملاحظات"} name={"note"} onChange={handleSave} state={student} setState={setStudent} errors={studentErrors} setErrors={setStudentErrors} schema={studentSchema} />

          <NewInput placeholder={"رقم الموبايل:"} label={"موبايل"} type={"tel"} name={"phone"} onChange={handleSave} state={student} setState={setStudent} errors={studentErrors} setErrors={setStudentErrors} schema={studentSchema} />
          <SelectInput label={"الجنس :"} placeholder={"اختر الجنس..."} list={selectOptions.gender} name={"gender"} onChange={handleSave} state={student} setState={setStudent} errors={studentErrors} setErrors={setStudentErrors} schema={studentSchema} />
        </div>

        <div className="button-container">
          <button
            disabled={duringAdd}
            onClick={async (event) => {
              const isValid = await validateForm(event, joiStudent, student, setStudentErrors);
              isValid && (await editStudent(event));
            }}
          >
            حفظ
          </button>
        </div>
      </form>
    </>
  );
}

export default EditStudentForm;
