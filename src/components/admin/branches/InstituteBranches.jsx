import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Branch from "./Branch";
// import AddBranchForm from "./AddBranchForm";
// import EditBranchForm from "./EditBranchForm";
import searchOptions from "../../../constants/searchOptions";
import compare from "../../../functions/compare";

function InstituteBranches(props) {
  const [currentEdit, setCurrentEdit] = useState(false);
  const [addNew, setAddNew] = useState(false);
  const [firstRender, setFirstRender] = useState(true);
  const [ShowSetting, setShowSetting] = useState(false);
  const [itemsNumber, setItemsNumber] = useState(-1);

  const [items, setItems] = useState([]);
  useEffect(() => {
    let index = 0;
    const populateArray = async () => {
      const newArr = await Promise.all(
        Object.keys(props.institute.branches).map(async (branch, branchIndex) => {
          const isTrue = await compare(searchOptions["branches"][props.search.field], props.search.operator, props.institute.branches[branch][props.search.field], props.search.word);
          if (isTrue) {
            index += 1;
            let curIndex = index;
            return <Branch key={branchIndex} index={curIndex} firstRender={firstRender} branch={props.institute.branches[branch]} setCurrentBranch={props.setCurrentBranch} deleteBranch={deleteBranch} showEdit={showEdit} countries={props.countries} />;
          }
        })
      );
      setItems([...newArr]);
      setItemsNumber(index);
    };

    populateArray();
  }, [props.search, props.institute]);

  async function deleteBranch(id) {
    // const response = await fetch(`/admin-training/delete/${id}`, requestOptions);
    // const data = await response.json();
    const data = { success: true };
    if (data.success) {
      delete props.institute.branches[id];
      props.setInstitutes({ ...props.institutes, [props.institute.id]: { ...props.institute } });
      props.toast.success("تم حذف الفرع", {
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
    setCurrentEdit(props.institute.branches[id]);
    // show
  }

  return (
    <>
      <div className="main-header-line">
        <div className="action-buttons">
          <button
            className="open-right-area"
            onClick={() => {
              props.setRightShow(!props.rightShow);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-activity">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          </button>
          <button
            className="menu-button"
            onClick={() => {
              props.setLeftShow(!props.leftShow);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <button
            className="back-arrow"
            onClick={() => {
              props.setSearch({ word: "", field: "", operator: "" });
              props.setCurrentBranches(false);
              props.setCurrentBranch(false);
              props.setCurrentRight("institutes");
            }}
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>
        </div>
      </div>
      <motion.li
        className="first"
        initial={props.firstRender ? { opacity: 0, scale: 0 } : false}
        animate={{ opacity: 1, scale: 1, transition: { duration: 0.2 } }}
        onClick={() => {
          props.setCurrentBranch(false);
        }}
      >
        <div className="timeline-panel">
          <div className="timeline-heading">
            <h4>{props.institute.name}</h4>
          </div>
          <div className="timeline-body">
            <p>{props.institute.name}</p>
            <span>{props.institute.fromHour}</span>
          </div>
          <div className="timeline-footer">
            <span>{new Date().toLocaleString("default", { month: "long", day: "numeric", year: "numeric" })}</span>

            <div className={"settings" + (ShowSetting ? " show" : "")}>
              <i
                onClick={(elem) => {
                  setShowSetting(true);
                  document.addEventListener("click", (e) => {
                    if (e.target.tagName != "I" || e.target != elem.target) {
                      setShowSetting(false);
                    }
                  });
                }}
                className="uil uil-ellipsis-h"
              ></i>
              {ShowSetting ? (
                <motion.ul className={"menu"} initial={{ scale: 0 }} animate={{ scale: 1, transition: { duration: 0.1 } }}>
                  <li
                    onClick={() => {
                      // setShowSetting(false);
                      // showInstituteEdit();
                    }}
                  >
                    <i className="uil uil-pen"></i>
                    تعديل
                  </li>
                </motion.ul>
              ) : null}
            </div>
          </div>
        </div>
      </motion.li>
      <div className={"popup-box" + (currentEdit || addNew ? " show" : "")}>
        <div className="popup">
          <div className="content">
            <header>
              <p>{currentEdit ? "تعديل معلومات الفرع " + currentEdit.name : "إضافة فرع جديد"}</p>
              <i
                className="uil uil-times"
                onClick={() => {
                  setAddNew(false);
                  setCurrentEdit(false);
                }}
              ></i>
            </header>
            {/* {currentEdit && <EditBranchForm toast={props.toast} institute={props.institute} institutes={props.institutes} setInstitutes={props.setInstitutes} currentEdit={currentEdit} setCurrentEdit={setCurrentEdit} countries={props.countries} />}
            {addNew && <AddBranchForm toast={props.toast} institute={props.institute} institutes={props.institutes} setInstitutes={props.setInstitutes} setAddNew={setAddNew} countries={props.countries} />} */}
          </div>
        </div>
      </div>

      <ul className="timeline">
        {items.map((item) => {
          return item;
        })}
        {itemsNumber != -1 && (
          <motion.li
            className={itemsNumber % 2 ? "" : "timeline-inverted"}
            initial={firstRender ? { opacity: 0, x: itemsNumber % 2 ? "-50%" : "50%" } : false}
            animate={{ opacity: 1, x: 0, transition: { duration: 0.2 } }}
            whileHover={{ x: itemsNumber % 2 ? "5px" : "-5px" }}
            onClick={() => {
              setCurrentEdit(false);
              setAddNew(true);
            }}
            onLoad={() => setFirstRender(false)}
          >
            <div className="timeline-badge">
              <a></a>
            </div>
            <div className="timeline-panel">
              <div className="timeline-heading">
                <h4></h4>
              </div>
              <div className="timeline-body add-box">
                <div className="icon">
                  <i className="uil uil-plus"></i>
                </div>
                <p>إضافة فرع</p>
              </div>
            </div>
          </motion.li>
        )}

        <li className="clearfix no-float"></li>
      </ul>
    </>
  );
}

export default InstituteBranches;
