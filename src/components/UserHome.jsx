import { useEffect, useState } from "react";
import requestOptions from "../constants/requestOptions";
import TABS from "../constants/userTabs";
import Roles from "./user/roles/Roles";
import { Route, Routes, json, redirect, useLocation, useNavigate } from "react-router-dom";
import MainInstitute from "./user/branches/MainInstitute";
import countriesFake from "../constants/countries";
import AppLeft from "./general/AppLeft";
import NoPage from "../pages/NoPage";
import RolesRight from "./user/roles/RolesRight";
import InstituteRight from "./user/branches/InstituteRight";
// import roleFake from "../constants/rolesFake";
import Statistics from "./user/statistics/Statistics";
import StatisticsRight from "./user/statistics/StatisticsRight";
// import institutesFake from "../constants/maininstituteFake";
import BranchEmployeesRight from "./user/branchEmployees/BranchEmployeeRight";
import BranchStatisticsRight from "./user/branchStatistics/BranchStatisticsRight";
// import employeesFake from "../constants/employeesBranchFake";
import SubjectRight from "./user/subjects/SubjectRight";
import Teachers from "./user/teachers/Teachers";
import TeacherRight from "./user/teachers/TeacherRight";
import selectOptions from "../constants/selectOptions";
import CourseRight from "./user/courses/CourseRight";
import StudentRight from "./user/students/StudentRight";
import DiscountRight from "./user/discount/DiscountRight";
import RecieptsRight from "./user/receipts/ReceiptsRight";
import PaymentRight from "./user/payments/PaymentsRight";
import searchOptions from "../constants/searchOptions";
import NotebookRight from "./user/notebooks/NotebookRight";
import RoomRight from "./user/rooms/RoomRight";
import checkShow from "../functions/checkShow";
import jsonParse from "../functions/jsonParse";

function UserHome(props) {
  const navigate = useNavigate();
  const [roles, setRoles] = useState({});
  const [okGetIns, setOkGetIns] = useState(false);
  const [employees, setEmployees] = useState({});
  const [institute, setInstitute] = useState({});
  const [okGetEmployees, setOkGetEmployees] = useState(false);
  const [currentBranch, setCurrentBranch] = useState(false);
  const [current, setCurrent] = useState(props.userInformation.show[0]);
  const [loaded, setLoaded] = useState(false);
  const [countries, setCountries] = useState(countriesFake);
  const [currentRole, setCurrentRole] = useState(false);
  const [currentRight, setCurrentRight] = useState(props.userInformation.show[0]);
  const [currentSubject, setCurrentSubject] = useState(false);
  const [currentNotebook, setCurrentNotebook] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(false);
  const [currentDiscount, setCurrentDiscount] = useState(false);
  const [currentReceipt, setCurrentReceipt] = useState(false);
  const [currentPayment, setCurrentPayment] = useState(false);

  const [rightShow, setRightShow] = useState(false);
  const [leftShow, setLeftShow] = useState(false);
  const [currentBranchEmployee, setCurrentBranchEmployee] = useState(false);
  const [subjects, setSubjects] = useState({});
  const [notebooks, setNotebooks] = useState({});
  const [rooms, setRooms] = useState({});
  const [discounts, setDiscounts] = useState({});
  const [receipts, setReceipts] = useState({
    1: {
      1: {
        courseId: 1,
        teacherId: 1,
        receiptNumber: 0,
        cost: 0,
        dateTake: "2020-10-10",
        note: "",
        id: 1,
      },
      2: {
        courseId: 1,
        teacherId: 1,
        receiptNumber: 0,
        cost: 0,
        dateTake: "2020-10-10",
        note: "",
        id: 2,
      },
      3: {
        courseId: 1,
        teacherId: 1,
        receiptNumber: 0,
        cost: 0,
        dateTake: "2020-10-10",
        note: "",
        id: 3,
      },
    },
  });
  const [payments, setPayments] = useState({
    1: {
      1: {
        courseId: 1,
        teacherId: 1,
        receiptNumber: 0,
        cost: 0,
        dateTake: "2020-10-10",
        note: "",
        id: 1,
      },
      2: {
        courseId: 1,
        teacherId: 1,
        receiptNumber: 0,
        cost: 0,
        dateTake: "2020-10-10",
        note: "",
        id: 2,
      },
      3: {
        courseId: 1,
        teacherId: 1,
        receiptNumber: 0,
        cost: 0,
        dateTake: "2020-10-10",
        note: "",
        id: 3,
      },
    },
  });
  const [students, setStudents] = useState({});
  const [teachers, setTeachers] = useState({});
  const [courses, setCourses] = useState({});
  const [currentCourse, setCurrentCourse] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState(false);
  const [currentBranchStatistics, setCurrentBranchStatistics] = useState(false);
  const [openBranch, setOpenBranch] = useState(-1);
  const [search, setSearch] = useState({ word: "", field: "", operator: "" });

  const location = useLocation();
  useEffect(() => {
    if (openBranch) selectOptions.subjects = selectOptions.subjectsObject[openBranch];
    else selectOptions.subjects = selectOptions.allSubjects;
  }, [openBranch]);

  useEffect(() => {
    setSearch({ word: "", field: "", operator: "" });
  }, [current, currentRight]);

  useEffect(() => {
    setCurrentRight(current);
  }, [current]);

  useEffect(() => {
    const currentPath = location.pathname.split("/");
    const currentTab = currentPath[2];
    if (currentTab != current && currentTab && !currentPath[3]) setCurrent(currentTab);
    else if (!currentTab) setCurrent("statistics");
  }, [location]);

  async function getRoles() {
    const response = await fetch(`${import.meta.env.VITE_URL}/admin-training/role/all`, { ...requestOptions, headers: { ...requestOptions.headers, authorization: props.userInformation.token }, method: "GET" });
    const data = await response.json();
    if (data.success) {
      let finalRoles = {};
      let rolesOption = [];
      await Promise.all(
        data.data.map(async (role) => {
          let data = { id: role.id, name: role.name, ...jsonParse(jsonParse(role.data)) };
          finalRoles[role.id] = data;
          rolesOption = [...rolesOption, { name: role.name, value: role.name }];
        })
      );
      selectOptions.roles = rolesOption;
      setRoles({ ...finalRoles });
      setOkGetIns(true);
    } else {
      console.log(data.error);
      if (data.error == "jwt expired") navigate("/login");
      props.toast.error("عذرا, حدث خطأ في السيرفر", {
        position: props.toast.POSITION.TOP_CENTER,
      });
    }
  }

  async function getInstituteAsync() {
    await getInstitute();
  }
  useEffect(() => {
    if (okGetIns) getInstituteAsync();
  }, [okGetIns]);

  async function getInstitute() {
    const response = await fetch(`${import.meta.env.VITE_URL}/admin-training/my-center/info`, { ...requestOptions, headers: { ...requestOptions.headers, authorization: props.userInformation.token }, method: "GET" });
    const data = await response.json();
    // let data = {
    //   success: true,
    //   data: {
    //     id: 1,
    //     name: "lskdfjlkj",
    //     picture: null,
    //     fromHour: "3",
    //     toHour: "6",
    //     typeTraining: "مجاني",
    //     countBranch: 5,
    //     createdAt: "2023-10-27T12:42:35.000Z",
    //     location: null,
    //     branches: [
    //       {
    //         name: "فرع 1",
    //         countClass: 5,
    //         createdAt: "2023-10-27T12:42:36.000Z",
    //         id: 1,
    //       },
    //       {
    //         name: "فرع1",
    //         countClass: 5,
    //         createdAt: "2023-10-27T20:15:57.000Z",
    //         id: 3,
    //       },
    //     ],
    //   },
    // };
    if (data.success) {
      console.log("data isssss", data);
      let temp = {};
      let branchesObject = [];
      await Promise.all(
        data.data.branches.map((branch) => {
          // jsonParse(branch.schedule)
          // 1: { data: [] } }
          console.log(jsonParse(branch.schedule));
          temp[branch.id] = { ...branch, schedule: jsonParse(branch.schedule) == [] || !jsonParse(branch.schedule) ? { 1: { data: [] } } : jsonParse(branch.schedule) };
          branchesObject = [...branchesObject, { name: branch.name, value: branch.name }];
        })
      );
      selectOptions.nameBranch = branchesObject;
      setInstitute({ ...data.data, branches: temp });
      setOkGetEmployees(true);
    } else {
      console.log(data.error);
      if (data.error == "jwt expired") navigate("/login");
      props.toast.error("عذرا, حدث خطأ في السيرفر", {
        position: props.toast.POSITION.TOP_CENTER,
      });
    }
  }

  async function getOthers() {
    await getEmployees();
    await getSubjects();
    await getCourses();
    await getTeachers();
    await getStudents();
    await getDiscounts();
    await getReceipts();
    await getNotebooks();
    await getPayments();
    await getRooms();
    setLoaded(true);
  }
  useEffect(() => {
    if (okGetEmployees) {
      getOthers();
    }
  }, [okGetEmployees]);

  async function getEmployees() {
    const response = await fetch(`${import.meta.env.VITE_URL}/admin-training/emp/all`, { ...requestOptions, headers: { ...requestOptions.headers, authorization: props.userInformation.token }, method: "GET" });
    const data = await response.json();
    // const data = { success: true, data: [...employeesFake] };
    if (data.success) {
      console.log("employees:", data);
      let finalEmployees = {};
      await Promise.all(
        Object.keys(institute.branches).map(async (branch) => {
          finalEmployees[branch] = {};
        })
      );
      await Promise.all(
        data.data.map(async (employee) => {
          let id = -1;
          await Promise.all(
            Object.keys(institute.branches).map(async (branch) => {
              if (institute.branches[branch].name == employee.branch.name) id = branch;
            })
          );

          if (id != -1) finalEmployees[id][employee.id] = { ...employee, nameRole: roles[employee.roleId].name, branchName: employee.branch.name };
        })
      );
      setEmployees({ ...finalEmployees });
    } else {
      console.log(data.error);
      props.toast.error("عذرا, حدث خطأ في السيرفر", {
        position: props.toast.POSITION.TOP_CENTER,
      });
    }
  }

  async function getRooms() {
    // const response = await fetch(`${import.meta.env.VITE_URL}/admin-training/room/all`, { ...requestOptions, headers: { ...requestOptions.headers, authorization: props.userInformation.token }, method: "GET" });
    // const data = await response.json();
    const data = { success: true, data: [] };

    if (data.success) {
      console.log("rooms:", data);

      let finalRooms = {};
      await Promise.all(
        Object.keys(institute.branches).map(async (branch) => {
          finalRooms[branch] = {};
        })
      );

      await Promise.all(
        data.data.map(async (room) => {
          finalRooms[room.branchId][room.id] = { ...room };
        })
      );

      setRooms({ ...finalRooms });
    } else {
      console.log(data.error);
      props.toast.error("عذرا, حدث خطأ في السيرفر", {
        position: props.toast.POSITION.TOP_CENTER,
      });
    }
  }

  async function getNotebooks() {
    const response = await fetch(`${import.meta.env.VITE_URL}/admin-training/notebook/all`, { ...requestOptions, headers: { ...requestOptions.headers, authorization: props.userInformation.token }, method: "GET" });
    const data = await response.json();

    if (data.success) {
      console.log("books:", data);

      let finalNotebooks = {};
      let tempNotebooks = {};
      await Promise.all(
        Object.keys(institute.branches).map(async (branch) => {
          finalNotebooks[branch] = {};
          tempNotebooks[branch] = [];
        })
      );

      let allNotebooks = [];
      let allNotebooksId = [];
      await Promise.all(
        data.data.map(async (notebook) => {
          let branchid = 1;
          await Promise.all(
            Object.keys(institute.branches).map(async (branch) => {
              if (institute.branches[branch].name == notebook["branch.name"]) {
                branchid = branch;
              }
            })
          );
          finalNotebooks[branchid][notebook.id] = { ...notebook };
          tempNotebooks[branchid].push({ name: notebook.name, value: notebook.id, id: notebook.id });
          allNotebooks = [...allNotebooks, notebook.name];
          allNotebooksId = [...allNotebooksId, { name: notebook.name, value: notebook.id, id: notebook.id }];
        })
      );

      allNotebooks = Array.from(new Set(allNotebooks));
      let finalAllNotebooks = [];
      await Promise.all(
        allNotebooks.map((index) => {
          finalAllNotebooks = [...finalAllNotebooks, { name: index, value: index }];
        })
      );

      selectOptions.allNotebooks = finalAllNotebooks;
      selectOptions.notebooksObject = tempNotebooks;

      selectOptions.notebookId = allNotebooksId;

      selectOptions.notebooks = finalAllNotebooks;

      setNotebooks({ ...finalNotebooks });
    } else {
      console.log(data.error);
      props.toast.error("عذرا, حدث خطأ في السيرفر", {
        position: props.toast.POSITION.TOP_CENTER,
      });
    }
  }

  async function getSubjects() {
    const response = await fetch(`${import.meta.env.VITE_URL}/admin-training/subject/all`, { ...requestOptions, headers: { ...requestOptions.headers, authorization: props.userInformation.token }, method: "GET" });
    const data = await response.json();

    if (data.success) {
      console.log("subjects:", data);

      let finalSubjects = {};
      let tempSubj = {};
      await Promise.all(
        Object.keys(institute.branches).map(async (branch) => {
          finalSubjects[branch] = {};
          tempSubj[branch] = [];
        })
      );
      let allSubjects = [];
      let allSubjectsId = [];
      await Promise.all(
        data.data.map(async (subject) => {
          finalSubjects[subject.branchId][subject.id] = { ...subject };
          tempSubj[subject.branchId].push({ name: subject.name, value: subject.id, id: subject.id });
          allSubjects = [...allSubjects, subject.name];
          allSubjectsId = [...allSubjectsId, { name: subject.name, value: subject.id, id: subject.id }];
        })
      );
      allSubjects = Array.from(new Set(allSubjects));
      let finalAllSubjects = [];
      await Promise.all(
        allSubjects.map((index) => {
          finalAllSubjects = [...finalAllSubjects, { name: index, value: index }];
        })
      );
      selectOptions.allSubjects = finalAllSubjects;
      selectOptions.subjectsObject = tempSubj;
      selectOptions.subjectId = allSubjectsId;
      selectOptions.subjects = finalAllSubjects;
      setSubjects({ ...finalSubjects });
    } else {
      console.log(data.error);
      props.toast.error("عذرا, حدث خطأ في السيرفر", {
        position: props.toast.POSITION.TOP_CENTER,
      });
    }
  }

  async function getCourses() {
    const response = await fetch(`${import.meta.env.VITE_URL}/admin-training/courses/all`, { ...requestOptions, headers: { ...requestOptions.headers, authorization: props.userInformation.token }, method: "GET" });
    const data = await response.json();
    if (data.success) {
      console.log("courses", data);
      let finalCourses = {};
      let coursesSelect = [];

      // await Promise.all(
      //   Object.keys(institute.branches).map(async (branch) => {
      //     finalCourses[branch] = {};
      //     coursesSelect = [];
      //   })
      // );
      await Promise.all(
        data.data.map(async (course) => {
          finalCourses[course.id] = { ...course, subjectId: course["subject.id"], subjectType: course["subject.subjectType"] };
          coursesSelect = [...coursesSelect, { name: course.courseName, value: course.id, id: course.id }];
        })
      );
      selectOptions.courses = coursesSelect;
      setCourses({ 4: { ...finalCourses } });
      console.log("finalcourses", finalCourses);
    } else {
      console.log(data.error);
      props.toast.error("عذرا, حدث خطأ في السيرفر", {
        position: props.toast.POSITION.TOP_CENTER,
      });
    }
  }

  async function getTeachers() {
    const response = await fetch(`${import.meta.env.VITE_URL}/admin-training/teacher/all`, { ...requestOptions, headers: { ...requestOptions.headers, authorization: props.userInformation.token }, method: "GET" });
    const data = await response.json();
    if (data.success) {
      console.log("teacher", data);
      let finalTeachers = {};
      await Promise.all(
        data.data.map(async (teacher) => {
          finalTeachers[teacher.id] = { ...teacher, nameBranch: teacher["branch.name"] };
        })
      );
      setTeachers({ ...finalTeachers });
      console.log(finalTeachers);
    } else {
      console.log(data.error);
      props.toast.error("عذرا, حدث خطأ في السيرفر", {
        position: props.toast.POSITION.TOP_CENTER,
      });
    }
  }

  async function getStudents() {
    const response = await fetch(`${import.meta.env.VITE_URL}/admin-training/student/all`, { ...requestOptions, headers: { ...requestOptions.headers, authorization: props.userInformation.token }, method: "GET" });
    const data = await response.json();
    if (data.success) {
      console.log("students:", data);

      let finalStudents = {};
      await Promise.all(
        Object.keys(institute.branches).map(async (branch) => {
          finalStudents[branch] = {};
        })
      );
      await Promise.all(
        data.data.map(async (student) => {
          let id = -1;
          await Promise.all(
            Object.keys(institute.branches).map(async (branch) => {
              if (institute.branches[branch].name == student["branch.name"]) id = branch;
            })
          );
          finalStudents[id][student.id] = { ...student };
        })
      );
      setStudents({ ...finalStudents });
    } else {
      console.log(data.error);
      props.toast.error("عذرا, حدث خطأ في السيرفر", {
        position: props.toast.POSITION.TOP_CENTER,
      });
    }
  }

  async function getDiscounts() {
    const response = await fetch(`${import.meta.env.VITE_URL}/admin-training/discount/all`, { ...requestOptions, headers: { ...requestOptions.headers, authorization: props.userInformation.token }, method: "GET" });
    const data = await response.json();

    if (data.success) {
      console.log("discounts:", data);
      let finalDiscounts = {};
      let tempSubj = {};
      await Promise.all(
        Object.keys(institute.branches).map(async (branch) => {
          finalDiscounts[branch] = {};
          tempSubj[branch] = [];
        })
      );
      let allDiscounts = [];
      await Promise.all(
        data.data.map(async (discount) => {
          finalDiscounts[discount["branch.id"]][discount.id] = { ...discount };
          tempSubj[discount["branch.id"]].push({ name: discount.reason, value: discount.id, id: discount.id });
          allDiscounts = [...allDiscounts, discount.reason];
        })
      );
      allDiscounts = Array.from(new Set(allDiscounts));
      let finalAllDiscounts = [];
      await Promise.all(
        allDiscounts.map((index) => {
          finalAllDiscounts = [...finalAllDiscounts, { name: index, value: index }];
        })
      );
      selectOptions.allDiscounts = finalAllDiscounts;
      selectOptions.discountsObject = tempSubj;
      selectOptions.discounts = finalAllDiscounts;
      setDiscounts({ ...finalDiscounts });
    } else {
      console.log(data.error);
      props.toast.error("عذرا, حدث خطأ في السيرفر", {
        position: props.toast.POSITION.TOP_CENTER,
      });
    }
  }

  async function getReceipts() {
    const response = await fetch(`${import.meta.env.VITE_URL}/admin-training/teacher/receipts/all`, { ...requestOptions, headers: { ...requestOptions.headers, authorization: props.userInformation.token }, method: "GET" });
    const data = await response.json();
    console.log("receipts:", data);
    if (data.success) {
      let finalReceipts = {};

      await Promise.all(
        data.data.map(async (receipt) => {
          finalReceipts[receipt.id] = { ...receipt, teacherId: receipt["course_teacher.teacherId"], courseId: receipt["course_teacher.courseId"] };
        })
      );
      console.log(finalReceipts);
      setReceipts({ ...finalReceipts });
    } else {
      console.log(data.error);
      props.toast.error("عذرا, حدث خطأ في السيرفر", {
        position: props.toast.POSITION.TOP_CENTER,
      });
    }
  }

  async function getPayments() {
    const response = await fetch(`${import.meta.env.VITE_URL}/admin-training/student/receipts/all`, { ...requestOptions, headers: { ...requestOptions.headers, authorization: props.userInformation.token }, method: "GET" });
    const data = await response.json();
    console.log("payments:", data);
    if (data.success) {
      let finalPayments = {};
      console.log("pay", data);
      await Promise.all(
        data.data.map(async (payment) => {
          finalPayments[payment.id] = { ...payment, teacherId: payment["course_teacher.teacherId"], courseId: payment["course_teacher.courseId"] };
        })
      );
      console.log(finalPayments);
      setPayments({ ...finalPayments });
    } else {
      console.log(data.error);
      props.toast.error("عذرا, حدث خطأ في السيرفر", {
        position: props.toast.POSITION.TOP_CENTER,
      });
    }
  }

  async function getInformation() {
    await getRoles();
  }

  useEffect(() => {
    getInformation();
  }, []);

  async function logout() {
    let response = await fetch(`${import.meta.env.VITE_URL}/auth/logout`, { ...requestOptions, method: "put", headers: { ...requestOptions.headers, authorization: props.userInformation.token } });
    let data = await response.json();
    // let data = { success: true };
    if (data.success) {
      localStorage.removeItem("user");
      navigate("/login");
    } else {
      console.log(data.error);
      props.toast.error("عذرا, حدث خطأ في السيرفر", {
        position: props.toast.POSITION.TOP_CENTER,
      });
    }
  }

  return (
    <>
      {loaded ? (
        <>
          <AppLeft logout={logout} tabs={TABS} current={current} setCurrent={setCurrent} leftShow={leftShow} setLeftShow={setLeftShow} userInformation={props.userInformation} />

          <div className={"app-main" + (current == "roles" ? " task-manager" : "")}>
            <Routes>
              {true && <Route index exact element={<Statistics rightShow={rightShow} setRightShow={setRightShow} leftShow={leftShow} setLeftShow={setLeftShow} />} />}
              {true && <Route path="/statistics" exact element={<Statistics rightShow={rightShow} setRightShow={setRightShow} leftShow={leftShow} setLeftShow={setLeftShow} />} />}
              {checkShow(props.userInformation, ["roles"], [], -1) && (
                <Route path="/roles" exact element={<Roles search={search} roles={roles} setRoles={setRoles} employees={employees} setEmployees={setEmployees} type={"admin-training"} rightShow={rightShow} setRightShow={setRightShow} leftShow={leftShow} setLeftShow={setLeftShow} setCurrentRole={setCurrentRole} toast={props.toast} userInformation={props.userInformation} />} />
              )}
              {checkShow(props.userInformation, ["teachers"], [], -1) && (
                <Route path="/teachers" exact element={<Teachers search={search} teachers={teachers} setTeachers={setTeachers} subjects={subjects} setSubjects={setSubjects} rightShow={rightShow} setRightShow={setRightShow} leftShow={leftShow} setLeftShow={setLeftShow} setCurrentTeacher={setCurrentTeacher} toast={props.toast} userInformation={props.userInformation} />} />
              )}
              <Route
                path="/branches/*"
                exact
                element={
                  <MainInstitute
                    rooms={rooms}
                    setRooms={setRooms}
                    setCurrentRoom={setCurrentRoom}
                    notebooks={notebooks}
                    setNotebooks={setNotebooks}
                    setCurrentNotebook={setCurrentNotebook}
                    discounts={discounts}
                    setDiscounts={setDiscounts}
                    setCurrentDiscount={setCurrentDiscount}
                    payments={payments}
                    setPayments={setPayments}
                    setCurrentPayment={setCurrentPayment}
                    receipts={receipts}
                    setReceipts={setReceipts}
                    setCurrentReceipt={setCurrentReceipt}
                    teachers={teachers}
                    setTeachers={setTeachers}
                    search={search}
                    setSearch={setSearch}
                    toast={props.toast}
                    userInformation={props.userInformation}
                    courses={courses}
                    setCourses={setCourses}
                    setCurrentCourse={setCurrentCourse}
                    students={students}
                    setStudents={setStudents}
                    setCurrentStudent={setCurrentStudent}
                    institute={institute}
                    setInstitute={setInstitute}
                    setCurrentBranch={setCurrentBranch}
                    setCurrentRight={setCurrentRight}
                    countries={countries}
                    setCurrent={setCurrent}
                    rightShow={rightShow}
                    setRightShow={setRightShow}
                    leftShow={leftShow}
                    setLeftShow={setLeftShow}
                    employees={employees}
                    setEmployees={setEmployees}
                    subjects={subjects}
                    setSubjects={setSubjects}
                    roles={roles}
                    setCurrentBranchEmployee={setCurrentBranchEmployee}
                    setCurrentBranchStatistics={setCurrentBranchStatistics}
                    setCurrentSubject={setCurrentSubject}
                    openBranch={openBranch}
                    setOpenBranch={setOpenBranch}
                  />
                }
              />
              <Route path="*" exact element={<NoPage />} />
            </Routes>
          </div>

          <div className={"app-right" + (rightShow ? " show" : "")}>
            {currentRight == "roles" ? (
              <RolesRight type={"ins"} search={search} setSearch={setSearch} currentRole={currentRole} setCurrentItem={setCurrentRole} roles={roles} setRightShow={setRightShow} employees={employees} />
            ) : currentRight == "branches" ? (
              <InstituteRight search={search} setSearch={setSearch} currentBranch={currentBranch} setCurrentItem={setCurrentBranch} institute={institute} setRightShow={setRightShow} />
            ) : currentRight == "statistics" ? (
              <StatisticsRight setRightShow={setRightShow} />
            ) : currentRight == "branchStatistics" ? (
              <BranchStatisticsRight rightShow={rightShow} setRightShow={setRightShow} leftShow={leftShow} setLeftShow={setLeftShow} />
            ) : currentRight == "employees" ? (
              <BranchEmployeesRight search={search} setSearch={setSearch} roles={roles} openBranch={openBranch} employees={employees[openBranch]} currentBranchEmployee={currentBranchEmployee} setCurrentItem={setCurrentBranchEmployee} rightShow={rightShow} setRightShow={setRightShow} leftShow={leftShow} setLeftShow={setLeftShow} />
            ) : currentRight == "subjects" ? (
              <SubjectRight search={search} setSearch={setSearch} openBranch={openBranch} subjects={subjects[openBranch]} currentSubject={currentSubject} setCurrentItem={setCurrentSubject} rightShow={rightShow} setRightShow={setRightShow} leftShow={leftShow} setLeftShow={setLeftShow} />
            ) : currentRight == "notebooks" ? (
              <NotebookRight search={search} setSearch={setSearch} openBranch={openBranch} notebooks={notebooks[openBranch]} currentNotebook={currentNotebook} setCurrentItem={setCurrentNotebook} rightShow={rightShow} setRightShow={setRightShow} leftShow={leftShow} setLeftShow={setLeftShow} />
            ) : currentRight == "rooms" ? (
              <RoomRight search={search} setSearch={setSearch} openBranch={openBranch} rooms={rooms[openBranch]} currentRoom={currentRoom} setCurrentItem={setCurrentRoom} rightShow={rightShow} setRightShow={setRightShow} leftShow={leftShow} setLeftShow={setLeftShow} />
            ) : currentRight == "discounts" ? (
              <DiscountRight search={search} setSearch={setSearch} openBranch={openBranch} discounts={discounts[openBranch]} currentDiscount={currentDiscount} setCurrentItem={setCurrentDiscount} rightShow={rightShow} setRightShow={setRightShow} leftShow={leftShow} setLeftShow={setLeftShow} />
            ) : currentRight == "receipts" ? (
              <RecieptsRight search={search} setSearch={setSearch} openBranch={openBranch} receipts={receipts[openBranch]} currentReceipt={currentReceipt} setCurrentItem={setCurrentReceipt} rightShow={rightShow} setRightShow={setRightShow} leftShow={leftShow} setLeftShow={setLeftShow} />
            ) : currentRight == "payments" ? (
              <PaymentRight search={search} setSearch={setSearch} openBranch={openBranch} payments={payments[openBranch]} currentPayment={currentPayment} setCurrentItem={setCurrentPayment} rightShow={rightShow} setRightShow={setRightShow} leftShow={leftShow} setLeftShow={setLeftShow} />
            ) : currentRight == "students" ? (
              <StudentRight search={search} setSearch={setSearch} openBranch={openBranch} subjects={students[openBranch]} currentStudent={currentStudent} setCurrentItem={setCurrentStudent} rightShow={rightShow} setRightShow={setRightShow} leftShow={leftShow} setLeftShow={setLeftShow} />
            ) : currentRight == "courses" ? (
              <CourseRight search={search} setSearch={setSearch} openBranch={openBranch} courses={courses[openBranch]} currentCourse={currentCourse} setCurrentItem={setCurrentCourse} rightShow={rightShow} setRightShow={setRightShow} leftShow={leftShow} setLeftShow={setLeftShow} />
            ) : currentRight == "teachers" ? (
              <TeacherRight search={search} setSearch={setSearch} teachers={teachers} currentTeacher={currentTeacher} setCurrentItem={setCurrentTeacher} rightShow={rightShow} setRightShow={setRightShow} leftShow={leftShow} setLeftShow={setLeftShow} />
            ) : null}
          </div>
        </>
      ) : (
        <span>loading</span>
      )}
    </>
  );
}

export default UserHome;
