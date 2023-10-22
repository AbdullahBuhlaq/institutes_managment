import DiscountItem from "./DiscountItem";
import AddDiscountForm from "./AddDiscountForm";
import EditDiscountForm from "./EditDiscountForm";
import { useEffect, useState, useRef } from "react";
import requestOptions from "../../../constants/requestOptions";
import { motion } from "framer-motion";
import searchOptions from "../../../constants/searchOptions";
import compare from "../../../functions/compare";
import colorList from "../../../constants/colorList";
import textColorListTitle from "../../../constants/textColorListTitle";
import checkPermissions from "../../../functions/checkPermissions";

function Discounts(props) {
  const [currentEdit, setCurrentEdit] = useState(false);
  const [addNew, setAddNew] = useState(false);
  const [firstRender, setFirstRender] = useState(true);
  const [cardsNumber, setCardsNumber] = useState(1);

  useEffect(() => {
    setFirstRender(false);
  }, [props.discounts]);

  const [items, setItems] = useState([]);
  useEffect(() => {
    let index = 1;
    const populateArray = async () => {
      const newArr = await Promise.all(
        Object.keys(props.discounts[props.branch]).map(async (discount, discountIndex) => {
          const isTrue = await compare(searchOptions["discounts"][props.search.field], props.search.operator, props.discounts[props.branch][discount][props.search.field], props.search.word);
          if (isTrue) {
            index += 1;
            let curIndex = index;
            return <DiscountItem key={discountIndex} cardsNumber={cardsNumber} firstRender={firstRender} userInformation={props.userInformation} branch={props.branch} colorIndex={curIndex - 2} index={curIndex} discount={props.discounts[props.branch][discount]} deleteDiscount={deleteDiscount} showEdit={showEdit} setAddNew={setAddNew} setCurrentDiscount={props.setCurrentDiscount} />;
          }
        })
      );
      setItems([...newArr]);
      setFirstRender(false);
    };

    populateArray();
  }, [props.search, props.discounts, cardsNumber]);

  async function deleteDiscount(id) {
    const response = await fetch(`${process.env.REACT_APP_URL_STRING}/admin-training/discount/delete-in-branch/${id}`, { ...requestOptions, method: "delete", headers: { ...requestOptions.headers, authorization: props.userInformation.token } });
    const data = await response.json();
    // const data = { success: true };
    if (data.success) {
      delete props.discounts[props.branch][id];
      props.setDiscounts({ ...props.discounts });
      props.toast.success("تم حذف البطاقة حسم", {
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
    setCurrentEdit(props.discounts[props.branch][id]);
  }

  const ref = useRef();

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      if (ref.current) setCardsNumber(parseInt((ref.current.offsetWidth - 10) / 262));
    });
    resizeObserver.observe(document.getElementById("mainh"));
  }, []);

  return (
    <>
      <div className="main-header-line" id="mainh" ref={ref}>
        <h1 className="top-title">الحسومات</h1>
      </div>
      <div className="branches">
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
            <h1>{currentEdit ? "تعديل معلومات البطاقة حسم " + currentEdit.name : "إضافة بطاقة حسم جديدة"}</h1>
            {currentEdit && <EditDiscountForm toast={props.toast} discounts={props.discounts} setDiscounts={props.setDiscounts} currentEdit={currentEdit} setCurrentEdit={setCurrentEdit} branchName={props.branchName} branch={props.branch} userInformation={props.userInformation} />}
            {addNew && <AddDiscountForm toast={props.toast} discounts={props.discounts} setDiscounts={props.setDiscounts} setAddNew={setAddNew} branchName={props.branchName} branch={props.branch} userInformation={props.userInformation} />}
          </div>
        </div>
        <div className="wrapper" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(252px, 1fr))" }}>
          {checkPermissions(props.userInformation, ["admin_training.discount.add", "admin_training.discount.all"], ["admin_training.discount.addInBranch", "admin_training.discount.allInBranch"], props.branch) ? (
            <motion.li
              className="add-box"
              initial={firstRender ? { opacity: 0, scale: 0 } : false}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.2 } }}
              whileHover={{ scale: 1.02 }}
              onClick={() => {
                setCurrentEdit(false);
                setAddNew(true);
              }}
              style={{ height: "210px" }}
            >
              <div className="icon">
                <i className="uil uil-plus"></i>
              </div>
              <p>إضافة بطاقة حسم</p>
            </motion.li>
          ) : null}

          {items.map((item) => {
            return item;
          })}
        </div>
      </div>
    </>
  );
}

export default Discounts;
