import Joi from "joi";
import { useEffect, useState, Fragment } from "react";
import NewInput from "../../general/NewInput";
import SelectInput from "../../general/SelectInput";
import messages from "../../../constants/messages";
import selectOptions from "../../../constants/selectOptions";
import requestOptions from "../../../constants/requestOptions";
import handleSave from "../../../functions/handleSave";
import validateForm from "../../../functions/validateForm";

function EditEmployeeForm(props) {
  const [duringAdd, setDuringAdd] = useState(false);

  const [employee, setEmployee] = useState({
    name: props.currentEdit.name,
    gender: props.currentEdit.gender,
    // email: props.currentEdit.email,
    phoneNumber: props.currentEdit.phoneNumber,
    username: props.currentEdit.username,
    // password: props.currentEdit.password,
    salary: props.currentEdit.salary,
    nameRole: props.roles[props.currentEdit.roleId].name,
  });

  useEffect(() => {
    setEmployee({
      name: props.currentEdit.name,
      gender: props.currentEdit.gender,
      // email: props.currentEdit.email,
      phoneNumber: props.currentEdit.phoneNumber,
      username: props.currentEdit.username,
      // password: props.currentEdit.password,
      salary: props.currentEdit.salary,
      nameRole: props.roles[props.currentEdit.roleId].name,
    });
  }, [props.currentEdit]);
  const [employeeErrors, setEmployeeErrors] = useState({});
  const employeeSchema = {
    name: Joi.string().required().min(2).max(50).trim().messages(messages).label("اسم المدير"),
    gender: Joi.boolean().required().messages(messages).label("الجنس"),
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
    // password: Joi.string().required().min(8).max(50).messages(messages).label("كلمة السر"),
    salary: Joi.number().required().messages(messages).label("الراتب"),
    nameRole: Joi.string().trim().required().messages(messages).label("الدور"),
  };
  const joiEmployee = Joi.object(employeeSchema);

  async function editEmployee(event) {
    const newData = employee;
    const id = props.currentEdit.id;
    const infoRequestOptions = {
      ...requestOptions,
      headers: { ...requestOptions.headers, authorization: props.userInformation.token },
      method: "put",
      body: JSON.stringify({
        ...employee,
      }),
    };
    setDuringAdd(true);
    const response = await fetch(`${import.meta.env.VITE_URL}/admin-site/emp/update/${id}`, infoRequestOptions);
    const data = await response.json();
    if (data.success) {
      const roleId = await Promise.all(
        Object.keys(props.roles).filter((role) => {
          if (props.roles[role].name == newData.nameRole) return role;
        })
      );
      props.setEmployees({ ...props.employees, [id]: { ...newData, id: id, roleId: roleId[0] } });
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

  return (
    <>
      <form>
        <div className="row">
          <NewInput placeholder={""} label={"اسم الموظف"} type={"text"} name={"name"} onChange={handleSave} state={employee} setState={setEmployee} errors={employeeErrors} setErrors={setEmployeeErrors} schema={employeeSchema} />
          <NewInput placeholder={""} label={"اسم المستخدم"} type={"text"} name={"username"} onChange={handleSave} state={employee} setState={setEmployee} errors={employeeErrors} setErrors={setEmployeeErrors} schema={employeeSchema} />
          {/* <NewInput placeholder={''} label={"البريد"} type={"text"} name={"email"} onChange={handleSave} state={employee} setState={setEmployee} errors={employeeErrors} setErrors={setEmployeeErrors} schema={employeeSchema} /> */}
          <NewInput placeholder={""} label={"موبايل"} type={"tel"} name={"phoneNumber"} onChange={handleSave} state={employee} setState={setEmployee} errors={employeeErrors} setErrors={setEmployeeErrors} schema={employeeSchema} />
          {/* <NewInput placeholder={''} label={""} type={"password"} name={"password"} onChange={handleSave} state={employee} setState={setEmployee} errors={employeeErrors} setErrors={setEmployeeErrors} schema={employeeSchema} /> */}
          <NewInput placeholder={""} label={"الراتب الشهري"} type={"number"} name={"salary"} onChange={handleSave} state={employee} setState={setEmployee} errors={employeeErrors} setErrors={setEmployeeErrors} schema={employeeSchema} />
          <SelectInput label={"الجنس :"} placeholder={"اختر الجنس..."} list={selectOptions.gender} name={"gender"} onChange={handleSave} state={employee} setState={setEmployee} errors={employeeErrors} setErrors={setEmployeeErrors} schema={employeeSchema} />

          <SelectInput label={"الدور :"} placeholder={"اختر الدور..."} list={selectOptions.roles} name={"nameRole"} onChange={handleSave} state={employee} setState={setEmployee} errors={employeeErrors} setErrors={setEmployeeErrors} schema={employeeSchema} />
        </div>

        <div className="button-container">
          <button
            disabled={duringAdd}
            onClick={async (event) => {
              const isValid = await validateForm(event, joiEmployee, employee, setEmployeeErrors);
              if (isValid) await editEmployee(event);
              else {
                console.log("heo");
                props.toast.info("أدخل جميع المعلومات بشكل صحيح", {
                  position: props.toast.POSITION.TOP_CENTER,
                });
              }
            }}
          >
            حفظ
          </button>
        </div>
      </form>
    </>
  );
}

export default EditEmployeeForm;
