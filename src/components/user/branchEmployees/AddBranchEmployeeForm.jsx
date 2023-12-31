import { useState, useEffect } from "react";
import Joi from "joi";
import validateForm from "../../../functions/validateForm";
import handleSave from "../../../functions/handleSave";
import requestOptions from "../../../constants/requestOptions";
import messages from "../../../constants/messages";
import NewInput from "../../general/NewInput";
import selectOptions from "../../../constants/selectOptions";
import SelectInput from "../../general/SelectInput";

function AddBranchEmployeeForm(props) {
  const [duringAdd, setDuringAdd] = useState(false);
  const [checkPassword, setCheckPassword] = useState("");

  const [employee, setEmployee] = useState({
    name: "",
    gender: true,
    // email: "",
    phoneNumber: "",
    username: "",
    password: "",
    salary: 0,
    nameRole: "",
  });
  const [employeeErrors, setEmployeeErrors] = useState({});
  const employeeSchema = {
    name: Joi.string().required().min(2).max(50).trim().messages(messages).label("اسم المدير"),
    gender: Joi.string().required().messages(messages).label("الجنس"),
    // email: Joi.string()
    //   .trim()
    //   .pattern(/[a-zA-Z0-9]+[a-zA-Z0-9\_\.]*(@gmail\.com)$/)
    //   .allow(null)
    //   .messages({ ...messages, "string.pattern.base": "{{#label}} يجب أن يتضمن بريد Gmail, مثل user@gmail.com" })
    //   .label("البريد الإلكتروني"),
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
    salary: Joi.number().required().messages(messages).label("الراتب"),
    nameRole: Joi.string().trim().required().messages(messages).label("الدور"),
  };
  const joiEmployee = Joi.object(employeeSchema);

  async function addEmployee(event) {
    const newData = employee;
    const infoRequestOptions = {
      ...requestOptions,
      headers: { ...requestOptions.headers, authorization: props.userInformation.token },
      body: props.userInformation.branch
        ? JSON.stringify({
            ...employee,
          })
        : JSON.stringify({
            ...employee,
            nameBranch: props.branchName,
          }),
    };
    setDuringAdd(true);
    const response = await fetch(props.userInformation.branch ? `${import.meta.env.VITE_URL}/admin-training/emp/add-in-branch` : `${import.meta.env.VITE_URL}/admin-training/emp/add`, infoRequestOptions);
    const data = await response.json();
    // const data = { id: 4, success: true };
    if (data.success) {
      const roleId = Object.keys(props.roles).filter((role) => {
        if (props.roles[role].name == newData.nameRole) return role;
      });
      props.setEmployees({ ...props.employees, [props.branch]: { ...props.employees[props.branch], [data.data]: { id: data.data, ...newData, roleId: roleId, branchName: props.branchName } } });
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

  const [isText, setIsText] = useState(false);
  useEffect(() => {
    employee.password == checkPassword ? setEmployeeErrors({ ...employeeErrors, checkPassword: "" }) : setEmployeeErrors({ ...employeeErrors, checkPassword: "كلمة المرور غير متطابقة" });
  }, [employee.password]);
  return (
    <>
      <form>
        <div className="row">
          <NewInput placeholder={""} label={"اسم الموظف"} type={"text"} name={"name"} onChange={handleSave} state={employee} setState={setEmployee} errors={employeeErrors} setErrors={setEmployeeErrors} schema={employeeSchema} />
          <NewInput placeholder={""} label={"اسم المستخدم"} type={"text"} name={"username"} onChange={handleSave} state={employee} setState={setEmployee} errors={employeeErrors} setErrors={setEmployeeErrors} schema={employeeSchema} />
          {/* <NewInput placeholder={""} label={"البريد"} type={"text"} name={"email"} onChange={handleSave} state={employee} setState={setEmployee} errors={employeeErrors} setErrors={setEmployeeErrors} schema={employeeSchema} /> */}
          <NewInput placeholder={""} label={"موبايل"} type={"tel"} name={"phoneNumber"} onChange={handleSave} state={employee} setState={setEmployee} errors={employeeErrors} setErrors={setEmployeeErrors} schema={employeeSchema} />

          <NewInput placeholder={""} label={"كلمة المرور"} type={"password"} name={"password"} onChange={handleSave} state={employee} setState={setEmployee} errors={employeeErrors} setErrors={setEmployeeErrors} schema={employeeSchema} />
          <div className="column" style={{ position: "relative" }}>
            <h3>{"تأكيد كلمة المرور"}</h3>
            <input
              type={isText ? "text" : "password"}
              name={"checkPassword"}
              id={"checkPassword"}
              value={checkPassword}
              onChange={async (event) => {
                setCheckPassword(event.target.value);
                event.target.value == employee.password ? setEmployeeErrors({ ...employeeErrors, checkPassword: "" }) : setEmployeeErrors({ ...employeeErrors, checkPassword: "كلمة المرور غير متطابقة" });
              }}
              spellCheck="false"
              dir="rtl"
              required
            />
            <div className="validating-error">{employeeErrors["checkPassword"] && <div>{employeeErrors["checkPassword"]}</div>}</div>
            <span
              style={{ position: "absolute", left: "15px", top: "47px", cursor: "pointer" }}
              onClick={() => {
                setIsText(!isText);
              }}
            >
              {isText ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>}
            </span>
          </div>
          <NewInput placeholder={""} label={"الراتب الشهري"} type={"number"} name={"salary"} onChange={handleSave} state={employee} setState={setEmployee} errors={employeeErrors} setErrors={setEmployeeErrors} schema={employeeSchema} />
          <SelectInput label={"الجنس :"} placeholder={"اختر الجنس..."} list={selectOptions.gender} name={"gender"} onChange={handleSave} state={employee} setState={setEmployee} errors={employeeErrors} setErrors={setEmployeeErrors} schema={employeeSchema} />

          <SelectInput label={"الدور :"} placeholder={"اختر الدور..."} list={selectOptions.roles} name={"nameRole"} onChange={handleSave} state={employee} setState={setEmployee} errors={employeeErrors} setErrors={setEmployeeErrors} schema={employeeSchema} />
        </div>

        <div className="button-container">
          <button
            disabled={duringAdd}
            onClick={async (event) => {
              let isValid = await validateForm(event, joiEmployee, employee, setEmployeeErrors);
              if (checkPassword != employee.password) {
                setEmployeeErrors((employeeErrors) => ({ ...employeeErrors, checkPassword: "كلمة المرور غير متطابقة" }));
                isValid = false;
              } else {
                setEmployeeErrors((employeeErrors) => ({ ...employeeErrors, checkPassword: "" }));
              }
              if (isValid) await addEmployee(event);
              else {
                props.toast.info("أدخل جميع المعلومات بشكل صحيح", {
                  position: props.toast.POSITION.TOP_CENTER,
                });
              }
            }}
          >
            add
          </button>
        </div>
      </form>
    </>
  );
}

export default AddBranchEmployeeForm;
