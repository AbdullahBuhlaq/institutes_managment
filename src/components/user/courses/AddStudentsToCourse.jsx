import AcceptedStudentItem from "./AcceptedStudentItem";
import { useEffect, useState, useRef } from "react";
import requestOptions from "../../../constants/requestOptions";
import { motion } from "framer-motion";
import searchOptions from "../../../constants/searchOptions";
import compare from "../../../functions/compare";
import colorList from "../../../constants/colorList";
import textColorListTitle from "../../../constants/textColorListTitle";
import StudentInCourseItem from "./StudentInCourseItem";
import checkPermissions from "../../../functions/checkPermissions";

function AddStudentsToCourse(props) {
  const [firstRender, setFirstRender] = useState(true);
  const [cardsNumber, setCardsNumber] = useState(1);
  const [studentsToJoin, setStudentsToJoin] = useState([]);
  const [duringAdd, setDuringAdd] = useState(false);

  function addStudentToJoin(id, discountId) {
    setStudentsToJoin([...studentsToJoin, { studentId: id, discountId: discountId, state: "معلق" }]);
    return;
  }
  async function deleteStudentToJoin(id) {
    let tempArray = [];
    await Promise.all(
      studentsToJoin.map(async (item) => {
        if (item.studentId != id) tempArray = [...tempArray, item];
      })
    );
    setStudentsToJoin([...tempArray]);
  }
  async function editStudentToJoin(id, discountId) {
    let tempArray = [];
    await Promise.all(
      studentsToJoin.map(async (item) => {
        if (item.studentId != id) tempArray = [...tempArray, item];
      })
    );
    setStudentsToJoin([...tempArray, { studentId: id, discountId: discountId, state: "معلق" }]);
  }

  async function join() {
    const isValid = studentsToJoin.length;
    if (isValid) {
      const id = props.course.id;
      const newData = studentsToJoin;
      const infoRequestOptions = {
        ...requestOptions,
        headers: { ...requestOptions.headers, authorization: props.userInformation.token },
        body: JSON.stringify({
          students: newData,
        }),
      };
      setDuringAdd(true);
      const response = await fetch(`${import.meta.env.VITE_URL}/admin-training/courses/enroll/join/${id}`, infoRequestOptions);
      const data = await response.json();
      // const data = { success: true, data: 4 };
      if (data.success) {
        props.setCourses({ ...props.courses, [props.branch]: { ...props.courses[props.branch], [id]: { ...props.courses[props.branch][id], students: [...props.courses[props.branch][id].students, ...newData] } } });
        setStudentsToJoin([]);
        props.toast.success("تمت إضافة الطلاب", {
          position: props.toast.POSITION.TOP_CENTER,
        });
      } else {
        console.log(data.error);
        props.toast.error(data.error, {
          position: props.toast.POSITION.TOP_CENTER,
        });
      }
      setDuringAdd(false);
    } else {
      props.toast.info("يرجى اختيار بعض الطلاب للإضافة", {
        position: props.toast.POSITION.TOP_CENTER,
      });
    }
  }

  useEffect(() => {
    setFirstRender(false);
  }, [props.students[props.branch]]);

  useEffect(() => {
    console.log(studentsToJoin);
  }, [studentsToJoin]);

  const [items, setItems] = useState([]);
  useEffect(() => {
    let index = 1;
    let exist = false;
    const populateArray = async () => {
      const newArr = await Promise.all(
        Object.keys(props.students[props.branch]).map(async (acceptedStudent, acceptedStudentIndex) => {
          exist = false;
          Promise.all(
            props.course.students.map((studentItem) => {
              if (studentItem.studentId == acceptedStudent) exist = true;
            })
          );
          // const isTrue = await compare(searchOptions["acceptedStudents"][props.search.field], props.search.operator, props.acceptedStudents[props.branch][acceptedStudent][props.search.field], props.search.word);
          // if (isTrue) {
          if (!exist) {
            index += 1;
            return <StudentInCourseItem addStudentToJoin={addStudentToJoin} deleteStudentToJoin={deleteStudentToJoin} editStudentToJoin={editStudentToJoin} key={acceptedStudentIndex} branch={props.branch} course={props.course} cardsNumber={cardsNumber} firstRender={firstRender} student={props.students[props.branch][acceptedStudent]} userInformation={props.userInformation} />;
          }
          //   }
        })
      );
      setItems([...newArr]);
      setFirstRender(false);
    };

    populateArray();
  }, [props.students[props.branch], cardsNumber, studentsToJoin, props.course.students]);

  return (
    <>
      <div className="main-header-line" style={{ marginBottom: "15px" }}>
        <h1 className="top-title" style={{ whiteSpace: "nowrap" }}></h1>
        <form>
          <div className="button-container" style={{ marginTop: "initial", justifyContent: "space-between" }}>
            {checkPermissions(props.userInformation, ["admin_training.students.controller.add", "admin_training.students.controller.all"], ["admin_training.students.controller.addInBranch", "admin_training.students.controller.allInBranch"], props.branch) && (
              <button
                style={{ padding: " 0 30px" }}
                onClick={(e) => {
                  e.preventDefault();
                  props.setAddStudentForm(true);
                }}
              >
                طالب جديد +
              </button>
            )}
            <button
              style={{ padding: " 0 30px" }}
              onClick={async (e) => {
                e.preventDefault();
                await join();
              }}
              disabled={!studentsToJoin.length || duringAdd}
            >
              إضافة
            </button>
          </div>
        </form>
      </div>
      <div className="receipts-container">
        <div className="products-area-wrapper tableView receipts-wrapper">
          <div className="products-header">
            <div className="product-cell category">
              الاسم
              <button className="sort-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512">
                  <path
                    fill="currentColor"
                    d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="product-cell category">
              الاسم بالإنجليزية
              <button className="sort-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512">
                  <path
                    fill="currentColor"
                    d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"
                  ></path>
                </svg>
              </button>
            </div>

            <div className="product-cell category">
              الموبايل
              <button className="sort-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512">
                  <path
                    fill="currentColor"
                    d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"
                  ></path>
                </svg>
              </button>
            </div>

            <div className="product-cell category">
              الجنس
              <button className="sort-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512">
                  <path
                    fill="currentColor"
                    d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"
                  ></path>
                </svg>
              </button>
            </div>

            <div className="product-cell category">
              المستوى الدراسي
              <button className="sort-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512">
                  <path
                    fill="currentColor"
                    d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"
                  ></path>
                </svg>
              </button>
            </div>

            <div className="product-cell category">
              الحسم
              <button className="sort-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512">
                  <path
                    fill="currentColor"
                    d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="product-cell category">
              <i className="fa-regular fa-square-check" style={{ fontSize: "22px" }}></i>
            </div>
          </div>
          {items.map((item) => {
            return item;
          })}
        </div>
      </div>
    </>
  );
}

export default AddStudentsToCourse;
