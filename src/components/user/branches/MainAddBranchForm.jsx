import { useState } from "react";
import Joi from "joi";
import validateForm from "../../../functions/validateForm";
import handleSave from "../../../functions/handleSave";
import requestOptions from "../../../constants/requestOptions";
import messages from "../../../constants/messages";
import NewInput from "../../general/NewInput";
import selectOptions from "../../../constants/selectOptions";
import SelectInput from "../../general/SelectInput";

function MainAddBranchForm(props) {
  const [duringAdd, setDuringAdd] = useState(false);

  const [branch, setBranch] = useState({
    name: "",
    country: "",
    countClass: 0,
  });
  const [branchError, setBranchErrors] = useState({});
  const branchSchema = {
    name: Joi.string().required().trim().messages(messages).label("اسم الفرع"),
    country: Joi.string().required().trim().messages(messages).label("اسم المدينة"),
    countClass: Joi.number().required().messages(messages).label("عدد القاعات"),
  };
  const joiBranch = Joi.object(branchSchema);

  async function addBranch(event) {
    const newData = branch;
    const infoRequestOptions = {
      ...requestOptions,
      headers: { ...requestOptions.headers, authorization: props.userInformation.token },
      body: JSON.stringify({
        ...branch,
      }),
    };
    setDuringAdd(true);
    const response = await fetch("http://localhost:3001/admin-training/branch/add", infoRequestOptions);
    const data = await response.json();
    // const data = { success: true };
    if (data.success) {
      props.setInstitute({ ...props.institute, branches: { ...props.institute.branches, [data.data]: { ...newData, id: data.data } } });
      props.setEmployees({ ...props.employees, [data.data]: {} });
      props.setAddNew(false);
      props.toast.success("تمت إضافة الفرع", {
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
          <NewInput placeholder={""} label={"اسم الفرع"} type={"text"} name={"name"} onChange={handleSave} state={branch} setState={setBranch} errors={branchError} setErrors={setBranchErrors} schema={branchSchema} />
          <NewInput placeholder={""} label={"عدد القاعات"} type={"number"} name={"countClass"} onChange={handleSave} state={branch} setState={setBranch} errors={branchError} setErrors={setBranchErrors} schema={branchSchema} />
          <SelectInput label={"المدينة :"} placeholder={"اختر المدينة..."} list={selectOptions.country} name={"country"} onChange={handleSave} state={branch} setState={setBranch} errors={branchError} setErrors={setBranchErrors} schema={branchSchema} />
        </div>
        <div className="button-container">
          <button
            disabled={duringAdd}
            onClick={async (event) => {
              const isValid = await validateForm(event, joiBranch, branch, setBranchErrors);
              if (isValid) await addBranch(event);
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

export default MainAddBranchForm;
