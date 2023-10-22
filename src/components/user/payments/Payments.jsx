import PaymentItem from "./PaymentItem";
import { useEffect, useState, useRef } from "react";
import requestOptions from "../../../constants/requestOptions";
import EditPaymentForm from "./EditPaymentForm";
import AddPaymentForm from "./AddPaymentForm";
import { motion } from "framer-motion";
import searchOptions from "../../../constants/searchOptions";
import compare from "../../../functions/compare";
import colorList from "../../../constants/colorList";
import textColorListTitle from "../../../constants/textColorListTitle";
import checkPermissions from "../../../functions/checkPermissions";

function Payments(props) {
  const [currentEdit, setCurrentEdit] = useState(false);
  const [addNew, setAddNew] = useState(false);
  const [firstRender, setFirstRender] = useState(true);
  const [cardsNumber, setCardsNumber] = useState(1);

  useEffect(() => {
    setFirstRender(false);
  }, [props.payments]);

  const [items, setItems] = useState([]);
  useEffect(() => {
    let index = 1;
    const populateArray = async () => {
      const newArr = await Promise.all(
        Object.keys(props.payments[props.branch]).map(async (payment, paymentIndex) => {
          //   const isTrue = await compare(searchOptions["payments"][props.search.field], props.search.operator, props.payments[payment][props.search.field], props.search.word);
          //   if (isTrue) {
          index += 1;
          let curIndex = index;
          return (
            <PaymentItem
              key={paymentIndex}
              userInformation={props.userInformation}
              notebooks={props.notebooks}
              courses={props.courses}
              branch={props.branch}
              cardsNumber={cardsNumber}
              firstRender={firstRender}
              colorIndex={curIndex - 2}
              index={curIndex}
              payment={props.payments[props.branch][payment]}
              deletePayment={deletePayment}
              showEdit={showEdit}
              setAddNew={setAddNew}
              setCurrentPayment={props.setCurrentPayment}
            />
          );
          //   }
        })
      );
      setItems([...newArr]);
      setFirstRender(false);
    };

    populateArray();
  }, [props.search, props.payments, cardsNumber]);

  async function deletePayment(id) {
    const response = await fetch(`${import.meta.env.VITE_URL}/admin-training//teacher/receipts/delete/${id}`, { ...requestOptions, method: "delete", headers: { ...requestOptions.headers, authorization: props.userInformation.token } });
    const data = await response.json();
    // const data = { success: true };
    if (data.success) {
      delete props.payments[id];
      props.setPayments({ ...props.payments });
      props.toast.success("تم حذف الدفعة", {
        position: props.toast.POSITION.TOP_CENTER,
      });
    } else {
      console.log(data.error);
      props.toast.error(data.error, {
        position: props.toast.POSITION.TOP_CENTER,
      });
    }
  }

  async function showEdit(id) {
    setAddNew(false);
    setCurrentEdit(props.payments[id]);
    // show
  }

  const ref = useRef();

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      if (ref.current) setCardsNumber(parseInt((ref.current.offsetWidth - 10) / 380));
    });

    resizeObserver.observe(document.getElementById("mainh"));
  }, []);

  return (
    <>
      <div className="main-header-line" id="mainh" ref={ref}>
        <h1 className="top-title">المقبوضات</h1>
        <form>
          <div className="button-container">
            {checkPermissions(props.userInformation, ["admin_training.students.student_receipts.add", "admin_training.students.student_receipts.all"], [], props.branch) ? (
              <button
                style={{ padding: " 0 30px" }}
                onClick={(e) => {
                  e.preventDefault();
                  setAddNew(true);
                }}
              >
                إضافة +
              </button>
            ) : null}
          </div>
        </form>
      </div>
      <div className="receipts-container">
        <div className={"popup-box" + (currentEdit || addNew ? " show" : "")}>
          <div className="new-form-container">
            <button className="close-form">
              <i
                className="uil uil-times"
                onClick={() => {
                  setAddNew(false);
                  setCurrentEdit(false);
                }}
              ></i>
            </button>
            <h1>{currentEdit ? "تعديل معلومات الدفعة " : ""}</h1>
            {currentEdit && <EditPaymentForm toast={props.toast} notebooks={props.notebooks} courses={props.courses} payments={props.payments} setPayments={props.setPayments} currentEdit={currentEdit} setCurrentEdit={setCurrentEdit} branchName={props.branchName} branch={props.branch} userInformation={props.userInformation} />}
            {addNew && <AddPaymentForm toast={props.toast} notebooks={props.notebooks} courses={props.courses} payments={props.payments} setPayments={props.setPayments} setAddNew={setAddNew} branchName={props.branchName} branch={props.branch} userInformation={props.userInformation} />}
          </div>
        </div>
        <div className="products-area-wrapper tableView receipts-wrapper">
          <div className="products-header">
            <div className="product-cell category">
              الدفتر
              <button className="sort-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512">
                  <path
                    fill="currentColor"
                    d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="product-cell category">
              رقم الدفعة
              <button className="sort-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512">
                  <path
                    fill="currentColor"
                    d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="product-cell category">
              اسم الطالب
              <button className="sort-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512">
                  <path
                    fill="currentColor"
                    d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"
                  ></path>
                </svg>
              </button>
            </div>

            <div className="product-cell category">
              اسم الدورة
              <button className="sort-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512">
                  <path
                    fill="currentColor"
                    d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"
                  ></path>
                </svg>
              </button>
            </div>

            <div className="product-cell category">
              المبلغ المستلم
              <button className="sort-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512">
                  <path
                    fill="currentColor"
                    d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"
                  ></path>
                </svg>
              </button>
            </div>

            <div className="product-cell category">
              نسبة الحسم
              <button className="sort-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512">
                  <path
                    fill="currentColor"
                    d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"
                  ></path>
                </svg>
              </button>
            </div>

            <div className="product-cell category">
              المبلغ المتبقي
              <button className="sort-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512">
                  <path
                    fill="currentColor"
                    d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"
                  ></path>
                </svg>
              </button>
            </div>

            <div className="product-cell category">
              التاريخ
              <button className="sort-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512">
                  <path
                    fill="currentColor"
                    d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"
                  ></path>
                </svg>
              </button>
            </div>

            <div className="product-cell option">
              option
              <button className="sort-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512">
                  <path
                    fill="currentColor"
                    d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>

          {items.map((item) => {
            return item;
          })}
        </div>
      </div>
    </>
  );
}

export default Payments;
