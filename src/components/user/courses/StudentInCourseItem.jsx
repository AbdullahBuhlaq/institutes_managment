import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import colorList from "../../../constants/colorList";
import textColorListTitle from "../../../constants/textColorListTitle";
import handleSave from "../../../functions/handleSave";
import Joi from "joi";
import messages from "../../../constants/messages";
import SelectInput from "../../general/SelectInput";
import selectOptions from "../../../constants/selectOptions";
import requestOptions from "../../../constants/requestOptions";

function StudentInCourseItem(props) {
  const [discountId, setDiscountId] = useState(-1);
  const [choosen, setChoosen] = useState(false);

  //   async function addStudentToCourse() {
  //     const newData = studentJoin;
  //     const infoRequestOptions = {
  //       ...requestOptions,
  //       headers: { ...requestOptions.headers, authorization: props.userInformation.token },
  //       body: JSON.stringify({
  //         ...studentJoin,
  //         studentId: props.student.id,
  //         courseId: props.course.id,
  //       }),
  //     };
  //     const response = await fetch(`${import.meta.env.VITE_URL}/admin-training/discount/add-in-branch`, infoRequestOptions);
  //     const data = await response.json();
  //     // const data = { success: true, data: 4 };
  //     if (data.success) {
  //       console.log(data);
  //       // selectOptions.discounts.push({ name: newData.name, value: data.data, id: data.data });
  //       // props.setDiscounts({ ...props.discounts, [props.branch]: { ...props.discounts[props.branch], [data.data]: { id: data.data, ...newData } } });
  //       // props.setAddNew(false);
  //       // props.toast.success("تمت إضافة بطاقة الحسم", {
  //       //   position: props.toast.POSITION.TOP_CENTER,
  //       // });
  //     } else {
  //       console.log(data.error);
  //       props.toast.error(data.error, {
  //         position: props.toast.POSITION.TOP_CENTER,
  //       });
  //     }
  //   }

  try {
    return (
      <>
        <div
          className="products-row"
          onClick={(e) => {
            if (e.target.tagName != "SELECT") {
              if (!choosen) {
                props.addStudentToJoin(props.student.id, discountId);
                // props.setStudentsToJoin([...props.studentsToJoin, { studentId: props.student.id, discountId: discountId, state: "معلق" }]);
              } else props.deleteStudentToJoin(props.student.id);
              setChoosen(!choosen);
            }
          }}
        >
          <div className="product-cell category">{props.student.nameAr}</div>
          <div className="product-cell category">{props.student.nameEn}</div>
          <div className="product-cell category">{props.student.phone}</div>
          <div className="product-cell category">{props.student.gender}</div>
          <div className="product-cell category">{props.student.level}</div>
          <div className="product-cell category">
            <form style={{ display: "flex", margin: "0", alignItems: "center" }}>
              <select
                onChange={async (event) => {
                  setDiscountId(event.target.value);
                  props.editStudentToJoin(props.student.id, event.target.value);
                }}
                id="my-listbox"
                style={{ padding: "2px" }}
                value={discountId}
              >
                <option value="-1">لا يوجد</option>
                {selectOptions.discountsObject[props.branch].map((item, itemIndex) => {
                  return (
                    <option key={itemIndex} value={item.value}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </form>
          </div>
          <div className="product-cell category" style={{ color: "green" }}>
            {choosen ? "✔" : ""}
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.log(error);
  }
}

export default StudentInCourseItem;
