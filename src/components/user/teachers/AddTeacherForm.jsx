import { useState } from "react";
import Joi from "joi";
import validateForm from "../../../functions/validateForm";
import handleSave from "../../../functions/handleSave";
import requestOptions from "../../../constants/requestOptions";
import messages from "../../../constants/messages";
import "react-toastify/dist/ReactToastify.css";
import selectOptions from "../../../constants/selectOptions";
import NewInput from "../../general/NewInput";
import SelectInput from "../../general/SelectInput";
import SelectMultiple from "../../general/SelectMultible";
import Textarea from "../../general/Textarea";

function AddTeacherForm(props) {
  const [duringAdd, setDuringAdd] = useState(false);

  const [teacher, setTeacher] = useState(
    props.userInformation.branch
      ? {
          nameAr: "",
          nameEn: "",
          gender: "",
          phone: "",
          level: "",
          note: "",
          subjects: [],
        }
      : {
          nameAr: "",
          nameEn: "",
          gender: "",
          phone: "",
          level: "",
          note: "",
          subjects: [],
          nameBranch: "",
        }
  );

  const [teacherErrors, setTeacherErrors] = useState({});
  const teacherSchema = props.userInformation.branch
    ? {
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
        subjects: Joi.array().items(Joi.string()).min(1).required().messages(messages).label("المواد"),
      }
    : {
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
        subjects: Joi.array().items(Joi.string()).min(1).required().messages(messages).label("المواد"),
        nameBranch: Joi.string().allow(null).trim().messages(messages).label("اسم الفرع"),
      };
  const joiTeacher = Joi.object(teacherSchema);

  async function addTeacher(event) {
    const newData = teacher;
    const infoRequestOptions = {
      ...requestOptions,
      headers: { ...requestOptions.headers, authorization: props.userInformation.token },
      body: JSON.stringify({
        ...teacher,
      }),
    };
    setDuringAdd(true);
    console.log(teacher)
    const response = await fetch(props.userInformation.branch ? `${import.meta.env.VITE_URL}/admin-training/teacher/add-in-branch` : `${import.meta.env.VITE_URL}/admin-training/teacher/add`, infoRequestOptions);
    const data = await response.json();
    // const data = { success: true, data: 3 };
    if (data.success) {
      props.setTeachers({ ...props.teachers, [data.data]: { ...newData, id: data.data } });
      props.setAddNew(false);
      props.toast.success("تمت إضافة الموظف", {
        position: props.toast.POSITION.TOP_CENTER,
      });
    } else {
      console.log(data.error);
      props.toast.error(data.error, {
        position: props.toast.POSITION.TOP_CENTER,
      });
    }
    setDuringAdd(false);
  }

  return (
    <>
      <h1>إدخال معلومات معلم جديد</h1>
      <form>
        <div className="row">
          <NewInput placeholder={""} label={"الاسم بالعربية"} type={"text"} name={"nameAr"} onChange={handleSave} state={teacher} setState={setTeacher} errors={teacherErrors} setErrors={setTeacherErrors} schema={teacherSchema} />
          <NewInput placeholder={""} label={"الاسم بالإنجليزية"} type={"text"} name={"nameEn"} onChange={handleSave} state={teacher} setState={setTeacher} errors={teacherErrors} setErrors={setTeacherErrors} schema={teacherSchema} />
          <SelectInput label={"المرحلة الدراسية :"} placeholder={"اختر المرحلة الدراسية..."} list={selectOptions.level} name={"level"} onChange={handleSave} state={teacher} setState={setTeacher} errors={teacherErrors} setErrors={setTeacherErrors} schema={teacherSchema} />
          <SelectMultiple list={selectOptions.subjects} placeholder={"اختر اهتماماتك"} name={"subjects"} onChange={handleSave} state={teacher} setState={setTeacher} errors={teacherErrors} setErrors={setTeacherErrors} schema={teacherSchema} />

          {props.userInformation.branch ? null : <SelectInput placeholder={"اختر الفرع..."} label={"اسم الفرع"} name={"nameBranch"} list={selectOptions.nameBranch} onChange={handleSave} state={teacher} setState={setTeacher} errors={teacherErrors} setErrors={setTeacherErrors} schema={teacherSchema} />}
          <Textarea placeholder={"ملاحظات عامة:"} label={"ملاحظات"} name={"note"} onChange={handleSave} state={teacher} setState={setTeacher} errors={teacherErrors} setErrors={setTeacherErrors} schema={teacherSchema} />
          <NewInput placeholder={"رقم الموبايل:"} label={"موبايل"} type={"tel"} name={"phone"} onChange={handleSave} state={teacher} setState={setTeacher} errors={teacherErrors} setErrors={setTeacherErrors} schema={teacherSchema} />
          <SelectInput label={"الجنس :"} placeholder={"اختر الجنس..."} list={selectOptions.gender} name={"gender"} onChange={handleSave} state={teacher} setState={setTeacher} errors={teacherErrors} setErrors={setTeacherErrors} schema={teacherSchema} />
        </div>

        <div className="button-container">
          <button
            disabled={duringAdd}
            onClick={async (event) => {
              let isValid = await validateForm(event, joiTeacher, teacher, setTeacherErrors);

              if (isValid) await addTeacher(event);
              else {
                props.toast.info("أدخل جميع المعلومات بشكل صحيح", {
                  position: props.toast.POSITION.TOP_CENTER,
                });
              }
            }}
          >
            إضافة
          </button>
        </div>
      </form>
    </>
  );
}

export default AddTeacherForm;
