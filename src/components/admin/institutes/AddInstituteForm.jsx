import Joi from "joi";
import { useEffect, useState } from "react";
import NewInput from "../../general/NewInput";
import SelectInput from "../../general/SelectInput";
import messages from "../../../constants/messages";
import selectOptions from "../../../constants/selectOptions";
import requestOptions from "../../../constants/requestOptions";
import handleSave from "../../../functions/handleSave";
import validateForm from "../../../functions/validateForm";

function AddInstituteForm(props) {
  const [duringAdd, setDuringAdd] = useState(false);
  const [addDirector, setAddDirector] = useState(false);
  const [checkPassword, setCheckPassword] = useState("");

  const [institute, setInstitute] = useState({
    typeTraining: "",
    countBranch: 0,
    nameCountry: "",
    nameCenter: "",
    countClass: 0,
    fromHour: 0,
    toHour: 0,
  });
  const [instituteErrors, setInstituteErrors] = useState({});
  const instituteSchema = {
    typeTraining: Joi.string().required().messages(messages).label("نوع المركز"),
    countBranch: Joi.number().allow(null).messages(messages).label("عدد الأفرع"),
    nameCountry: Joi.string().required().min(2).max(50).trim().messages(messages).label("اسم المدينة"),
    nameCenter: Joi.string().required().min(2).max(150).trim().messages(messages).label("اسم المركز"),
    countClass: Joi.number().required().min(1).messages(messages).label("عدد القاعات"),
    fromHour: Joi.number().required().min(0).max(23).messages(messages).label("ساعة الافتتاح"),
    toHour: Joi.number().required().min(0).max(23).greater(Joi.ref("fromHour")).messages(messages).label("ساعة الإغلاق"),
  };
  const joiInstitute = Joi.object(instituteSchema);

  const [director, setDirector] = useState({
    name: "",
    gender: true,
    email: "",
    phoneNumber: "",
    username: "",
    password: "",
  });
  const [directorErrors, setDirectorErrors] = useState({});
  const directorSchema = {
    name: Joi.string().required().min(2).max(50).trim().messages(messages).label("اسم المدير"),
    gender: Joi.string().required().messages(messages).label("الجنس"),
    email: Joi.string()
      .trim()
      .pattern(/[a-zA-Z0-9]+[a-zA-Z0-9\_\.]*(@gmail\.com)$/)
      .allow(null)
      .messages({ ...messages, "string.pattern.base": "{{#label}} يجب أن يتضمن بريد Gmail, مثل user@gmail.com" })
      .label("البريد الإلكتروني"),
    phoneNumber: Joi.string()
      .trim()
      .required()
      .pattern(/^(09)(\d{8})$/)
      .messages({ ...messages, "string.pattern.base": "{{#label}} يجب أن يتضمن رقم موبايل, مثل 0987654321" })
      .label("رقم الموبايل"),
    username: Joi.string()
      .trim()
      .pattern(/^[A-Za-z]+[a-zA-Z0-9\_\.]*$/)
      .min(3)
      .max(30)
      .required()
      .messages({ ...messages, "string.pattern.base": "{{#label}} يجب أن يتضمن فقط أحرف إنجليزية وأرقام" })
      .label("اسم المستخدم"),
    password: Joi.string().required().min(8).max(50).messages(messages).label("كلمة السر"),
  };
  const joiDirector = Joi.object(directorSchema);

  async function addInstitute(event) {
    let newData = institute,
      newDirector = director;
    setDuringAdd(true);
    const infoRequestOptions = {
      ...requestOptions,
      headers: { ...requestOptions.headers, authorization: props.userInformation.token },
      body: JSON.stringify({
        ...newData,
        ...newDirector,
      }),
    };
    const response = await fetch(`${import.meta.env.VITE_URL}/admin-site/training-center/new-training`, infoRequestOptions);
    const data = await response.json();
    if (data.success) {
      props.setInstitutes({ ...props.institutes, [data.data.center]: { ...newData, name: newData.nameCenter, id: data.data.center, user: { ...newDirector, id: data.data.user }, branches: { [data.data.branch]: { country: newData.nameCountry, countClass: newData.countClass, name: "فرع 1", id: data.data.branch } } } });
      props.setAddNew(false);
      props.toast.success("تمت إضافة المعهد", {
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

  const [isText, setIsText] = useState(false);
  useEffect(() => {
    director.password == checkPassword ? setDirectorErrors({ ...directorErrors, checkPassword: "" }) : setDirectorErrors({ ...directorErrors, checkPassword: "كلمة المرور غير متطابقة" });
  }, [director.password]);

  return (
    <>
      {addDirector ? (
        <>
          <form>
            <div className="row">
              <NewInput placeholder={""} label={"اسم المدير"} type={"text"} name={"name"} onChange={handleSave} state={director} setState={setDirector} errors={directorErrors} setErrors={setDirectorErrors} schema={directorSchema} />
              <NewInput placeholder={""} label={"اسم المستخدم"} type={"text"} name={"username"} onChange={handleSave} state={director} setState={setDirector} errors={directorErrors} setErrors={setDirectorErrors} schema={directorSchema} />
              <NewInput placeholder={""} label={"البريد"} type={"text"} name={"email"} onChange={handleSave} state={director} setState={setDirector} errors={directorErrors} setErrors={setDirectorErrors} schema={directorSchema} />
              <NewInput placeholder={""} label={"موبايل"} type={"tel"} name={"phoneNumber"} onChange={handleSave} state={director} setState={setDirector} errors={directorErrors} setErrors={setDirectorErrors} schema={directorSchema} />

              <NewInput placeholder={""} label={"كلمة المرور"} type={"password"} name={"password"} onChange={handleSave} state={director} setState={setDirector} errors={directorErrors} setErrors={setDirectorErrors} schema={directorSchema} />
              <div className="column" style={{ position: "relative" }}>
                <h3>{"تأكيد كلمة المرور"}</h3>
                <input
                  type={isText ? "text" : "password"}
                  name={"checkPassword"}
                  id={"checkPassword"}
                  value={checkPassword}
                  onChange={async (event) => {
                    setCheckPassword(event.target.value);
                    event.target.value == director.password ? setDirectorErrors({ ...directorErrors, checkPassword: "" }) : setDirectorErrors({ ...directorErrors, checkPassword: "كلمة المرور غير متطابقة" });
                  }}
                  spellCheck="false"
                  dir="rtl"
                  required
                />
                <div className="validating-error">{directorErrors["checkPassword"] && <div>{directorErrors["checkPassword"]}</div>}</div>
                <span
                  style={{ position: "absolute", left: "15px", top: "47px", cursor: "pointer" }}
                  onClick={() => {
                    setIsText(!isText);
                  }}
                >
                  {isText ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>}
                </span>
              </div>
              <SelectInput label={"الجنس :"} placeholder={"اختر الجنس..."} list={selectOptions.gender} name={"gender"} onChange={handleSave} state={director} setState={setDirector} errors={directorErrors} setErrors={setDirectorErrors} schema={directorSchema} />
            </div>

            <div className="button-container">
              <button
                onClick={async (event) => {
                  event.preventDefault();
                  setAddDirector(false);
                }}
              >
                عودة
              </button>
              <button
                disabled={duringAdd}
                onClick={async (event) => {
                  event.preventDefault();
                  let isValid = await validateForm(event, joiDirector, director, setDirectorErrors);
                  if (checkPassword != director.password) {
                    setDirectorErrors({ ...directorErrors, checkPassword: "كلمة المرور غير متطابقة" });
                    isValid = false;
                  } else {
                    setDirectorErrors({ ...directorErrors, checkPassword: "" });
                  }
                  if (isValid) await addInstitute(event);
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
      ) : (
        <>
          <form>
            <div className="row">
              <NewInput placeholder={""} label={"اسم المركز"} type={"text"} name={"nameCenter"} onChange={handleSave} state={institute} setState={setInstitute} errors={instituteErrors} setErrors={setInstituteErrors} schema={instituteSchema} />
              <SelectInput label={"نوع المركز :"} placeholder={"اختر نوع المركز..."} list={selectOptions.typeTraining} name={"typeTraining"} onChange={handleSave} state={institute} setState={setInstitute} errors={instituteErrors} setErrors={setInstituteErrors} schema={instituteSchema} />
              <NewInput placeholder={""} label={"عدد القاعات"} type={"number"} name={"countClass"} onChange={handleSave} state={institute} setState={setInstitute} errors={instituteErrors} setErrors={setInstituteErrors} schema={instituteSchema} />
              <NewInput placeholder={""} label={"ساعة الافتتاح"} type={"number"} name={"fromHour"} onChange={handleSave} state={institute} setState={setInstitute} errors={instituteErrors} setErrors={setInstituteErrors} schema={instituteSchema} />

              <NewInput placeholder={""} label={"ساعة الإغلاق"} type={"number"} name={"toHour"} onChange={handleSave} state={institute} setState={setInstitute} errors={instituteErrors} setErrors={setInstituteErrors} schema={instituteSchema} />
              <NewInput placeholder={""} label={"عدد الأفرع"} type={"number"} name={"countBranch"} onChange={handleSave} state={institute} setState={setInstitute} errors={instituteErrors} setErrors={setInstituteErrors} schema={instituteSchema} />
              <SelectInput label={"المدينة :"} placeholder={"اختر المدينة..."} list={selectOptions.country} name={"nameCountry"} onChange={handleSave} state={institute} setState={setInstitute} errors={instituteErrors} setErrors={setInstituteErrors} schema={instituteSchema} />
            </div>

            <div className="button-container">
              <button
                onClick={async (event) => {
                  event.preventDefault();
                  const isValid = await validateForm(event, joiInstitute, institute, setInstituteErrors);
                  if (isValid) setAddDirector(true);
                  else {
                    props.toast.info("أدخل جميع المعلومات بشكل صحيح", {
                      position: props.toast.POSITION.TOP_CENTER,
                    });
                  }
                }}
              >
                متابعة
              </button>
            </div>
          </form>
        </>
      )}
    </>
  );
}

export default AddInstituteForm;
