import { useEffect, useState, useRef } from "react";
import requestOptions from "../../../constants/requestOptions";
import { motion } from "framer-motion";
import searchOptions from "../../../constants/searchOptions";
import compare from "../../../functions/compare";
import EditStudentForm from "./EditStudentForm";
import AddStudentForm from "./AddStudentForm";
import StudentItem from "./StudentItem";
import colorList from "../../../constants/colorList";
import textColorListTitle from "../../../constants/textColorListTitle";
import checkPermissions from "../../../functions/checkPermissions";

function Students(props) {
  const [currentEdit, setCurrentEdit] = useState(false);
  const [addNew, setAddNew] = useState(false);
  const [firstRender, setFirstRender] = useState(true);
  const [cardsNumber, setCardsNumber] = useState(1);

  useEffect(() => {
    setFirstRender(false);
  }, [props.students]);

  const [items, setItems] = useState([]);
  useEffect(() => {
    let index = 1;
    const populateArray = async () => {
      const newArr = await Promise.all(
        Object.keys(props.students[props.branch]).map(async (student, studentIndex) => {
          const isTrue = await compare(searchOptions["students"][props.search.field], props.search.operator, props.students[props.branch][student][props.search.field], props.search.word);
          if (isTrue) {
            index += 1;
            let curIndex = index;
            return <StudentItem key={studentIndex} userInformation={props.userInformation} branch={props.branch} cardsNumber={cardsNumber} firstRender={firstRender} colorIndex={curIndex - 2} index={curIndex} student={props.students[props.branch][student]} deleteStudent={deleteStudent} showEdit={showEdit} setAddNew={setAddNew} setCurrentStudent={props.setCurrentStudent} />;
          }
        })
      );
      setItems([...newArr]);
      setFirstRender(false);
    };

    populateArray();
  }, [props.search, props.students, cardsNumber]);

  async function deleteStudent(id) {
    const response = await fetch(props.userInformation.branch ? `${import.meta.env.VITE_URL}/admin-training/student/delete-in-branch/${id}` : `${import.meta.env.VITE_URL}/admin-training/student/delete/${id}`, { ...requestOptions, method: "delete", headers: { ...requestOptions.headers, authorization: props.userInformation.token } });
    const data = await response.json();
    // const data = { success: true };
    if (data.success) {
      delete props.students[props.branch][id];
      props.setStudents({ ...props.students });
      props.toast.success("تم حذف الطالب", {
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
    setCurrentEdit(props.students[props.branch][id]);
    // show
  }

  const ref = useRef();

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      if (ref.current) setCardsNumber(parseInt((ref.current.offsetWidth - 10) / 245));
    });

    resizeObserver.observe(document.getElementById("mainh"));
  }, []);

  return (
    <>
      <div className="main-header-line" id="mainh" ref={ref}>
        <h1 className="top-title">الطلاب</h1>
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
            <h1>{currentEdit ? "تعديل معلومات الطالب " + currentEdit.nameArab : "إضافة طالب جديد"}</h1>
            {currentEdit && <EditStudentForm toast={props.toast} students={props.students} setStudents={props.setStudents} currentEdit={currentEdit} setCurrentEdit={setCurrentEdit} branchName={props.branchName} branch={props.branch} userInformation={props.userInformation} />}
            {addNew && <AddStudentForm toast={props.toast} students={props.students} setStudents={props.setStudents} setAddNew={setAddNew} branchName={props.branchName} branch={props.branch} userInformation={props.userInformation} />}
          </div>
        </div>
        <div className="wrapper" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(235px, 1fr))" }}>
          {checkPermissions(props.userInformation, ["admin_training.students.controller.all", "admin_training.students.controller.add"], ["admin_training.students.controller.addInBranch", "admin_training.students.controller.allInBranch"], props.branch) ? (
            <motion.li
              className="add-box"
              initial={firstRender ? { opacity: 0, scale: 0 } : false}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.2 } }}
              whileHover={{ scale: 1.02 }}
              onClick={() => {
                setCurrentEdit(false);
                setAddNew(true);
              }}
              style={{ height: "245px" }}
            >
              <div className="icon">
                <i className="uil uil-plus"></i>
              </div>
              <p>إضافة طالب</p>
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

export default Students;
