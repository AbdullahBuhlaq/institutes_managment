import { useEffect, useState } from "react";
import PendingStudents from "./PendingStudents";
import AcceptedStudents from "./AcceptedStudents";
import AddStudentsToCourse from "./AddStudentsToCourse";
import RejectedStudents from "./RejectedStudents";

function StudentsPopup(props) {
  const [currentState, setCurrentState] = useState(1);

  useEffect(() => {
    console.log(props.course);
  }, []);

  return (
    <>
      <div className="section" style={{ justifyContent: "space-around", marginBottom: "20px" }}>
        <li style={{ padding: "10px", height: "calc(100% + 10px)", cursor: "pointer" }} className={currentState == 1 ? "active-section" : ""} onClick={() => setCurrentState(1)}>
          المقبولين
        </li>
        <li style={{ padding: "10px", height: "calc(100% + 10px)", cursor: "pointer" }} className={currentState == 4 ? "active-section" : ""} onClick={() => setCurrentState(4)}>
          المرفوضين
        </li>
        <li style={{ padding: "10px", height: "calc(100% + 10px)", cursor: "pointer" }} className={currentState == 2 ? "active-section" : ""} onClick={() => setCurrentState(2)}>
          المعلقين
        </li>
        <li style={{ padding: "10px", height: "calc(100% + 10px)", cursor: "pointer" }} className={currentState == 3 ? "active-section" : ""} onClick={() => setCurrentState(3)}>
          إضافة طلاب
        </li>
      </div>
      {currentState == 1 ? (
        <AcceptedStudents course={props.course} toast={props.toast} courses={props.courses} setCourses={props.setCourses} userInformation={props.userInformation} students={props.students} discounts={props.discounts} branch={props.branch} />
      ) : currentState == 2 ? (
        <PendingStudents course={props.course} toast={props.toast} courses={props.courses} setCourses={props.setCourses} userInformation={props.userInformation} students={props.students} discounts={props.discounts} branch={props.branch} />
      ) : currentState == 4 ? (
        <RejectedStudents course={props.course} toast={props.toast} courses={props.courses} setCourses={props.setCourses} userInformation={props.userInformation} students={props.students} discounts={props.discounts} branch={props.branch} />
      ) : currentState == 3 ? (
        <AddStudentsToCourse course={props.course} students={props.students} setStudents={props.setStudents} branch={props.branch} userInformation={props.userInformation} setAddStudentForm={props.setAddStudentForm} toast={props.toast} courses={props.courses} setCourses={props.setCourses} />
      ) : null}
    </>
  );
}

export default StudentsPopup;
