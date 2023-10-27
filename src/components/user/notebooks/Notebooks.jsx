import NotebookItem from "./NotebookItem";
import AddNotebook from "./AddNotebook";
import EditNotebook from "./EditNotebook";
import { useEffect, useState, useRef } from "react";
import requestOptions from "../../../constants/requestOptions";
import { motion } from "framer-motion";
import searchOptions from "../../../constants/searchOptions";
import compare from "../../../functions/compare";
import colorList from "../../../constants/colorList";
import textColorListTitle from "../../../constants/textColorListTitle";
import checkPermissions from "../../../functions/checkPermissions";

function Notebooks(props) {
  const [currentEdit, setCurrentEdit] = useState(false);
  const [addNew, setAddNew] = useState(false);
  const [firstRender, setFirstRender] = useState(true);
  const [cardsNumber, setCardsNumber] = useState(1);

  useEffect(() => {
    setFirstRender(false);
  }, [props.notebooks]);

  const [items, setItems] = useState([]);
  useEffect(() => {
    let index = 1;
    const populateArray = async () => {
      const newArr = await Promise.all(
        Object.keys(props.notebooks[props.branch]).map(async (notebook, notebookIndex) => {
          const isTrue = await compare(searchOptions["notebooks"][props.search.field], props.search.operator, props.notebooks[props.branch][notebook][props.search.field], props.search.word);
          if (isTrue) {
            index += 1;
            let curIndex = index;
            return <NotebookItem key={notebookIndex} cardsNumber={cardsNumber} firstRender={firstRender} userInformation={props.userInformation} branch={props.branch} colorIndex={curIndex - 2} index={curIndex} notebook={props.notebooks[props.branch][notebook]} deleteNotebook={deleteNotebook} showEdit={showEdit} setAddNew={setAddNew} setCurrentNotebook={props.setCurrentNotebook} />;
          }
        })
      );
      setItems([...newArr]);
      setFirstRender(false);
    };

    populateArray();
  }, [props.search, props.notebooks, cardsNumber]);

  async function deleteNotebook(id) {
    const response = await fetch(props.userInformation.branch ? `${import.meta.env.VITE_URL}/admin-training/notebook/remove/${id}` : `${import.meta.env.VITE_URL}/admin-training/notebook/delete/${id}`, { ...requestOptions, method: "delete", headers: { ...requestOptions.headers, authorization: props.userInformation.token } });
    const data = await response.json();
    // const data = { success: true };
    if (data.success) {
      delete props.notebooks[props.branch][id];
      props.setNotebooks({ ...props.notebooks });
      props.toast.success("تم حذف الدفتر", {
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
    setCurrentEdit(props.notebooks[props.branch][id]);
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
        <h1 className="top-title">الدفاتر</h1>
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
            <h1>{currentEdit ? "تعديل معلومات الدفتر " + currentEdit.name : "إضافة دفتر جديد"}</h1>
            {currentEdit && <EditNotebook toast={props.toast} notebooks={props.notebooks} setNotebooks={props.setNotebooks} currentEdit={currentEdit} setCurrentEdit={setCurrentEdit} branchName={props.branchName} branch={props.branch} userInformation={props.userInformation} />}
            {addNew && <AddNotebook toast={props.toast} notebooks={props.notebooks} setNotebooks={props.setNotebooks} setAddNew={setAddNew} branchName={props.branchName} branch={props.branch} userInformation={props.userInformation} />}
          </div>
        </div>
        <div className="wrapper">
          {checkPermissions(props.userInformation, ["admin_training.notebook.add", "admin_training.notebook.all"], ["admin_training.notebook.addInBranch", "admin_training.notebook.allInBranch"], props.branch) ? (
            <motion.li
              className="add-box"
              initial={firstRender ? { opacity: 0, scale: 0 } : false}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.2 } }}
              whileHover={{ scale: 1.02 }}
              onClick={() => {
                setCurrentEdit(false);
                setAddNew(true);
              }}
              style={{ backgroundColor: colorList[0] }}
            >
              <div className="icon" style={{ borderColor: textColorListTitle[0] }}>
                <i className="uil uil-plus" style={{ color: textColorListTitle[0] }}></i>
              </div>
              <p style={{ color: textColorListTitle[0] }}>إضافة دفتر</p>
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

export default Notebooks;
