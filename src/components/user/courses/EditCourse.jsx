import messages from "../../../constants/messages";
import Joi from "joi";
import requestOptions from "../../../constants/requestOptions";
import { useEffect, useState } from "react";
import NewInput from "../../general/NewInput";
import handleSave from "../../../functions/handleSave";
import SelectInput from "../../general/SelectInput";
import Textarea from "../../general/Textarea";
import validateForm from "../../../functions/validateForm";
import TeacherItemInCourseForm from "./TeacherItemInCourseForm";
import compare from "../../../functions/compare";
import searchOptions from "../../../constants/searchOptions";
import ClassInCourseForm from "./ClassInCourseForm";
import CourseInCourseForm from "./CourseInCourseForm";
import SearchForTeachers from "./SearchForTeachres";
import Calendar from "./Calendar";

function EditCourse(props) {
  const [duringAdd, setDuringAdd] = useState(false);
  const [step, setStep] = useState(0);
  const [search, setSearch] = useState({ word: "", field: "", operator: "" });

  const [firstStep, setFirstStep] = useState({
    courseName: props.currentEdit.courseName,
    subjectId: props.currentEdit.subjectId,
    hours: props.currentEdit.hours,
    leastHoursForCertificate: props.currentEdit.leastHoursForCertificate,
    leastStudentForStart: props.currentEdit.leastStudentForStart,
    maxCountStudent: props.currentEdit.maxCountStudent,
    price: props.currentEdit.price,
    lessonsNumber: props.currentEdit.lessonsNumber,
    note: props.currentEdit.note,
  });
  const [firstStepErrors, setFirstStepError] = useState({});
  const firstStepSchema = {
    courseName: Joi.string().required().min(2).max(50).trim().messages(messages).label("اسم الدورة"),
    subjectId: Joi.number().required().messages(messages).label("اسم المادة"),
    hours: Joi.number().required().messages(messages).label("عدد الساعات"),
    leastHoursForCertificate: Joi.number().required().messages(messages).label("أقل عدد ساعات لنيل الشهادة"),
    leastStudentForStart: Joi.number().required().messages(messages).label("أقل عدد طلاب"),
    maxCountStudent: Joi.number().required().messages(messages).label("أكثر عدد طلاب"),
    price: Joi.number().required().messages(messages).label("تكلفة الدورة"),
    lessonsNumber: Joi.number().required().messages(messages).label("عدد الجلسات"),
    note: Joi.string().allow(null, "").trim().max(255).messages(messages).label("الملاحظات"),
  };
  const joiFirstStep = Joi.object(firstStepSchema);

  useEffect(() => {
    props.setCourseName(firstStep.courseName);
  }, [firstStep.courseName]);

  const [secondStep, setSecondStep] = useState({
    teachers: props.currentEdit.teachers,
  });
  const [secondStepErrors, setSecondStepError] = useState({});
  const secondStepSchema = {
    teachers: Joi.array().required().min(1).messages(messages).label("المعلمون"),
  };
  const joiSecondStep = Joi.object(secondStepSchema);
  const [edited, setEdited] = useState(false);

  useEffect(() => {
    edited && validateForm(false, joiSecondStep, secondStep, setSecondStepError);
  }, [secondStep]);

  async function addTeacher(id, value) {
    setSecondStep({ ...secondStep, teachers: [...secondStep.teachers, { id: id, ratio: value, branchId: props.branch }] });
    setEdited(true);
  }
  async function deleteTeacher(id) {
    let tempArray = [];
    await Promise.all(
      secondStep.teachers.map(async (item) => {
        if (item.id != id) tempArray = [...tempArray, item];
      })
    );
    setSecondStep({ ...secondStep, teachers: [...tempArray] });
    setEdited(true);
  }
  async function editTeacher(id, value) {
    let tempArray = [];
    await Promise.all(
      secondStep.teachers.map(async (item) => {
        if (item.id != id) tempArray = [...tempArray, item];
      })
    );
    setSecondStep({ ...secondStep, teachers: [...tempArray, { id: id, ratio: value, branchId: props.branch }] });
    setEdited(true);
  }

  const [teacherItemsFirstRender, setTeacherItemsFirstRender] = useState(false);
  const [teacherItems, setTeachersItems] = useState([]);
  useEffect(() => {
    if (firstStep.subjectId == "") {
      setTeachersItems([]);
    } else {
      const populateArray = async () => {
        const newArr = await Promise.all(
          Object.keys(props.teachers).map(async (teacher, teacherIndex) => {
            let choosen = false;
            let rate = 0;
            let courseCount = 0;
            let studentsExistingRate = 0;
            let highestCostRate = 0;

            // to get coursecount and highestcost and ...
            await Promise.all(
              Object.keys(props.courses).map(async (branchKey, branchIndex) => {
                await Promise.all(
                  Object.keys(props.courses[branchKey]).map(async (courseKey, courseIndex) => {
                    if (props.courses[branchKey][courseKey].subjectId == parseInt(firstStep.subjectId)) {
                      let isIn = false;
                      let cost = 0;
                      await Promise.all(
                        props.courses[branchKey][courseKey].teachers.map(async (teacherItem) => {
                          if (teacherItem.id == parseInt(teacher)) {
                            isIn = true;
                            cost = teacherItem.ratio;
                          }
                        })
                      );
                      if (isIn) {
                        courseCount++;
                        highestCostRate = Math.max(highestCostRate, cost);
                      }
                    }
                  })
                );
              })
            );

            // to put it choosen and saved rate when go toward or back
            await Promise.all(
              secondStep.teachers.map(async (item) => {
                if (parseInt(teacher) == item.id) {
                  choosen = true;
                  rate = item.ratio;
                }
              })
            );
            const obj = {
              nameBranch: props.teachers[teacher].nameBranch,
              phoneNumber: props.teachers[teacher].phoneNumber,
              nameArab: props.teachers[teacher].nameArab,
              courseCount: courseCount,
              studentsExistingRate: studentsExistingRate,
              highestCostRate: highestCostRate,
              choosen: choosen,
            };
            const isTrue = await compare(searchOptions["teacherCourseForm"][search.field], search.operator, obj[search.field], search.word);
            if (isTrue)
              return (
                <TeacherItemInCourseForm
                  key={teacherIndex}
                  choosen={choosen}
                  rate={rate}
                  addTeacher={addTeacher}
                  deleteTeacher={deleteTeacher}
                  editTeacher={editTeacher}
                  firstRender={teacherItemsFirstRender}
                  index={teacherIndex}
                  teacher={props.teachers[teacher]}
                  userInformation={props.userInformation}
                  courseCount={courseCount}
                  studentsExistingRate={studentsExistingRate}
                  highestCostRate={highestCostRate}
                />
              );
          })
        );
        setTeachersItems([...newArr]);
        setTeacherItemsFirstRender(false);
      };

      populateArray();
    }
  }, [firstStep.subjectId, step, secondStep, props.teachers, search]);

  const [thirdStep, setThirdStep] = useState({
    startDate: props.currentEdit.startDate,
    endDate: props.currentEdit.endDate,
  });
  const [thirdStepErrors, setThirdStepError] = useState({});
  const thirdStepSchema = {
    startDate: Joi.date().required().messages(messages).label("تاريخ البداية"),
    endDate: Joi.date().required().messages(messages).label("تاريخ النهاية"),
  };
  const joiThirdStep = Joi.object(thirdStepSchema);

  const [classItemsFirstRender, setClassItemsFirstRender] = useState(true);
  const [currentClass, setCurrentClass] = useState(false);
  const [classItems, setClassItems] = useState([]);
  useEffect(() => {
    const populateArray = async () => {
      const newArr = await Promise.all(
        [...Array(props.countRoom).keys()].map(async (classIndex) => {
          // const isTrue = await compare(searchOptions["teacherCourseForm"][search.field], search.operator, obj[search.field], search.word);
          // if (isTrue)
          return <ClassInCourseForm key={classIndex} index={classIndex} setCurrentClass={setCurrentClass} setCurrentClassSession={props.setCurrentClassSession} />;
        })
      );
      setClassItems([...newArr]);
      setTeacherItemsFirstRender(false);
    };

    populateArray();
  }, []);

  const [courseItems, setCourseItems] = useState([]);
  useEffect(() => {
    if (currentClass) {
      const populateArray = async () => {
        let classCoursesIds = [];
        // Object.keys(props.currentSchedule).map(async (dateKey, dateIndex) => {
        //   if (dateKey < thirdStep.endDate && dateKey > thirdStep.startDate) {
        //     await Promise.all(
        //       props.currentSchedule[dateKey][currentClass].map(async (session) => {
        //         classCoursesIds = [...classCoursesIds, session.courseId];
        //       })
        //     );
        //   }
        // });
        // classCoursesIds = Array.from(new Set(classCoursesIds));
        const newArr = await Promise.all(
          classCoursesIds.map(async (courseId, courseIndex) => {
            // const isTrue = await compare(searchOptions["teacherCourseForm"][search.field], search.operator, obj[search.field], search.word);
            // if (isTrue)
            return <CourseInCourseForm key={courseIndex} course={props.courses[props.branch][courseId]} teachers={props.teachers} />;
          })
        );
        setCourseItems([...newArr]);
      };

      populateArray();
    }
  }, [currentClass, thirdStep]);

  async function send() {
    const newStepOne = firstStep;
    const newStepTwo = secondStep;
    const newThirdStep = thirdStep;
    const deleted = props.deleted;
    const id = props.currentEdit.id;
    const infoRequestOptions = {
      ...requestOptions,
      method: "put",
      headers: { ...requestOptions.headers, authorization: props.userInformation.token },
      body: JSON.stringify({
        ...newStepOne,
        ...newStepTwo,
        ...newThirdStep,
        deletedSession: props.deleted,
        schedule: props.currentSchedule,
      }),
    };
    setDuringAdd(true);
    const response = await fetch(`${process.env.REACT_APP_URL_STRING}/admin-training/courses/update/${id}`, infoRequestOptions);
    const data = await response.json();
    // const data = { id: 4, success: true };
    // const data = { success: true, data: 3, schedule: props.currentSchedule };
    if (data.success) {
      props.setInstitute({ ...props.institute, branches: { ...props.institute.branches, [props.openBranch]: { ...props.institute.branches[props.openBranch], schedule: { ...props.currentSchedule } } } });
      props.setCourses({ ...props.courses, [props.branch]: { ...props.courses[props.branch], [id]: { ...newStepOne, ...newStepTwo, ...newThirdStep, id: id } } });
      props.setDeleted([]);
      props.setCurrentEdit(false);
      props.toast.success("تم تعديل الدورة", {
        position: props.toast.POSITION.TOP_CENTER,
      });
    } else {
      console.log(data.error);
      props.toast.error(data.error, {
        position: props.toast.POSITION.TOP_CENTER,
      });
    }
    setDuringAdd(false);
  }

  useEffect(() => {
    setFirstStep({
      courseName: props.currentEdit.courseName,
      subjectId: props.currentEdit.subjectId,
      hours: props.currentEdit.hours,
      leastHoursForCertificate: props.currentEdit.leastHoursForCertificate,
      leastStudentForStart: props.currentEdit.leastStudentForStart,
      maxCountStudent: props.currentEdit.maxCountStudent,
      price: props.currentEdit.price,
      lessonsNumber: props.currentEdit.lessonsNumber,
      note: props.currentEdit.note,
    });
    setSecondStep({
      teachers: props.currentEdit.teachers,
    });
    setThirdStep({
      startDate: props.currentEdit.startDate,
      endDate: props.currentEdit.endDate,
    });
  }, [props.currentEdit]);

  return (
    <>
      {step == 0 ? (
        <>
          <h1>إنشاء دورة جديدة</h1>
          <form>
            <div className="row">
              <NewInput label={"اسم الدورة :"} placeholder={"أدخل اسم الدورة"} type={"text"} name={"courseName"} onChange={handleSave} state={firstStep} setState={setFirstStep} errors={firstStepErrors} setErrors={setFirstStepError} schema={firstStepSchema} />
              <NewInput label={"عدد الساعات :"} placeholder={"أدخل عدد ساعات الدورة"} type={"number"} name={"hours"} onChange={handleSave} state={firstStep} setState={setFirstStep} errors={firstStepErrors} setErrors={setFirstStepError} schema={firstStepSchema} />
              <NewInput label={"أقل عدد ساعات لنيل الشهادة :"} placeholder={"كم يجب على الطالب أن يحضر ليأخذ الشهادة؟"} type={"number"} name={"leastHoursForCertificate"} onChange={handleSave} state={firstStep} setState={setFirstStep} errors={firstStepErrors} setErrors={setFirstStepError} schema={firstStepSchema} />
              <SelectInput label={"المادة :"} addNew={props.setAddSubject} placeholder={"اختر المادة..."} list={props.subjects[props.branch]} name={"subjectId"} onChange={handleSave} state={firstStep} setState={setFirstStep} errors={firstStepErrors} setErrors={setFirstStepError} schema={firstStepSchema} />

              <NewInput label={"أقل عدد طلاب :"} placeholder={"أقل عدد من الطلاب لبدء الدورة"} type={"number"} name={"leastStudentForStart"} onChange={handleSave} state={firstStep} setState={setFirstStep} errors={firstStepErrors} setErrors={setFirstStepError} schema={firstStepSchema} />
              <NewInput label={"أكثر عدد طلاب :"} placeholder={"أكثر عدد من الطلاب تقبله الدورة"} type={"number"} name={"maxCountStudent"} onChange={handleSave} state={firstStep} setState={setFirstStep} errors={firstStepErrors} setErrors={setFirstStepError} schema={firstStepSchema} />
              <NewInput label={"تكلفة الدورة :"} placeholder={"تكلفة الدورة"} type={"number"} name={"price"} onChange={handleSave} state={firstStep} setState={setFirstStep} errors={firstStepErrors} setErrors={setFirstStepError} schema={firstStepSchema} />
              <NewInput label={"عدد الجلسات :"} placeholder={"عدد جلسات الدورة"} type={"number"} name={"lessonsNumber"} onChange={handleSave} state={firstStep} setState={setFirstStep} errors={firstStepErrors} setErrors={setFirstStepError} schema={firstStepSchema} />
              <Textarea label={"ملاحظات :"} placeholder={"عدد جلسات الدورة"} name={"note"} onChange={handleSave} state={firstStep} setState={setFirstStep} errors={firstStepErrors} setErrors={setFirstStepError} schema={firstStepSchema} />
            </div>
            <div className="button-container">
              <button
                onClick={async (event) => {
                  event.preventDefault();
                  const isValid = await validateForm(event, joiFirstStep, firstStep, setFirstStepError);
                  if (isValid) setStep(1);
                  else {
                    props.toast.info("أدخل جميع المعلومات بشكل صحيح", {
                      position: props.toast.POSITION.TOP_CENTER,
                    });
                  }
                }}
              >
                اختيار المعلمين
              </button>
            </div>
          </form>
        </>
      ) : step == 1 ? (
        <>
          <h1>إنشاء دورة جديدة</h1>

          <form>
            <SearchForTeachers search={search} setSearch={setSearch} page={"teacherCourseForm"} />
            <div className="products-area-wrapper gridView teacher-items-in-course-form">
              <div className="products-row" style={{ height: "225.63px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <li
                  className="add-box"
                  onClick={() => {
                    props.setAddTeacherForm(true);
                  }}
                >
                  <div className="icon" style={{ marginBottom: "15px" }}>
                    <i className="uil uil-plus"></i>
                  </div>
                  <p>إضافة أستاذ</p>
                </li>
              </div>
              {teacherItems.map((item) => {
                return item;
              })}
              {secondStepErrors["teachers"] && (
                <div className="validating-error" style={{ flexBasis: "100%", textAlign: "center" }}>
                  {" "}
                  {secondStepErrors["teachers"]}{" "}
                </div>
              )}
            </div>
            <div className="button-container">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setStep(0);
                }}
              >
                السابق
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                إرسال
              </button>
              <button
                onClick={async (e) => {
                  e.preventDefault();
                  const isValid = await validateForm(e, joiSecondStep, secondStep, setSecondStepError);
                  if (isValid) setStep(2);
                  else {
                    props.toast.info("أدخل جميع المعلومات بشكل صحيح", {
                      position: props.toast.POSITION.TOP_CENTER,
                    });
                  }
                }}
              >
                تحديد المواعيد
              </button>
            </div>
          </form>
        </>
      ) : step == 2 ? (
        <>
          <h1>إنشاء دورة جديدة</h1>

          <form>
            <>
              <div className="row">
                <NewInput label={"تاريخ بداية الدورة :"} placeholder={"أدخل تاريخ بداية الدورة"} type={"date"} name={"startDate"} onChange={handleSave} state={thirdStep} setState={setThirdStep} errors={thirdStepErrors} setErrors={setThirdStepError} schema={thirdStepSchema} />
                <NewInput label={"تاريخ نهاية الدورة :"} placeholder={"أدخل تاريخ نهاية الدورة"} type={"date"} name={"endDate"} onChange={handleSave} state={thirdStep} setState={setThirdStep} errors={thirdStepErrors} setErrors={setThirdStepError} schema={thirdStepSchema} />
              </div>
              <h1 style={{ color: "var(--task-main-color)", textAlign: "start" }}>القاعات :</h1>

              <div className="project-boxes jsGridView">
                {classItems.map((item) => {
                  return item;
                })}
              </div>
              <h1 style={{ color: "var(--task-main-color)", textAlign: "start", marginTop: "20px" }}> {"دورات القاعة " + (currentClass ? currentClass : "") + " :"}</h1>
              {!currentClass ? <h4 style={{ textAlign: "center" }}>حدد قاعة لعرض الدورات فيها</h4> : !courseItems.length ? <h4 style={{ marginBottom: "20px", textAlign: "center" }}>{" لا يوجد دورات في القاعة " + currentClass + " في الفترة المحددة"}</h4> : null}
              <div className="project-boxes jsGridView" style={{ marginBottom: "20px" }}>
                {courseItems.map((item) => {
                  return item;
                })}
              </div>
            </>

            <div className="button-container">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setStep(1);
                }}
              >
                السابق
              </button>
              <button
                onClick={async (e) => {
                  e.preventDefault();
                  // props.setCurrentClassSession(currentClass);
                  setStep(3);
                }}
                disabled={!currentClass || !(thirdStep.endDate && thirdStep.startDate)}
              >
                إضافة جلسة
              </button>
              <button
                onClick={async (e) => {
                  e.preventDefault();
                  const isValid = await validateForm(e, joiThirdStep, thirdStep, setThirdStepError);
                  if (isValid) send();
                  else {
                    props.toast.info("أدخل جميع المعلومات بشكل صحيح", {
                      position: props.toast.POSITION.TOP_CENTER,
                    });
                  }
                }}
              >
                إرسال
              </button>
            </div>
          </form>
        </>
      ) : step == 3 ? (
        <>
          <h1>إنشاء دورة جديدة</h1>
          <Calendar currentSchedule={props.currentSchedule} currentClassSession={currentClass} courseName={props.courseName} setCurrentSchedule={props.setCurrentSchedule} toast={props.toast} courseId={props.currentEdit ? props.currentEdit.id : -1} />
          <form>
            <div className="button-container">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setStep(2);
                }}
              >
                السابق
              </button>

              <button
                onClick={async (e) => {
                  e.preventDefault();
                  const isValid = await validateForm(e, joiThirdStep, thirdStep, setThirdStepError);
                  if (isValid) send();
                  else {
                    props.toast.info("أدخل جميع المعلومات بشكل صحيح", {
                      position: props.toast.POSITION.TOP_CENTER,
                    });
                  }
                }}
              >
                إرسال
              </button>
            </div>
          </form>
        </>
      ) : null}
      {/* <button className="button">
        <span className="default">إنضمام</span>
        <span className="success">تم الإرسال ✅</span>
        <div className="left"></div>
        <div className="right"></div>
      </button> */}

      {/* <!-- partial:index.partial.html --> */}

      {/* <!-- partial --> */}
    </>
  );
}

export default EditCourse;
