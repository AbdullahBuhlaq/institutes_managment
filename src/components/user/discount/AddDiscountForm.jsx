import { useState } from "react";
import Joi from "joi";
import validateForm from "../../../functions/validateForm";
import handleSave from "../../../functions/handleSave";
import requestOptions from "../../../constants/requestOptions";
import messages from "../../../constants/messages";
import selectOptions from "../../../constants/selectOptions";
import NewInput from "../../general/NewInput";

function AddDiscountForm(props) {
  const [duringAdd, setDuringAdd] = useState(false);

  const [discount, setDiscount] = useState({
    reason: "",
    ratio: 0,
  });
  const [discountErrors, setDiscountErrors] = useState({});
  const discountSchema = {
    reason: Joi.string().required().trim().messages(messages).label("سبب الحسم"),
    ratio: Joi.number().max(100).required().precision(3).messages(messages).label("نسبة الحسم"),
  };
  const joiDiscount = Joi.object(discountSchema);

  async function addDiscount(event) {
    const isValid = await validateForm(event, joiDiscount, discount, setDiscountErrors);
    if (isValid) {
      const newData = discount;
      const infoRequestOptions = {
        ...requestOptions,
        headers: { ...requestOptions.headers, authorization: props.userInformation.token },
        body: JSON.stringify({
          ...discount,
        }),
      };
      setDuringAdd(true);
      const response = await fetch("http://localhost:3001/admin-training/discount/add-in-branch", infoRequestOptions);
      const data = await response.json();
      // const data = { success: true, data: 4 };
      if (data.success) {
        selectOptions.discounts.push({ name: newData.name, value: data.data, id: data.data });
        props.setDiscounts({ ...props.discounts, [props.branch]: { ...props.discounts[props.branch], [data.data]: { id: data.data, ...newData } } });
        props.setAddNew(false);
        props.toast.success("تمت إضافة بطاقة الحسم", {
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
          <NewInput placeholder={""} label={"سبب الحسم"} type={"text"} name={"reason"} onChange={handleSave} state={discount} setState={setDiscount} errors={discountErrors} setErrors={setDiscountErrors} schema={discountSchema} />
          <NewInput placeholder={""} label={"نسبة الحسم"} type={"number"} name={"ratio"} onChange={handleSave} state={discount} setState={setDiscount} errors={discountErrors} setErrors={setDiscountErrors} schema={discountSchema} />
        </div>
        <div className="button-container">
          <button
            disabled={duringAdd}
            onClick={async (event) => {
              const isValid = await validateForm(event, joiDiscount, discount, setDiscountErrors);
              isValid && (await addDiscount(event));
            }}
          >
            إضافة
          </button>
        </div>
      </form>
    </>
  );
}

export default AddDiscountForm;
