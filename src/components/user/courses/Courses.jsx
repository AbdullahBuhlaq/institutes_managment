import _ from "lodash";
import CourseItem from "./CourseItem";
import AddCourseForm from "./AddCourseForm";
import EditCourse from "./EditCourse";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import searchOptions from "../../../constants/searchOptions";
import compare from "../../../functions/compare";
import AddSubject from "../subjects/AddSubject";
import AddTeacherForm from "../teachers/AddTeacherForm";
import addCourseToTable from "../../../functions/helper";
import deleteCourseInTable from "../../../functions/dle";
import validateForm from "../../../functions/validateForm";
import WeekTable from "../WeekTable";
import Joi from "joi";
import messages from "../../../constants/messages";
import handleSave from "../../../functions/handleSave";
import NewInput from "../../general/NewInput";
import SelectInput from "../../general/SelectInput";
import selectOptions from "../../../constants/selectOptions";
import requestOptions from "../../../constants/requestOptions";
import StudentsPopup from "./StudentsPopup";
import AddStudentForm from "../students/AddStudentForm";
import Calendar from "./Calendar";
import checkPermissions from "../../../functions/checkPermissions";

function Courses(props) {
  try {
    const [gridView, setGridView] = useState(true);
    const [courseName, setCourseName] = useState("");
    const [addSubject, setAddSubject] = useState(false);
    const [addTeacherForm, setAddTeacherForm] = useState(false);
    const [addStudentForm, setAddStudentForm] = useState(false);
    const [currentClassSession, setCurrentClassSession] = useState(false);
    const [currentCourseStudents, setCurrentCourseStudents] = useState(false);
    const [currentSchedule, setCurrentSchedule] = useState(_.cloneDeep(props.institute.branches[props.openBranch]?.schedule));
    const [currentAddSession, setCurrentAddSession] = useState(1);

    const [newSession, setNewSession] = useState({
      date: "",
      start: "",
      end: "",
      index: -1,
    });
    const [newSessionErrors, setNewSessionError] = useState({});
    const newSessionSchema = {
      date: Joi.date().required().messages(messages).label("تاريخ الجلسة"),
      start: Joi.string().required().messages(messages).label("بداية الجلسة"),
      end: Joi.string().required().messages(messages).label("نهاية الجلسة"),
      index: Joi.number().required().messages(messages).label("نهاية الجلسة"),
    };
    const joiNewSession = Joi.object(newSessionSchema);

    const [deleteSession, setDeleteSession] = useState({
      date: "",
      start: "",
      end: "",
      reason: "",
      index: 0,
    });
    const [deleted, setDeleted] = useState([]);
    const [deleteSessionErrors, setDeleteSessionError] = useState({});
    const deleteSessionSchema = {
      date: Joi.date().required().messages(messages).label("تاريخ الجلسة"),
      start: Joi.string().required().messages(messages).label("بداية الجلسة"),
      end: Joi.string().required().messages(messages).label("نهاية الجلسة"),
      reason: Joi.number().required().messages(messages).label("سبب حذف الجلسة"),
      index: Joi.number().required().messages(messages).label("سبب حذف الجلسة"),
    };
    const joiDeleteSession = Joi.object(deleteSessionSchema);

    const [currentEdit, setCurrentEdit] = useState(false);
    const [addNew, setAddNew] = useState(false);
    const [firstRender, setFirstRender] = useState(true);
    useEffect(() => {
      setFirstRender(false);
    }, [props.courses]);

    const [items, setItems] = useState([]);
    useEffect(() => {
      let index = 1;
      const populateArray = async () => {
        const newArr = await Promise.all(
          Object.keys(props.courses[props.branch]).map(async (course, courseIndex) => {
            // const isTrue = await compare(searchOptions["courses"][props.search.field], props.search.operator, props.courses[props.branch][course][props.search.field], props.search.word);
            const isTrue = true;
            if (isTrue) {
              index += 1;
              let curIndex = index;
              return (
                <CourseItem
                  branch={props.branch}
                  userInformation={props.userInformation}
                  key={courseIndex}
                  institute={props.institute}
                  openBranch={props.openBranch}
                  toast={props.toast}
                  firstRender={firstRender}
                  colorIndex={courseIndex}
                  index={curIndex}
                  course={props.courses[props.branch][course]}
                  teachers={props.teachers}
                  deleteCourse={deleteCourse}
                  showEdit={showEdit}
                  setAddNew={setAddNew}
                  setCurrentCourse={props.setCurrentCourse}
                  setCurrentCourseStudents={setCurrentCourseStudents}
                  subjects={props.subjects}
                />
              );
            }
          })
        );
        setItems([...newArr]);
        setFirstRender(false);
      };

      populateArray();
    }, [props.search, props.courses]);

    async function deleteCourse(id) {
      const response = await fetch(`http://localhost:3001/admin-training/courses/delete/${id}`, { ...requestOptions, method: "delete", headers: { ...requestOptions.headers, authorization: props.userInformation.token } });
      const data = await response.json();
      // const data = { success: true };
      if (data.success) {
        delete props.courses[props.branch][id];
        props.setCourses({ ...props.courses });
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
      setCurrentEdit(props.courses[props.branch][id]);
      // show
    }

    useEffect(() => {
      // if (!props.institute.branches[props.openBranch]?.schedule[currentClassSession] && currentClassSession) {
      //   props.setInstitute({ ...props.institute, branches: { ...props.institute.branches, [props.openBranch]: { ...props.institute[props.openBranch], schedule: { ...props.institute[props.openBranch]?.schedule, [currentClassSession]: { data: [] } } } } });
      // }
      setCurrentSchedule(_.cloneDeep(props.institute.branches[props.openBranch]?.schedule));
    }, [addNew, currentEdit, props.institute, currentClassSession]);

    return (
      <>
        <div className="main-header-line">
          <h1 className="top-title">الدورات</h1>
          <button className={"view-btn list-view" + (!gridView ? " active" : "")} title="List View" style={{ marginRight: "auto" }} onClick={() => setGridView(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-list">
              <line x1="8" y1="6" x2="21" y2="6"></line>
              <line x1="8" y1="12" x2="21" y2="12"></line>
              <line x1="8" y1="18" x2="21" y2="18"></line>
              <line x1="3" y1="6" x2="3.01" y2="6"></line>
              <line x1="3" y1="12" x2="3.01" y2="12"></line>
              <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
          </button>
          <button className={"view-btn grid-view" + (gridView ? " active" : "")} title="Grid View" onClick={() => setGridView(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-grid">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
          </button>
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

              {addNew && (
                <AddCourseForm
                  countRoom={props.institute.branches[props.openBranch].countClass}
                  setCourseName={setCourseName}
                  deleted={deleted}
                  setAddSubject={setAddSubject}
                  setAddTeacherForm={setAddTeacherForm}
                  setCurrentClassSession={setCurrentClassSession}
                  currentSchedule={currentSchedule}
                  setInstitute={props.setInstitute}
                  institute={props.institute}
                  openBranch={props.openBranch}
                  userInformation={props.userInformation}
                  courses={props.courses}
                  setCourses={props.setCourses}
                  teachers={props.teachers}
                  setTeachers={props.setTeachers}
                  subjects={props.subjects}
                  setSubjects={props.setSubjects}
                  toast={props.toast}
                  branch={props.branch}
                  branchName={props.branchName}
                  setAddNew={setAddNew}
                  setDeleted={setDeleted}
                  courseName={courseName}
                  setCurrentSchedule={setCurrentSchedule}
                  courseId={currentEdit ? currentEdit.id : -1}
                />
              )}
              {currentEdit && (
                <EditCourse
                  countRoom={props.institute.branches[props.openBranch].countClass}
                  setCourseName={setCourseName}
                  deleted={deleted}
                  setAddSubject={setAddSubject}
                  setAddTeacherForm={setAddTeacherForm}
                  setCurrentClassSession={setCurrentClassSession}
                  currentSchedule={currentSchedule}
                  setInstitute={props.setInstitute}
                  institute={props.institute}
                  openBranch={props.openBranch}
                  userInformation={props.userInformation}
                  courses={props.courses}
                  setCourses={props.setCourses}
                  teachers={props.teachers}
                  setTeachers={props.setTeachers}
                  subjects={props.subjects}
                  setSubjects={props.setSubjects}
                  toast={props.toast}
                  branch={props.branch}
                  branchName={props.branchName}
                  setCurrentEdit={setCurrentEdit}
                  currentEdit={currentEdit}
                  setDeleted={setDeleted}
                  courseName={courseName}
                  setCurrentSchedule={setCurrentSchedule}
                  courseId={currentEdit ? currentEdit.id : -1}
                />
              )}
            </div>
          </div>
          <div className={"popup-box" + (addSubject ? " show" : "")}>
            <div className="new-form-container" style={{ width: "65%", height: "88%" }}>
              <button className="close-form">
                <i
                  className="uil uil-times"
                  onClick={() => {
                    setAddSubject(false);
                  }}
                ></i>
              </button>
              {addSubject && <AddSubject toast={props.toast} subjects={props.subjects} setSubjects={props.setSubjects} setAddNew={setAddSubject} branchName={props.branchName} branch={props.branch} userInformation={props.userInformation} />}
            </div>
          </div>
          <div className={"popup-box" + (addTeacherForm ? " show" : "")}>
            <div className="new-form-container" style={{ width: "65%", height: "88%" }}>
              <button className="close-form">
                <i
                  className="uil uil-times"
                  onClick={() => {
                    setAddTeacherForm(false);
                  }}
                ></i>
              </button>

              {addTeacherForm && <AddTeacherForm toast={props.toast} teachers={props.teachers} setTeachers={props.setTeachers} setAddNew={setAddTeacherForm} userInformation={props.userInformation} />}
            </div>
          </div>
          <div className={"popup-box" + (currentClassSession ? " show" : "")}>
            <div className="new-form-container" style={{ width: "65%", height: "88%", padding: "2%" }}>
              <button className="close-form">
                <i
                  className="uil uil-times"
                  onClick={() => {
                    setCurrentClassSession(false);
                  }}
                ></i>
              </button>
              <h1>{"إضافة جلسات في القاعة " + currentClassSession}</h1>

              <>
                {currentClassSession && (
                  <>
                    <Calendar currentSchedule={currentSchedule} currentClassSession={currentClassSession} courseName={courseName} setCurrentSchedule={setCurrentSchedule} toast={props.toast} courseId={currentEdit ? currentEdit.id : -1} />
                  </>
                  // <form style={{ overflow: "auto" }}>
                  //   <div className="section" style={{ justifyContent: "space-around", marginBottom: "20px" }}>
                  //     <li style={{ padding: "10px", height: "calc(100% + 10px)", cursor: "pointer" }} className={currentAddSession == 1 ? "active-section" : ""} onClick={() => setCurrentAddSession(1)}>
                  //       إضافة
                  //     </li>
                  //     <li style={{ padding: "10px", height: "calc(100% + 10px)", cursor: "pointer" }} className={currentAddSession == 2 ? "active-section" : ""} onClick={() => setCurrentAddSession(2)}>
                  //       حذف
                  //     </li>
                  //   </div>

                  //   {currentAddSession == 1 ? (
                  //     <div className="row">
                  //       <NewInput label={"بداية الجلسة :"} placeholder={"أدخل وقت بداية الجلسة"} type={"time"} name={"start"} onChange={handleSave} state={newSession} setState={setNewSession} errors={newSessionErrors} setErrors={setNewSessionError} schema={newSessionSchema} />
                  //       <NewInput label={"نهاية الجلسة :"} placeholder={"أدخل وقت نهاية الجلسة"} type={"time"} name={"end"} onChange={handleSave} state={newSession} setState={setNewSession} errors={newSessionErrors} setErrors={setNewSessionError} schema={newSessionSchema} />
                  //       <NewInput label={"تاريخ الجلسة :"} placeholder={"أدخل تاريخ الجلسة"} type={"date"} name={"date"} onChange={handleSave} state={newSession} setState={setNewSession} errors={newSessionErrors} setErrors={setNewSessionError} schema={newSessionSchema} />
                  //       <div className="button-container">
                  //         <button
                  //           onClick={async (e) => {
                  //             e.preventDefault();
                  //             const isValid = await validateForm(e, joiNewSession, newSession, setNewSessionError);
                  //             if (isValid) {
                  //               let result = await addCourseToTable(currentSchedule, { date: newSession.date, countRoom: props.institute.branches[props.openBranch].countClass, room: currentClassSession, courseId: currentEdit ? currentEdit.id : -1, startTime: newSession.start, endTime: newSession.end });
                  //               if (result.error) {
                  //                 props.toast.error(result.error, {
                  //                   position: props.toast.POSITION.TOP_CENTER,
                  //                 });
                  //               } else {
                  //                 setCurrentSchedule({ ...result });
                  //                 props.toast.success("تمت إضافة الجلسة, قم بإرسال التفاصيل لحفظ الجلسة", {
                  //                   position: props.toast.POSITION.TOP_CENTER,
                  //                 });
                  //               }
                  //             } else {
                  //               props.toast.info("أدخل جميع المعلومات بشكل صحيح", {
                  //                 position: props.toast.POSITION.TOP_CENTER,
                  //               });
                  //             }
                  //           }}
                  //           style={{ alignSelf: "flex-end" }}
                  //         >
                  //           إدخال الجلسة
                  //         </button>
                  //       </div>
                  //     </div>
                  //   ) : currentAddSession == 2 ? (
                  //     <>
                  //       <div className="row">
                  //         <NewInput disabled={true} label={"بداية الجلسة :"} placeholder={"قم بتحديد الجلسة من الجدول"} type={"time"} name={"start"} onChange={handleSave} state={deleteSession} setState={setDeleteSession} errors={deleteSessionErrors} setErrors={setDeleteSessionError} schema={deleteSessionSchema} />
                  //         <NewInput disabled={true} label={"نهاية الجلسة :"} placeholder={"قم بتحديد الجلسة من الجدول"} type={"time"} name={"end"} onChange={handleSave} state={deleteSession} setState={setDeleteSession} errors={deleteSessionErrors} setErrors={setDeleteSessionError} schema={deleteSessionSchema} />
                  //         <NewInput disabled={true} label={"تاريخ الجلسة :"} placeholder={"قم بتحديد الجلسة من الجدول"} type={"date"} name={"date"} onChange={handleSave} state={deleteSession} setState={setDeleteSession} errors={deleteSessionErrors} setErrors={setDeleteSessionError} schema={deleteSessionSchema} />
                  //         {currentEdit ? (
                  //           <SelectInput label={"سبب حذف الجلسة :"} placeholder={"أدخل سبب حذف الجلسة"} list={selectOptions.deleteReason} name={"reason"} onChange={handleSave} state={deleteSession} setState={setDeleteSession} errors={deleteSessionErrors} setErrors={setDeleteSessionError} schema={deleteSessionSchema} />
                  //         ) : (
                  //           <div className="button-container">
                  //             <button
                  //               onClick={async (e) => {
                  //                 e.preventDefault();
                  //                 if (deleteSession.index == -1) {
                  //                   props.toast.info("يرجى تحديد الجلسة المراد حذفها من الجدول", {
                  //                     position: props.toast.POSITION.TOP_CENTER,
                  //                   });
                  //                 }
                  //                 setDeleteSession((deleteSession) => ({ ...deleteSession, reason: 1 }));
                  //                 const isValid = true;
                  //                 // await validateForm(e, joiDeleteSession, deleteSession, setDeleteSessionError);
                  //                 if (isValid) {
                  //                   let result = await deleteCourseInTable(currentSchedule, deleteSession.date, currentClassSession, deleteSession.index);
                  //                   if (result.error) {
                  //                     props.toast.error(result.error, {
                  //                       position: props.toast.POSITION.TOP_CENTER,
                  //                     });
                  //                   } else {
                  //                     setCurrentSchedule({ ...result });
                  //                     if (currentEdit) {
                  //                       setDeleted([...deleted, { date: deleteSession.date, start: deleteSession.start, end: deleteSession.end, reason: deleteSession.reason, room: currentClassSession, courseId: currentEdit.id }]);
                  //                       setDeleteSession({ ...deleteSession, index: -1 });
                  //                     }
                  //                     props.toast.success("تم حذف الجلسة, قم بإرسال التفاصيل لحفظ التغييرات", {
                  //                       position: props.toast.POSITION.TOP_CENTER,
                  //                     });
                  //                   }
                  //                 } else {
                  //                   props.toast.info("أدخل جميع المعلومات بشكل صحيح", {
                  //                     position: props.toast.POSITION.TOP_CENTER,
                  //                   });
                  //                 }
                  //               }}
                  //               style={{ alignSelf: "flex-end" }}
                  //             >
                  //               حذف الجلسة
                  //             </button>
                  //           </div>
                  //         )}
                  //       </div>
                  //       {currentEdit ? (
                  //         <div className="button-container">
                  //           <button
                  //             onClick={async (e) => {
                  //               e.preventDefault();
                  //               if (deleteSession.index == -1)
                  //                 props.toast.info("يرجى تحديد الجلسة المراد حذفها من الجدول", {
                  //                   position: props.toast.POSITION.TOP_CENTER,
                  //                 });

                  //               const isValid = await validateForm(e, joiDeleteSession, deleteSession, setDeleteSessionError);
                  //               if (isValid) {
                  //                 let result = await deleteCourseInTable(currentSchedule, deleteSession.date, currentClassSession, deleteSession.index);
                  //                 if (result.error) {
                  //                   props.toast.error(result.error, {
                  //                     position: props.toast.POSITION.TOP_CENTER,
                  //                   });
                  //                 } else {
                  //                   setCurrentSchedule({ ...result });
                  //                   setDeleted([...deleted, { date: deleteSession.date, start: deleteSession.start, end: deleteSession.end, reason: deleteSession.reason, room: currentClassSession, courseId: currentEdit.id }]);
                  //                   setDeleteSession({ ...deleteSession, index: -1 });
                  //                   props.toast.success("تم حذف الجلسة, قم بإرسال التفاصيل لحفظ التغييرات", {
                  //                     position: props.toast.POSITION.TOP_CENTER,
                  //                   });
                  //                 }
                  //               } else {
                  //                 props.toast.info("أدخل جميع المعلومات بشكل صحيح", {
                  //                   position: props.toast.POSITION.TOP_CENTER,
                  //                 });
                  //               }
                  //             }}
                  //             style={{ alignSelf: "flex-end" }}
                  //           >
                  //             حذف الجلسة
                  //           </button>
                  //         </div>
                  //       ) : null}
                  //     </>
                  //   ) : null}
                  //   <div style={{ overflow: "auto" }}>
                  //     {Object.keys(currentSchedule).map((dateKey, dateIndex) => {
                  //       return (
                  //         <WeekTable
                  //           key={dateIndex}
                  //           openHour={"01:00"}
                  //           closeHour={"23:59"}
                  //           courses={props.courses[props.branch]}
                  //           date={dateKey}
                  //           sessions={currentSchedule[dateKey][currentClassSession]}
                  //           state={currentAddSession == 1 ? newSession : deleteSession}
                  //           setState={currentAddSession == 1 ? setNewSession : setDeleteSession}
                  //           type={currentAddSession}
                  //           courseId={currentEdit}
                  //           courseName={courseName}
                  //         />
                  //       );
                  //     })}
                  //   </div>
                  // </form>
                )}
              </>
            </div>
          </div>
          <div className={"popup-box" + (currentCourseStudents ? " show" : "")}>
            <div className="new-form-container" style={{ width: "65%", height: "88%", padding: "2%" }}>
              <button className="close-form">
                <i
                  className="uil uil-times"
                  onClick={() => {
                    setCurrentCourseStudents(false);
                  }}
                ></i>
              </button>
              {currentCourseStudents && (
                <>
                  <h1>{" طلاب الدورة " + props.courses[props.branch][currentCourseStudents].courseName}</h1>
                  <StudentsPopup setAddStudentForm={setAddStudentForm} course={props.courses[props.branch][currentCourseStudents]} courses={props.courses} setCourses={props.setCourses} branch={props.branch} students={props.students} setStudents={props.setStudents} userInformation={props.userInformation} toast={props.toast} discounts={props.discounts} />
                </>
              )}
            </div>
          </div>
          <div className={"popup-box" + (addStudentForm ? " show" : "")}>
            <div className="new-form-container">
              <button className="close-form">
                <i
                  className="uil uil-times"
                  onClick={() => {
                    setAddStudentForm(false);
                  }}
                ></i>
              </button>
              <h1>{addStudentForm ? "إضافة طالب إلى المركز" : ""}</h1>

              {addStudentForm && <AddStudentForm toast={props.toast} students={props.students} setStudents={props.setStudents} setAddNew={setAddStudentForm} branchName={props.branchName} branch={props.branch} userInformation={props.userInformation} />}
            </div>
          </div>
          <div className="course-cards-container">
            <div className={"project-boxes" + (gridView ? " jsGridView" : " jsListView")} style={{ justifyContent: "start" }}>
              {checkPermissions(props.userInformation, ["admin_training.course.add", "admin_training.course.all"], ["admin_training.course.addInBranch", "admin_training.course.allInBranch"], props.branch) ? (
                <div className="project-box-wrapper">
                  <motion.li
                    className="project-box add-box"
                    initial={firstRender ? { opacity: 0, scale: 0 } : false}
                    animate={{ opacity: 1, scale: 1, transition: { duration: 0.2 } }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => {
                      setCurrentEdit(false);
                      setAddNew(true);
                    }}
                    style={{ width: gridView ? "272px" : "100%", height: gridView ? "234px" : "136px" }}
                  >
                    <div className="icon">
                      <i className="uil uil-plus"></i>
                    </div>
                    <p>إضافة دورة</p>
                  </motion.li>
                </div>
              ) : null}
              {items.map((item) => {
                return item;
              })}
            </div>
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default Courses;
