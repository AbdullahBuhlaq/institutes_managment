import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import colorList from "../../../constants/colorList";
import textColorListTitle from "../../../constants/textColorListTitle";
import checkPermissions from "../../../functions/checkPermissions";
function ReceiptItem(props) {
  const [drop, setDrop] = useState(false);
  const ref = useRef();
  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (e.target.tagName != "BUTTON" || e.target != ref.current) {
        setDrop(false);
      }
    });
  }, []);
  try {
    return (
      <>
        <motion.div
          initial={props.firstRender ? { opacity: 0, x: "-50px" } : false}
          animate={{ opacity: 1, x: 0, transition: { duration: 0.2 * props.index } }}
          className="products-row"
          onClick={() => {
            props.setCurrentReceipt(props.receipt);
          }}
        >
          <button className="cell-more-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-vertical">
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="12" cy="5" r="1"></circle>
              <circle cx="12" cy="19" r="1"></circle>
            </svg>
          </button>
          <div className="product-cell category">
            <span className="cell-label">الدفتر:</span>
            {props.notebooks[props.branch][props.receipt.notebookId].name}
          </div>
          <div className="product-cell category">
            <span className="cell-label">رقم الدفعة:</span>
            {props.receipt.receiptNumber}
          </div>
          <div className="product-cell category">
            <span>
              {props.courses[props.branch][props.receipt.courseId].teachers.map((teacher) => {
                if (teacher.id == props.receipt.teacherId) return teacher.nameAr;
              })}
            </span>
          </div>
          <div className="product-cell category">
            <span className="cell-label">اسم الدورة:</span>
            {props.courses[props.branch][props.receipt.courseId].courseName}
          </div>
          <div className="product-cell category">
            <span className="cell-label">المبلغ المدفوع:</span>
            <span className="status">{props.receipt.cost}</span>
          </div>
          <div className="product-cell category">
            <span className="cell-label">حصة المدرس:</span>
            {props.courses[props.branch][props.receipt.courseId].teachers.map((teacher) => {
              if (teacher.id == props.receipt.teacherId) return teacher.ratio;
            })}
          </div>
          <div className="product-cell category">
            <span className="cell-label">المبلغ المتبقي له:</span> <span className="status active">{props.receipt.remaining ? props.receipt.remaining : 20}</span>{" "}
          </div>
          <div className="product-cell price">
            <span className="cell-label">التاريخ:</span>
            {new Date(props.receipt.dateTake).toLocaleString("default", { month: "numeric", day: "numeric", year: "numeric" })}
          </div>
          <div className="product-cell option">
            <span className="cell-label">خيارات إضافية :</span>

            <div className="dropdown">
              <button
                className="dropbtn"
                onClick={() => {
                  setDrop(true);
                }}
                ref={ref}
              >
                •••
              </button>
              <ul id="myDropdown" className={"dropdown-content" + (drop ? " show" : "")}>
                {checkPermissions(props.userInformation, ["admin_training.teachers.teachers_receipts.update", "admin_training.teachers.teachers_receipts.all"], [], props.branch) && (
                  <li
                    onClick={() => {
                      props.showEdit(props.receipt.id);
                    }}
                  >
                    تعديل
                  </li>
                )}
                {checkPermissions(props.userInformation, ["admin_training.teachers.teachers_receipts.delete", "admin_training.teachers.teachers_receipts.all"], [], props.branch) && (
                  <li
                    onClick={() => {
                      props.deleteReceipt(props.receipt.id);
                    }}
                  >
                    حذف
                  </li>
                )}
              </ul>
            </div>
          </div>
        </motion.div>
      </>
    );
  } catch (error) {
    console.log(error);
  }
}

export default ReceiptItem;
