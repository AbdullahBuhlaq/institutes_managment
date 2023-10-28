import requestOptions from "../../../constants/requestOptions";
import _ from "lodash";
import RejectedStudentItem from "./RejectedStudentItem";
import { useEffect, useState } from "react";

function RejectedStudents(props) {
  const [firstRender, setFirstRender] = useState(true);
  const [cardsNumber, setCardsNumber] = useState(1);
  const [duringAdd, setDuringAdd] = useState(false);
  const [currentStudents, setCurrentStudents] = useState(_.cloneDeep(props.course.students));
  const [studentsToEdit, setStudentsToEdit] = useState([]);
  const [canceled, setCanceled] = useState(false);
  const [studentsToDelete, setStudentsToDelete] = useState([]);

  useEffect(() => {
    setCurrentStudents(_.cloneDeep(props.course.students));
    setCanceled(true);
  }, [props.course.students]);

  async function addStudentToEdit(id, discountId, state) {
    setStudentsToEdit([...studentsToEdit, { studentId: id, discountId: discountId, state: state }]);
    let tempArray = [];
    await Promise.all(
      currentStudents.map(async (item) => {
        if (item.studentId != id) tempArray = [...tempArray, item];
        else tempArray = [...tempArray, { ...item, discountId: discountId, state: state }];
      })
    );
    setCurrentStudents([...tempArray]);
    return;
  }
  async function deleteStudentToEdit(id) {
    let tempArray = [];
    await Promise.all(
      studentsToEdit.map(async (item) => {
        if (item.studentId != id) tempArray = [...tempArray, item];
      })
    );
    setStudentsToEdit([...tempArray]);
    let tempArray2 = [];
    let lastDiscountId, lastState;
    await Promise.all(
      props.course.students.map(async (item) => {
        if (item.studentId == id) {
          lastDiscountId = item.discountId;
          lastState = item.state;
        }
      })
    );
    await Promise.all(
      currentStudents.map(async (item) => {
        if (item.studentId != id) tempArray2 = [...tempArray2, item];
        else tempArray2 = [...tempArray2, { ...item, discountId: lastDiscountId, state: lastState }];
      })
    );
    setCurrentStudents([...tempArray2]);
  }
  async function editStudentToEdit(id, discountId, state) {
    let tempArray = [];
    await Promise.all(
      studentsToEdit.map(async (item) => {
        if (item.studentId != id) tempArray = [...tempArray, item];
      })
    );
    setStudentsToEdit([...tempArray, { studentId: id, discountId: discountId, state: state }]);
    let tempArray2 = [];
    await Promise.all(
      currentStudents.map(async (item) => {
        if (item.studentId != id) tempArray2 = [...tempArray2, item];
        else tempArray2 = [...tempArray2, { ...item, discountId: discountId, state: state }];
      })
    );
    setCurrentStudents([...tempArray2]);
  }

  async function edit() {
    const isValid = studentsToEdit.length;
    if (isValid) {
      const id = props.course.id;
      const newData = studentsToEdit;
      const infoRequestOptions = {
        ...requestOptions,
        method: "PUT",
        headers: { ...requestOptions.headers, authorization: props.userInformation.token },
        body: JSON.stringify({
          students: newData,
        }),
      };
      setDuringAdd(true);
      const response = await fetch(`${import.meta.env.VITE_URL}/admin-training/courses/changeState/${id}`, infoRequestOptions);
      const data = await response.json();
      // const data = { success: true, data: 4 };
      if (data.success) {
        console.log(data);
        props.setCourses({ ...props.courses, [props.branch]: { ...props.courses[props.branch], [id]: { ...props.courses[props.branch][id], students: [...currentStudents] } } });
        setStudentsToEdit([]);
        setCanceled(true);
        props.toast.success("تم تعديل الطلاب", {
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
      props.toast.info("يرجى اختيار بعض الطلاب للتعديل", {
        position: props.toast.POSITION.TOP_CENTER,
      });
    }
  }

  async function cancel() {
    setCurrentStudents(_.cloneDeep(props.course.students));
    setCanceled(true);
    setStudentsToEdit([]);
  }

  function addStudentToDelete(id) {
    setStudentsToDelete([...studentsToDelete, { studentId: id }]);
    return;
  }
  async function deleteStudentToDelete(id) {
    let tempArray = [];
    await Promise.all(
      studentsToDelete.map(async (item) => {
        if (item.studentId != id) tempArray = [...tempArray, item];
      })
    );
    setStudentsToDelete([...tempArray]);
  }

  async function deleteStudents() {
    const isValid = studentsToDelete.length;
    if (isValid) {
      const id = props.course.id;
      const newData = studentsToDelete;
      const infoRequestOptions = {
        ...requestOptions,
        method: "PUT",
        headers: { ...requestOptions.headers, authorization: props.userInformation.token },
        body: JSON.stringify({
          students: newData,
        }),
      };
      setDuringAdd(true);
      const response = await fetch(`${import.meta.env.VITE_URL}/admin-training/courses/deleteStudent/${id}`, infoRequestOptions);
      const data = await response.json();
      // const data = { success: true, data: 4 };
      if (data.success) {
        console.log(data);
        // props.setCourses({ ...props.courses, [props.branch]: { ...props.courses[props.branch], [id]: { ...props.courses[props.branch][id], students: [...props.courses[props.branch][id].students, ...newData] } } });
        setStudentsToDelete([]);
        props.toast.success("تم حذف الطلاب", {
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
      props.toast.info("يرجى اختيار بعض الطلاب للحذف", {
        position: props.toast.POSITION.TOP_CENTER,
      });
    }
  }

  const [items, setItems] = useState([]);
  useEffect(() => {
    let index = 1;
    const populateArray = async () => {
      console.log(props.course);
      const newArr = await Promise.all(
        currentStudents.map(async (pendingStudent, pendingStudentIndex) => {
          //   const isTrue = await compare(searchOptions["pendingStudents"][props.search.field], props.search.operator, props.pendingStudents[props.branch][pendingStudent][props.search.field], props.search.word);
          //   if (isTrue) {
          if (props.course.students[pendingStudentIndex].state == "غير مقبول") {
            index += 1;
            return (
              <RejectedStudentItem
                key={pendingStudentIndex}
                addStudentToEdit={addStudentToEdit}
                editStudentToEdit={editStudentToEdit}
                deleteStudentToEdit={deleteStudentToEdit}
                addStudentToDelete={addStudentToDelete}
                deleteStudentToDelete={deleteStudentToDelete}
                discounts={props.discounts}
                branch={props.branch}
                index={pendingStudentIndex}
                course={props.course}
                cardsNumber={cardsNumber}
                firstRender={firstRender}
                student={props.students[props.branch][pendingStudent.studentId]}
                discountId={pendingStudent.discountId ? pendingStudent.discountId : -1}
                state={pendingStudent.state}
                canceled={canceled}
              />
            );
          }
          //   }
        })
      );
      setItems([...newArr]);
      setFirstRender(false);
      setCanceled(false);
    };

    if (currentStudents) populateArray();
  }, [currentStudents, cardsNumber, studentsToEdit]);

  return (
    <>
      <div className="main-header-line" style={{ marginBottom: "15px" }}>
        <h1 className="top-title" style={{ whiteSpace: "nowrap" }}>
          الطلاب المرفوضين
        </h1>
        <form>
          <div className="button-container" style={{ justifyContent: "end" }}>
            <button
              style={{ padding: " 0 30px", marginLeft: "10px" }}
              onClick={async (e) => {
                e.preventDefault();
                await edit();
              }}
              disabled={!studentsToEdit.length || duringAdd}
            >
              حفظ التعديلات
            </button>
            <button
              style={{ padding: " 0 30px", marginLeft: "10px" }}
              onClick={async (e) => {
                e.preventDefault();
                await cancel();
              }}
              disabled={!studentsToEdit.length || duringAdd}
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
      <div className="receipts-container">
        <div className="products-area-wrapper tableView receipts-wrapper">
          <div className="products-header">
            <div className="product-cell image">
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
            <div className="product-cell image">
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

            <div className="product-cell status-cell">
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

            <div className="product-cell sales">
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

            <div className="product-cell option">
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
            <div className="product-cell option">
              الحالة
              <button className="sort-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512">
                  <path
                    fill="currentColor"
                    d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="product-cell option">
              <i className="fa-regular fa-pen-to-square" style={{ fontSize: "22px" }}></i>
            </div>
            <div className="product-cell option">
              <i className="fa-regular fa-trash-can" style={{ fontSize: "22px" }}></i>
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

export default RejectedStudents;
