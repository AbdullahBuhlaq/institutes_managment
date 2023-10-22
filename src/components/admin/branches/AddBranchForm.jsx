import Joi from "joi";
import { useState } from "react";
import Input from "../../general/Input";
import messages from "../../../constants/messages";
import requestOptions from "../../../constants/requestOptions";
import handleSave from "../../../functions/handleSave";
import validateForm from "../../../functions/validateForm";

function AddBranchForm(props) {
  const [duringAdd, setDuringAdd] = useState(false);

  const [branch, setBranch] = useState({
    name: "",
    countryName: "",
    countClass: 0,
  });
  const [branchError, setBranchErrors] = useState({});
  const branchSchema = {
    name: Joi.string().required().trim().messages(messages).label("اسم الفرع"),
    countryName: Joi.string().required().trim().messages(messages).label("اسم المدينة"),
    countClass: Joi.number().required().messages(messages).label("عدد القاعات"),
  };
  const joiBranch = Joi.object(branchSchema);

  async function addBranch(event) {
    const newData = branch;
    const infoRequestOptions = {
      ...requestOptions,
      body: JSON.stringify({
        ...branch,
      }),
    };
    setDuringAdd(true);
    // const response = await fetch(`${process.env.REACT_APP_URL_STRING}/admin-training/branch/add`, infoRequestOptions);
    // const data = await response.json();
    const data = { success: true, id: 90 };
    if (data.success) {
      console.log(data);
      props.setInstitutes({ ...props.institutes, [props.institute.id]: { ...props.institute, branches: { ...props.institute.branches, [data.id]: { ...newData, id: data.id, country: newData.countryName } } } });
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
        <Input label={"اسم الفرع"} type={"text"} name={"name"} onChange={handleSave} state={branch} setState={setBranch} errors={branchError} setErrors={setBranchErrors} schema={branchSchema} />
        <Input label={"عدد القاعات"} type={"number"} name={"countClass"} onChange={handleSave} state={branch} setState={setBranch} errors={branchError} setErrors={setBranchErrors} schema={branchSchema} />
        <div className="row title">
          <label htmlFor="countryName">المدينة </label>
          <select
            name="countryName"
            onChange={async (event) => {
              await handleSave(event, branch, setBranch, branchError, setBranchErrors, branchSchema);
            }}
          >
            <option value="">اختر مدينة ...</option>
            {props.countries.map((countryItem, countryIndex) => {
              return (
                <option key={countryIndex} value={countryItem}>
                  {countryItem}
                </option>
              );
            })}
          </select>
          {branchError["countryName"] && <div className="validating-error">{branchError["countryName"]}</div>}
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

export default AddBranchForm;
