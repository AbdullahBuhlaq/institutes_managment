import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import checkPermissions from "../../../functions/checkPermissions";
function CourseItem(props) {
  const [ShowSetting, setShowSetting] = useState(false);
  const ref = useRef();

  useEffect(() => {
    console.log(props.course);
  }, []);

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (e.target.tagName != "I" || e.target != ref.current) {
        setShowSetting(false);
      }
    });
  }, []);

  return (
    <div
      className="project-box-wrapper"
      onClick={() => {
        props.setCurrentCourse(props.course);
      }}
    >
      <motion.div className="project-box" initial={props.firstRender ? { opacity: 0, scale: 0 } : false} animate={{ opacity: 1, scale: 1, transition: { duration: 0.2 * props.index } }} whileHover={{ scale: 1.02 }} style={{ cursor: "pointer" }}>
        <div className="project-box-header">
          <span>
            {"تاريخ البدء : "} {props.course.startDate}
          </span>
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
                  {checkPermissions(props.userInformation, ["admin_training.course.form.generate", "admin_training.course.all"], [], props.branch) && (
                    <li
                      onClick={() => {
                        navigator.clipboard.writeText(`http://localhost:3000/studentJoin/${props.institute.branches[props.openBranch].id}/${props.course.id}/${props.course.link.split("/").pop()}`);
                        props.toast.success("تم نسخ رابط تسجيل الدورة إلى الحافظة", {
                          position: props.toast.POSITION.TOP_CENTER,
                          autoClose: 1500,
                        });
                        setShowSetting(false);
                      }}
                    >
                      <i className="uil uil-pen"></i>
                      رابط التسجيل
                    </li>
                  )}
                  <li
                    onClick={() => {
                      props.setCurrentCourseStudents(props.course.id);
                      setShowSetting(false);
                    }}
                  >
                    <i className="uil uil-pen"></i>
                    طلاب الدورة
                  </li>
                  {checkPermissions(props.userInformation, ["admin_training.course.update", "admin_training.course.all"], [], props.branch) && (
                    <li
                      onClick={() => {
                        setShowSetting(false);
                        props.showEdit(props.course.id);
                      }}
                    >
                      <i className="uil uil-pen"></i>
                      تعديل
                    </li>
                  )}
                  {checkPermissions(props.userInformation, ["admin_training.course.delete", "admin_training.course.all"], [], props.branch) && (
                    <li
                      onClick={() => {
                        setShowSetting(false);
                        props.deleteCourse(props.course.id);
                      }}
                    >
                      <i className="uil uil-trash"></i>
                      حذف
                    </li>
                  )}
                </motion.ul>
              ) : null}
            </div>
          </div>
        </div>
        <div className="project-box-content-header">
          <p className="box-content-header">{props.course.courseName}</p>
          <p className="box-content-subheader">
            {props.course.teachers.map((teacher, teacherIndex) => {
              // return teacher.nameAr + (props.course.teachers.length > teacherIndex + 1 ? " - " : "");
              return "أسامة السعيد";
            })}
          </p>
        </div>

        <div className="box-progress-wrapper">
          <p className="box-progress-header">تقدم جلسات الدورة</p>
          <div className="box-progress-bar">
            <span className="box-progress" style={{ width: props.course.lessonsNumber ? parseInt((props.course.lessonsNumber * 50) / props.course.lessonsNumber) + "%" : "0px" }}></span>
          </div>
          <p className="box-progress-percentage">
            {parseInt(props.course.lessonsNumber / 2)}/{props.course.lessonsNumber}
          </p>
        </div>

        <div className="project-box-footer">
          <div className="participants">المادة: {props.subjects[props.openBranch][props.course.subjectId]?.name}</div>

          <div className="days-left">{props.subjects[props.openBranch][props.course.subjectId]?.subjectType}</div>
        </div>
      </motion.div>
    </div>
  );
}

export default CourseItem;
