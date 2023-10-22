import { useEffect, useState } from "react";
import Joi from "joi";
import { useParams } from "react-router-dom";
import validateForm from "../functions/validateForm";
import handleSave from "../functions/handleSave";
import requestOptions from "../constants/requestOptions";
import messages from "../constants/messages";
import selectOptions from "../constants/selectOptions";
import NewInput from "../components/general/NewInput";
import SelectInput from "../components/general/SelectInput";

function StudentJoin(props) {
  const params = useParams();

  const [isAvailable, setIsAvailable] = useState(0);
  const [information, setInformation] = useState({});

  async function getInformation() {
    const response = await fetch(`${import.meta.env.VITE_URL}/admin-training/courses/form/getInformation/${params["courseId"]}`, { ...requestOptions, method: "GET" });
    const data = await response.json();
    if (data.success) {
      if (data.available) {
        setInformation(data.data);
        setIsAvailable(1);
      } else {
        setInformation(data.data);
        setIsAvailable(2);
      }
    } else {
      console.log(data.error);
      props.toast.error(data.error, {
        position: props.toast.POSITION.TOP_CENTER,
      });
    }
  }
  useEffect(() => {
    try {
      getInformation();
    } catch (e) {
      console.log(e);
    }
  }, []);
  const [duringAdd, setDuringAdd] = useState(false);

  const [student, setStudent] = useState({
    nameArab: "",
    nameEng: "",
    gender: true,
    phoneNumber: "",
    level: "",
  });
  const [studentErrors, setStudentErrors] = useState({});
  const studentSchema = {
    nameArab: Joi.string().required().min(2).max(50).trim().messages(messages).label("الاسم بالعربي"),
    nameEng: Joi.string().min(2).max(50).trim().messages(messages).label("الاسم بالإنجليزي"),
    gender: Joi.boolean().required().messages(messages).label("الجنس"),
    phoneNumber: Joi.string()
      .trim()
      .required()
      .pattern(/^(09)(\d{8})$/)
      .messages({ ...messages, "string.pattern.base": "{{#label}} يجب أن يتضمن رقم موبايل, مثل 0987654321" })
      .label("الموبايل"),
    level: Joi.string().required().trim().max(50).messages(messages).label("المرحلة"),
  };
  const joiStudent = Joi.object(studentSchema);

  async function addStudent(event) {
    const isValid = await validateForm(event, joiStudent, student, setStudentErrors);
    if (isValid) {
      const newData = student;
      const infoRequestOptions = {
        ...requestOptions,
        body: JSON.stringify({
          ...student,
        }),
      };
      setDuringAdd(true);
      // const response = await fetch(`${import.meta.env.VITE_URL}/admin-training/courses/form/enroll/${params["courseString"]}`, infoRequestOptions);
      // const data = await response.json();
      const data = { success: true };
      if (data.success) {
        props.toast.success("تم التسجيل بنجاح, الرجاء انتظار القبول من المعهد.", {
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
      {isAvailable == 1 ? (
        <>
          <div className={"popup-box show"}>
            <div className="new-form-container">
              <h1>{"تسجيل على دورة " + information.courseName + " في معهد " + information.instituteName + " فرع " + information.branchName}</h1>
              <form>
                <div className="row">
                  <NewInput placeholder={""} label={"الاسم بالعربية"} type={"text"} name={"nameArab"} onChange={handleSave} state={student} setState={setStudent} errors={studentErrors} setErrors={setStudentErrors} schema={studentSchema} />
                  <NewInput placeholder={""} label={"الاسم بالإنجليزية"} type={"text"} name={"nameEng"} onChange={handleSave} state={student} setState={setStudent} errors={studentErrors} setErrors={setStudentErrors} schema={studentSchema} />
                  <SelectInput label={"المرحلة الدراسية :"} placeholder={"اختر المرحلة الدراسية..."} list={selectOptions.level} name={"level"} onChange={handleSave} state={student} setState={setStudent} errors={studentErrors} setErrors={setStudentErrors} schema={studentSchema} />
                  <NewInput placeholder={"رقم الموبايل:"} label={"موبايل"} type={"tel"} name={"phoneNumber"} onChange={handleSave} state={student} setState={setStudent} errors={studentErrors} setErrors={setStudentErrors} schema={studentSchema} />
                  <SelectInput label={"الجنس :"} placeholder={"اختر الجنس..."} list={selectOptions.boolGender} name={"gender"} onChange={handleSave} state={student} setState={setStudent} errors={studentErrors} setErrors={setStudentErrors} schema={studentSchema} />
                </div>
                <div className="button-container">
                  <button
                    disabled={duringAdd}
                    onClick={async (event) => {
                      const isValid = await validateForm(event, joiStudent, student, setStudentErrors);
                      isValid && (await addStudent(event));
                    }}
                  >
                    تسجيل
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : isAvailable == 2 ? (
        <>
          <div className={"popup-box show"}>
            <div className="new-form-container">
              <span>تم إغلاق التسجيل على الدورة</span>
            </div>
          </div>
        </>
      ) : (
        "loading..."
      )}
    </>
  );
}

export default StudentJoin;
