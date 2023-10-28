import { useEffect, useState } from "react";
import selectOptions from "../../../constants/selectOptions";

function PendingStudentItem(props) {
  const [choosen, setChoosen] = useState(false);
  const [choosenForDeleting, setChoosenForDeleting] = useState(false);

  useEffect(() => {
    setChoosen(false);
  }, [props.canceled]);

  try {
    return (
      <>
        <div
          className="products-row"
          onClick={(e) => {
            if (e.target.tagName != "SELECT" && e.target.id != "cancel") {
              if (!choosenForDeleting) {
                props.addStudentToDelete(props.student.id);
                // props.setStudentsToJoin([...props.studentsToJoin, { studentId: props.student.id, discountId: discountId, state: "معلق" }]);
              } else props.deleteStudentToDelete(props.student.id);
              setChoosenForDeleting(!choosenForDeleting);
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
                  if (!choosen) {
                    await props.addStudentToEdit(props.student.id, event.target.value, props.state);
                  } else {
                    await props.editStudentToEdit(props.student.id, event.target.value, props.state);
                  }
                  setChoosen(true);
                }}
                id="my-listbox"
                style={{ padding: "2px" }}
                value={props.discountId}
              >
                <option value={-1}>لا يوجد</option>
                {Object.keys(props.discounts[props.branch]).map((item, itemIndex) => {
                  return (
                    <option key={itemIndex} value={props.discounts[props.branch][item].id}>
                      {props.discounts[props.branch][item].reason}
                    </option>
                  );
                })}
              </select>
            </form>
          </div>
          <div className="product-cell category">
            <form style={{ display: "flex", margin: "0", alignItems: "center" }}>
              <select
                onChange={async (event) => {
                  if (!choosen) {
                    console.log(props.discountId);
                    await props.addStudentToEdit(props.student.id, props.discountId, event.target.value);
                  } else {
                    await props.editStudentToEdit(props.student.id, props.discountId, event.target.value);
                  }
                  setChoosen(true);
                }}
                id="my-listbox"
                style={{ padding: "2px" }}
                value={props.state}
              >
                {selectOptions.states.map((item, itemIndex) => {
                  return (
                    <option key={itemIndex} value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </form>
          </div>

          <div
            className="product-cell category"
            id="cancel"
            onClick={async (event) => {
              await props.deleteStudentToEdit(props.student.id);
              setChoosen(false);
            }}
          >
            {choosen ? "إلغاء ✖" : ""}
          </div>
          <div className="product-cell category" style={{ color: "red" }}>
            {choosenForDeleting ? "✔" : ""}
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.log(error);
  }
}

export default PendingStudentItem;
