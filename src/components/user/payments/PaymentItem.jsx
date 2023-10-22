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
    console.log(props.payment);
  }, []);
  try {
    return (
      <>
        <motion.div
          initial={props.firstRender ? { opacity: 0, x: "-50px" } : false}
          animate={{ opacity: 1, x: 0, transition: { duration: 0.2 * props.index } }}
          className="products-row"
          onClick={() => {
            props.setCurrentPayment(props.payment);
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
            <span className="cell-label">رقم الدفعة:</span>
            {/* {props.payment.receiptNumber} */}
            دفتر 2
          </div>
          <div className="product-cell category">
            <span className="cell-label">رقم الدفعة:</span>
            {props.payment.receiptNumber}
          </div>
          <div className="product-cell image">
            {/* <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80" alt="product" /> */}
            <span>
              {/* {props.courses[props.branch][props.payment.courseId].teachers.map((teacher) => {
                if (teacher.id == props.payment.teacherId) return teacher.nameAr;
              })} */}
              خالد المصري
            </span>
          </div>
          <div className="product-cell category">
            <span className="cell-label">اسم الدورة:</span>
            {props.courses[props.branch][props.payment.courseId].courseName}
          </div>
          <div className="product-cell status-cell">
            <span className="cell-label">المبلغ المدفوع:</span>
            <span className="status">11000</span>
          </div>
          <div className="product-cell sales">
            <span className="cell-label">حصة المدرس:</span>
            {/* {props.courses[props.branch][props.payment.courseId].teachers.map((teacher) => {
              if (teacher.id == props.payment.teacherId) return teacher.ratio;
            })} */}
            10%
          </div>
          <div className="product-cell stock">
            <span className="cell-label">المبلغ المتبقي له:</span> <span className="status active">{props.payment.remaining ? props.payment.remaining : 9000}</span>{" "}
          </div>
          <div className="product-cell price">
            <span className="cell-label">التاريخ:</span>
            {props.payment.dateTake}
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
                {checkPermissions(props.userInformation, ["admin_training.students.student_receipts.update", "admin_training.students.student_receipts.all"], [], props.branch) && (
                  <li
                    onClick={() => {
                      props.showEdit(props.payment.id);
                    }}
                  >
                    تعديل
                  </li>
                )}
                {checkPermissions(props.userInformation, ["admin_training.students.student_receipts.delete", "admin_training.students.student_receipts.all"], [], props.branch) && (
                  <li
                    onClick={() => {
                      props.deleteReceipt(props.payment.id);
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
