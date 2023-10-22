import { useEffect, useState } from "react";
import Joi from "joi";
import validateForm from "../../../functions/validateForm";
import handleSave from "../../../functions/handleSave";
import requestOptions from "../../../constants/requestOptions";
import messages from "../../../constants/messages";
import NewInput from "../../general/NewInput";

function EditDiscountForm(props) {
  const [duringAdd, setDuringAdd] = useState(false);
  const [discount, setDiscount] = useState({
    reason: props.currentEdit.reason,
    ratio: props.currentEdit.ratio,
  });

  useEffect(() => {
    setDiscount({
      reason: props.currentEdit.reason,
      ratio: props.currentEdit.ratio,
    });
  }, [props.currentEdit]);
  const [discountErrors, setDiscountErrors] = useState({});
  const discountSchema = {
    reason: Joi.string().required().trim().messages(messages).label("سبب الحسم"),
    ratio: Joi.number().max(100).required().precision(3).messages(messages).label("نسبة الحسم"),
  };
  const joiDiscount = Joi.object(discountSchema);

  async function editDiscount(event) {
    const isValid = await validateForm(event, joiDiscount, discount, setDiscountErrors);
    if (isValid) {
      const newData = discount;
      const id = props.currentEdit.id;
      const infoRequestOptions = {
        ...requestOptions,
        method: "put",
        headers: { ...requestOptions.headers, authorization: props.userInformation.token },
        body: JSON.stringify({
          ...discount,
        }),
      };
      setDuringAdd(true);
      const response = await fetch(`${process.env.REACT_APP_URL_STRING}/admin-training/discount/update-in-branch/${id}`, infoRequestOptions);
      const data = await response.json();
      // const data = { success: true };
      if (data.success) {
        props.setDiscounts({ ...props.discounts, [props.branch]: { ...props.discounts[props.branch], [id]: { id: id, ...newData } } });
        props.setCurrentEdit(false);
        props.toast.success("تم تعديل بطاقة الحسم", {
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
              isValid && (await editDiscount(event));
            }}
          >
            حفظ
          </button>
        </div>
      </form>
    </>
  );
}

export default EditDiscountForm;
