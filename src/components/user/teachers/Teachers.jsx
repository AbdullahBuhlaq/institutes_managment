import TeacherItem from "./TeacherItem";
import AddTeacherForm from "./AddTeacherForm";
import EditTeacherForm from "./EditTeacherForm";
import { motion } from "framer-motion";
import compare from "../../../functions/compare";
import searchOptions from "../../../constants/searchOptions";
import { useEffect, useState } from "react";
import requestOptions from "../../../constants/requestOptions";
import checkPermissions from "../../../functions/checkPermissions";

function Teachers(props) {
  const [currentEdit, setCurrentEdit] = useState(false);
  const [currentBranches, setCurrentBranches] = useState(false);
  const [addNew, setAddNew] = useState(false);
  const [firstRender, setFirstRender] = useState(true);

  const [items, setItems] = useState([]);
  useEffect(() => {
    const populateArray = async () => {
      const newArr = await Promise.all(
        Object.keys(props.teachers).map(async (teacher, teacherIndex) => {
          const isTrue = await compare(searchOptions["teachers"][props.search.field], props.search.operator, props.teachers[teacher][props.search.field], props.search.word);
          if (isTrue) return <TeacherItem key={teacherIndex} firstRender={firstRender} index={teacherIndex} teacher={props.teachers[teacher]} deleteTeacher={deleteTeacher} showEdit={showEdit} setAddNew={setAddNew} setCurrentTeacher={props.setCurrentTeacher} setCurrentRight={props.setCurrentRight} userInformation={props.userInformation} branch={props.branch} />;
        })
      );
      setItems([...newArr]);
      setFirstRender(false);
    };

    populateArray();
  }, [props.search, props.teachers]);

  async function deleteTeacher(id) {
    const response = await fetch(`http://localhost:3001/admin-training/teacher/delete/${id}`, { ...requestOptions, headers: { ...requestOptions.headers, authorization: props.userInformation.token }, method: "delete" });
    const data = await response.json();
    // const data = { success: true };
    if (data.success) {
      delete props.teachers[id];
      props.setTeachers({ ...props.teachers });
      props.toast.success("تم حذف المعلم", {
        position: props.toast.POSITION.TOP_CENTER,
      });
    } else {
      console.log(data.error);
      props.toast.error(data.error, {
        position: props.toast.POSITION.TOP_CENTER,
      });
    }
  }

  async function showEdit(teacher) {
    setAddNew(false);
    setCurrentEdit(props.teachers[teacher]);
    // show
  }
  return (
    <>
      <div className="main-header-line">
        <h1 className="top-title">المعلمون</h1>
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
            {addNew && <AddTeacherForm toast={props.toast} teachers={props.teachers} setTeachers={props.setTeachers} setAddNew={setAddNew} userInformation={props.userInformation} />}
            {currentEdit && <EditTeacherForm toast={props.toast} teachers={props.teachers} setTeachers={props.setTeachers} currentEdit={currentEdit} setCurrentEdit={setCurrentEdit} userInformation={props.userInformation} />}
          </div>
        </div>
        <div className="course-cards-container">
          <div className="project-boxes jsGridView" style={{ justifyContent: "start" }}>
            <div className="project-box-wrapper">
              {checkPermissions(props.userInformation, ["admin_training.teachers.controller.all", "admin_training.teachers.controller.add"], ["admin_training.teachers.controller.addInBranch", "admin_training.teachers.controller.allInBranch"], props.branch) ? (
                <motion.li
                  className="project-box add-box"
                  initial={firstRender ? { opacity: 0, scale: 0 } : false}
                  animate={{ opacity: 1, scale: 1, transition: { duration: 0.2 } }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => {
                    setCurrentEdit(false);
                    setAddNew(true);
                  }}
                  style={{ width: "255px", height: "267px" }}
                >
                  <div className="icon">
                    <i className="uil uil-plus"></i>
                  </div>
                  <p>إضافة أستاذ</p>
                </motion.li>
              ) : null}
            </div>
            {items.map((item) => {
              return item;
            })}
          </div>
        </div>

        {/* <div className="wrapper">
          <motion.li
            className="add-box"
            initial={firstRender ? { opacity: 0, scale: 0 } : false}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.2 } }}
            whileHover={{ scale: 1.02 }}
            onClick={() => {
              setCurrentEdit(false);
              setAddNew(true);
            }}
          >
            <div className="icon">
              <i className="uil uil-plus"></i>
            </div>
            <p>إضافة معلم</p>
          </motion.li>
          {items.map((item) => {
            return item;
          })}
        </div> */}
      </div>
    </>
  );
}

export default Teachers;
