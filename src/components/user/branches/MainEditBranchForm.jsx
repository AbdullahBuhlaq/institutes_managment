import { useEffect, useState } from "react";
import Joi from "joi";
import validateForm from "../../../functions/validateForm";
import handleSave from "../../../functions/handleSave";
import requestOptions from "../../../constants/requestOptions";
import messages from "../../../constants/messages";
import NewInput from "../../general/NewInput";
import SelectInput from "../../general/SelectInput";
import selectOptions from "../../../constants/selectOptions";

function MainEditBranchForm(props) {
  const [duringAdd, setDuringAdd] = useState(false);

  const [branch, setBranch] = useState({
    name: props.currentEdit.name,
    country: props.currentEdit.country,
    countClass: props.currentEdit.countClass,
  });
  useEffect(() => {
    setBranch({
      name: props.currentEdit.name,
      country: props.currentEdit.country,
      countClass: props.currentEdit.countClass,
    });
  }, [props.currentEdit]);
  const [branchError, setBranchErrors] = useState({});
  const branchSchema = {
    name: Joi.string().required().trim().messages(messages).label("اسم الفرع"),
    country: Joi.string().required().trim().messages(messages).label("اسم المدينة"),
    countClass: Joi.number().required().messages(messages).label("عدد القاعات"),
  };
  const joiBranch = Joi.object(branchSchema);

  async function editBranch(event) {
    const newData = branch;
    const id = props.currentEdit.id;
    const infoRequestOptions = {
      ...requestOptions,
      headers: { ...requestOptions.headers, authorization: props.userInformation.token },
      method: "put",
      body: JSON.stringify({
        ...branch,
      }),
    };
    setDuringAdd(true);
    const response = await fetch(`http://localhost:3001/admin-training/branch/update/${id}`, infoRequestOptions);
    const data = await response.json();
    // const data = { success: true };
    if (data.success) {
      props.institute.branches[id] = { ...newData, id: id };
      props.setInstitute({ ...props.institute });
      await Promise.all(
        Object.keys(props.employees[id]).map((employee) => {
          props.employees[id][employee].branchName = newData.name;
        })
      );
      props.setCurrentEdit(false);
      props.toast.success("تم تعديل الفرع", {
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
              if (isValid) await editBranch(event);
              else {
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

export default MainEditBranchForm;
