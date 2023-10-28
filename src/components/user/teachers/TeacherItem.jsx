import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import checkPermissions from "../../../functions/checkPermissions";

function TeacherItem(props) {
  const [ShowSetting, setShowSetting] = useState(false);

  const ref = useRef();

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (e.target.tagName != "I" || e.target != ref.current) {
        setShowSetting(false);
      }
    });
  }, []);
  return (
    <>
      <div
        className="project-box-wrapper"
        onClick={() => {
          props.setCurrentTeacher(props.teacher);
        }}
      >
        <motion.div className="project-box" initial={props.firstRender ? { opacity: 0, scale: 0 } : false} animate={{ opacity: 1, scale: 1, transition: { duration: 0.2 * (props.index + 2) } }} whileHover={{ scale: 1.02 }} style={{ cursor: "pointer", width: "255px", height: "267px" }}>
          <div className="project-box-header">
            <span>{props.teacher.nameBranch}</span>
            {/* <div className="more-wrapper">
            <button className="project-btn-more">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-vertical">
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="12" cy="5" r="1"></circle>
                <circle cx="12" cy="19" r="1"></circle>
              </svg>
            </button>
          </div> */}
            <div className="more-wrapper">
              <div className={"settings" + (ShowSetting ? " show" : "")}>
                <i
                  className="project-btn-more fa-solid fa-ellipsis-vertical"
                  onClick={(elem) => {
                    setShowSetting(true);
                  }}
                  ref={ref}
                ></i>
                {ShowSetting ? (
                  <motion.ul className={"menu"} initial={{ scale: 0 }} animate={{ scale: 1, transition: { duration: 0.1 } }}>
                    {checkPermissions(props.userInformation, ["admin_training.teachers.controller.update", "admin_training.teachers.controller.all"], ["admin_training.teachers.controller.updateInBranch", "admin_training.teachers.controller.allInBranch"], props.branch) && (
                      <li
                        onClick={() => {
                          setShowSetting(false);
                          props.showEdit(props.teacher.id);
                        }}
                      >
                        <i className="uil uil-pen"></i>
                        تعديل
                      </li>
                    )}
                    {checkPermissions(props.userInformation, ["admin_training.teachers.controller.delete", "admin_training.teachers.controller.all"], ["admin_training.teachers.controller.deleteInBranch", "admin_training.teachers.controller.allInBranch"], props.branch) && (
                      <li
                        onClick={() => {
                          props.deleteTeacher(props.teacher.id);
                        }}
                      >
                        <i className="uil uil-trash"></i>حذف
                      </li>
                    )}
                  </motion.ul>
                ) : null}
              </div>
            </div>
          </div>
          <div className="project-box-content-header">
            <p className="box-content-header">{props.teacher.nameAr}</p>
            <p className="box-content-subheader">
              {props.teacher.phone}
              {/* {props.course.teachers.map((teacher, teacherIndex) => {
              return props.teachers[teacher.id].nameAr + (props.course.teachers.length > teacherIndex + 1 ? " - " : "");
            })} */}
            </p>
          </div>

          {/* <div className="box-progress-wrapper">
            <p className="box-progress-header">تقدم جلسات الدورة</p>
            <div className="box-progress-bar">
              <span className="box-progress" style={{ width: "75%" }}></span>
            </div>
            <p className="box-progress-percentage">8/12</p>
          </div> */}
          {/* <div className="sir-container">
            {[
              { name: "كيمياء", count: 0 },
              { name: "علوم", count: 0 },
            ]?.map((subject, subjectIndex) => {
              return (
                <span key={subjectIndex} className="sir" style={{ backgroundColor: "#57c1bc", color: "white", borderRadius: "15px", padding: "7px", marginLeft: "7px" }}>
                  {subject.name} {subject.count}
                </span>
              );
            })}
          </div> */}

          <div className="project-box-footer">
            <div className="participants">
              {/* {"المستوى الدراسي "} */}
              {props.teacher.level}
            </div>

            <div className="days-left">عدد الجلسات المتبقية</div>
          </div>
        </motion.div>
      </div>
      {/* <motion.li className="note" initial={props.firstRender ? { opacity: 0, scale: 0 } : false} animate={{ opacity: 1, scale: 1, transition: { duration: 0.2 * (props.index + 2) } }} whileHover={{ scale: 1.02 }} style={{ backgroundColor: colorList[props.index % colorList.length] }}>
        <div
          className="details"
          onClick={() => {
            props.setCurrentTeacher(props.teacher);
          }}
        >
          <p>{props.teacher.nameAr}</p>
          <span>{props.teacher.nameE}</span>
        </div>
        <div className="bottom-content">
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
              <motion.ul key={props.teacher.id} className={"menu"} initial={{ scale: 0 }} animate={{ scale: 1, transition: { duration: 0.1 } }} exit={{ scale: 0 }}>
                <li
                  onClick={() => {
                    setShowSetting(false);
                    props.showEdit(props.teacher.id);
                  }}
                >
                  <i className="uil uil-pen"></i>
                  تعديل
                </li>
                <li
                  onClick={() => {
                    props.deleteTeacher(props.teacher.id);
                  }}
                >
                  <i className="uil uil-trash"></i>حذف
                </li>
              </motion.ul>
            ) : null}
          </div>
        </div>
      </motion.li> */}
    </>
  );
}

export default TeacherItem;
