import { useState, Fragment, useEffect } from "react";
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

  const [teacher, setTeacher] = useState({
    nameAr: props.currentEdit.nameAr,
    nameEn: props.currentEdit.nameEn,
    gender: props.currentEdit.gender,
    phone: props.currentEdit.phone,
    level: props.currentEdit.level,
    note: props.currentEdit.note,
    subjects: props.currentEdit.subjects,
    nameBranch: props.currentEdit.nameBranch,
  });

  useEffect(() => {
    setTeacher({
      nameAr: props.currentEdit.nameAr,
      nameEn: props.currentEdit.nameEn,
      gender: props.currentEdit.gender,
      phone: props.currentEdit.phone,
      level: props.currentEdit.level,
      note: props.currentEdit.note,
      subjects: props.currentEdit.subjects,
      nameBranch: props.currentEdit.nameBranch,
    });
  }, [props.currentEdit]);

  const [teacherErrors, setTeacherErrors] = useState({});
  const teacherSchema = {
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
    const id = props.currentEdit.id;
    const infoRequestOptions = {
      ...requestOptions,
      method: "put",
      headers: { ...requestOptions.headers, authorization: props.userInformation.token },
      body: JSON.stringify({
        ...teacher,
      }),
    };
    setDuringAdd(true);
    const response = await fetch(`${import.meta.env.VITE_URL}/admin-training/teacher/update/${id}`, infoRequestOptions);
    const data = await response.json();
    // const data = { success: true };
    if (data.success) {
      props.setTeachers({ ...props.teachers, [id]: { ...newData, id: id } });
      props.setCurrentEdit(false);
      props.toast.success("تم تعديل الموظف", {
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
  try {
    return (
      <>
        <h1>تعديل معلومات المعلم {props.currentEdit.nameAr}</h1>

        <form>
          <div className="row">
            {console.log(teacher.subjects)}
            <NewInput placeholder={""} label={"الاسم بالعربية"} type={"text"} name={"nameAr"} onChange={handleSave} state={teacher} setState={setTeacher} errors={teacherErrors} setErrors={setTeacherErrors} schema={teacherSchema} />
            <NewInput placeholder={""} label={"الاسم بالإنجليزية"} type={"text"} name={"nameEn"} onChange={handleSave} state={teacher} setState={setTeacher} errors={teacherErrors} setErrors={setTeacherErrors} schema={teacherSchema} />
            <SelectInput label={"المرحلة الدراسية :"} placeholder={"اختر المرحلة الدراسية..."} list={selectOptions.level} name={"level"} onChange={handleSave} state={teacher} setState={setTeacher} errors={teacherErrors} setErrors={setTeacherErrors} schema={teacherSchema} />
            <SelectMultiple list={selectOptions.subjects} placeholder={"اختر اهتماماتك"} name={"subjects"} onChange={handleSave} state={teacher} setState={setTeacher} errors={teacherErrors} setErrors={setTeacherErrors} schema={teacherSchema} />

            <SelectInput placeholder={"اختر الفرع..."} label={"اسم الفرع"} name={"nameBranch"} list={selectOptions.nameBranch} onChange={handleSave} state={teacher} setState={setTeacher} errors={teacherErrors} setErrors={setTeacherErrors} schema={teacherSchema} />
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
  } catch (err) {
    console.log(err);
  }
}

export default AddTeacherForm;
