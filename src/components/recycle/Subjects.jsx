import SubjectItem from "./SubjectItem";
import AddSubject from "./subjects/AddSubject";
import EditSubject from "./EditSubject";
import { useEffect, useState, Fragment, useRef } from "react";
import requestOptions from "../constants/requestOptions";
import { motion } from "framer-motion";
import searchOptions from "../constants/searchOptions";
import compare from "../functions/compare";
import colorList from "../constants/colorList";
import textColorListTitle from "../constants/textColorListTitle";

function Subjects(props) {
  const [currentEdit, setCurrentEdit] = useState(false);
  const [addNew, setAddNew] = useState(false);
  const [firstRender, setFirstRender] = useState(true);
  const [cardsNumber, setCardsNumber] = useState(1);

  useEffect(() => {
    setFirstRender(false);
  }, [props.subjects]);

  const [items, setItems] = useState([]);
  useEffect(() => {
    let index = 1;
    const populateArray = async () => {
      const newArr = await Promise.all(
        Object.keys(props.subjects[props.branch]).map(async (subject, subjectIndex) => {
          const isTrue = await compare(searchOptions["subjects"][props.search.field], props.search.operator, props.subjects[props.branch][subject][props.search.field], props.search.word);
          if (isTrue) {
            index += 1;
            let curIndex = index;
            return <SubjectItem key={subjectIndex} cardsNumber={cardsNumber} firstRender={firstRender} colorIndex={curIndex - 2} index={curIndex} subject={props.subjects[props.branch][subject]} deleteSubject={deleteSubject} showEdit={showEdit} setAddNew={setAddNew} setCurrentSubject={props.setCurrentSubject} />;
          }
        })
      );
      setItems([...newArr]);
      setFirstRender(false);
    };

    populateArray();
  }, [props.search, props.subjects, cardsNumber]);

  async function deleteSubject(id) {
    const response = await fetch(`http://localhost:3001/admin-training/subject/delete/${id}`, { ...requestOptions, method: "delete", headers: { ...requestOptions.headers, authorization: props.userInformation.token } });
    const data = await response.json();
    // const data = { success: true };
    if (data.success) {
      delete props.subjects[props.branch][id];
      props.setSubjects({ ...props.subjects });
      props.toast.success("تم حذف المادة", {
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
    setCurrentEdit(props.subjects[props.branch][id]);
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
        <h1 className="top-title">المواد</h1>
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
            <h1>{currentEdit ? "تعديل معلومات المادة " + currentEdit.name : "إضافة مادة جديدة"}</h1>
            {currentEdit && <EditSubject toast={props.toast} subjects={props.subjects} setSubjects={props.setSubjects} currentEdit={currentEdit} setCurrentEdit={setCurrentEdit} branchName={props.branchName} branch={props.branch} userInformation={props.userInformation} />}
            {addNew && <AddSubject toast={props.toast} subjects={props.subjects} setSubjects={props.setSubjects} setAddNew={setAddNew} branchName={props.branchName} branch={props.branch} userInformation={props.userInformation} />}
          </div>
        </div>
        <div className="wrapper">
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
            <p style={{ color: textColorListTitle[0] }}>إضافة مادة</p>
          </motion.li>
          {items.map((item) => {
            return item;
          })}
        </div>
      </div>
    </>
  );
}

export default Subjects;
