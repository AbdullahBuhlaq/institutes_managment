import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import InstituteItem from "./InstituteItem";
import AddInstituteForm from "./AddInstituteForm";
import EditInstituteForm from "./EditInstituteForm";
import InstituteBranches from "../branches/InstituteBranches";
import searchOptions from "../../../constants/searchOptions";
import requestOptions from "../../../constants/requestOptions";
import compare from "../../../functions/compare";
import textColorListTitle from "../../../constants/textColorListTitle";
import colorList from "../../../constants/colorList";
import checkPermissions from "../../../functions/checkPermissions";

function Institutes(props) {
  const [currentEdit, setCurrentEdit] = useState(false);
  const [currentBranches, setCurrentBranches] = useState(false);
  const [addNew, setAddNew] = useState(false);
  const [firstRender, setFirstRender] = useState(true);
  const [cardsNumber, setCardsNumber] = useState(1);

  const [items, setItems] = useState([]);
  useEffect(() => {
    if (props.currentRight == "institutes") {
      const populateArray = async () => {
        const newArr = await Promise.all(
          Object.keys(props.institutes).map(async (institute, instituteIndex) => {
            const isTrue = await compare(searchOptions["institutes"][props.search.field], props.search.operator, props.institutes[institute][props.search.field], props.search.word);
            if (isTrue)
              return (
                <InstituteItem
                  key={instituteIndex}
                  cardsNumber={cardsNumber}
                  firstRender={firstRender}
                  index={instituteIndex}
                  institute={props.institutes[institute]}
                  deleteInstitute={deleteInstitute}
                  showEdit={showEdit}
                  setAddNew={setAddNew}
                  setCurrentInstitute={props.setCurrentInstitute}
                  setCurrentBranches={setCurrentBranches}
                  setCurrentRight={props.setCurrentRight}
                  userInformation={props.userInformation}
                />
              );
          })
        );
        setItems([...newArr]);
        setFirstRender(false);
      };

      populateArray();
    }
  }, [props.search, props.institutes, cardsNumber]);

  async function deleteInstitute(id) {
    const response = await fetch(`${import.meta.env.VITE_URL}/admin-training/my-center/delete/${id}`, { ...requestOptions, headers: { ...requestOptions.headers, authorization: props.userInformation.token }, method: "delete" });
    const data = await response.json();
    if (data.success) {
      delete props.institutes[id];
      props.setInstitutes({ ...props.institutes });
      props.toast.success("تم حذف المعهد", {
        position: props.toast.POSITION.TOP_CENTER,
      });
    } else {
      console.log(data.error);
      props.toast.error(data.error, {
        position: props.toast.POSITION.TOP_CENTER,
      });
    }
  }

  async function showEdit(institute) {
    setAddNew(false);
    setCurrentEdit(props.institutes[institute]);
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
      {!currentBranches && (
        <>
          <div className="main-header-line" id="mainh" ref={ref}>
            <h1 className="top-title">المعاهد</h1>
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
            </div>
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
                <h1>{currentEdit ? "تعديل معلومات المعهد " + currentEdit.name : "إضافة معهد جديد"}</h1>
                {addNew && <AddInstituteForm toast={props.toast} institutes={props.institutes} setInstitutes={props.setInstitutes} setAddNew={setAddNew} countries={props.countries} userInformation={props.userInformation} />}
                {currentEdit && <EditInstituteForm toast={props.toast} institutes={props.institutes} type={"dash"} setInstitutes={props.setInstitutes} currentEdit={currentEdit} setCurrentEdit={setCurrentEdit} countries={props.countries} userInformation={props.userInformation} />}
              </div>
            </div>
            <div className="wrapper">
              {checkPermissions(props.userInformation, ["admin.training_center.add", "admin.training_center.all"], [], -1) && (
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
                  <p style={{ color: textColorListTitle[0] }}>إضافة معهد</p>
                </motion.li>
              )}
              {items.map((item) => {
                return item;
              })}
            </div>
          </div>
        </>
      )}
      {currentBranches && (
        <InstituteBranches
          userInformation={props.userInformation}
          setSearch={props.setSearch}
          search={props.search}
          toast={props.toast}
          institute={props.institutes[currentBranches]}
          institutes={props.institutes}
          setInstitutes={props.setInstitutes}
          setCurrentBranch={props.setCurrentBranch}
          setCurrentBranches={setCurrentBranches}
          setCurrentRight={props.setCurrentRight}
          countries={props.countries}
          setCurrent={props.setCurrent}
          rightShow={props.rightShow}
          setRightShow={props.setRightShow}
          leftShow={props.leftShow}
          setLeftShow={props.setLeftShow}
        />
      )}
    </>
  );
}

export default Institutes;
