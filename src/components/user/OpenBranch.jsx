import { useEffect, useState } from "react";
import TABS from "../../constants/branchtabs";
import BranchEmployees from "./branchEmployees/BranchEmployees";
import BranchStatistics from "./branchStatistics/BranchStatistics";
import Subjects from "./subjects/Subjects";
import Notebooks from "./notebooks/Notebooks";
import Courses from "./courses/Courses";
import Students from "./students/Students";
import { NavLink, useLocation } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Discounts from "./discount/Discounts";
import Receipts from "./receipts/Receipts";
import Payments from "./payments/Payments";
import Rooms from "./rooms/Rooms";
import checkShow from "../../functions/checkShow";

function OpenBranch(props) {
  const [current, setCurrent] = useState(false);

  useEffect(() => {
    props.setSearch({ word: "", field: "", operator: "" });
    props.setCurrentRight(current);
  }, [current]);

  const location = useLocation();
  useEffect(() => {
    const currentPath = location.pathname.split("/");
    const currentTab = currentPath[4];
    if (currentTab != current && currentTab) setCurrent(currentTab);
    else if (currentPath.length != 5 || currentTab == "") setCurrent("branchStatistics");
  }, [location]);

  return (
    <>
      <div className="main-header-line">
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
          <NavLink to={"/home/branches"}>
            <button
              className="back-arrow"
              onClick={() => {
                props.setSearch({ word: "", field: "", operator: "" });
                props.setOpenBranch(false);
                props.setCurrentRight("branches");
              }}
            >
              <i className="fa-solid fa-arrow-left"></i>
            </button>
          </NavLink>
        </div>
      </div>
      <div className="section">
        <h1>{props.branchName}</h1>

        {TABS.map((tab, tabIndex) => {
          if (props.userInformation.show.includes(tab.show) || (props.userInformation.show.includes(tab.show + "InBranch") && props.userInformation.branch == props.openBranch) || tab.show == "branchStatistics")
            return (
              <NavLink
                to={"./" + tab.show}
                key={tabIndex}
                className={current == tab.show ? "active-section" : ""}
                onClick={() => {
                  setCurrent(tab.show);
                  props.setSearch({ word: "", field: "", operator: "" });
                  props.setCurrentRight(tab.show);
                }}
              >
                {" "}
                {<i className={tab.icon}></i>} {tab.name} {"  "}{" "}
              </NavLink>
            );
        })}
      </div>
      <div className="body">
        <Routes>
          {true && <Route index exact element={<BranchStatistics />} />}
          {true && <Route path="/statistics" exact element={<BranchStatistics />} />}
          {checkShow(props.userInformation, ["employees"], ["employeesInBranch"], props.openBranch) && (
            <Route
              path="/employees"
              exact
              element={
                <BranchEmployees
                  userInformation={props.userInformation}
                  search={props.search}
                  setSearch={props.setSearch}
                  toast={props.toast}
                  employees={props.employees}
                  setEmployees={props.setEmployees}
                  branch={props.openBranch}
                  branchName={props.branchName}
                  roles={props.roles}
                  setLeftShow={props.setLeftShow}
                  setRightShow={props.setRightShow}
                  leftShow={props.leftShow}
                  rightShow={props.rightShow}
                  setCurrentBranchEmployee={props.setCurrentBranchEmployee}
                />
              }
            />
          )}
          {checkShow(props.userInformation, ["subjects"], ["subjectsInBranch"], props.openBranch) && (
            <Route
              path="/subjects"
              exact
              element={
                <Subjects
                  userInformation={props.userInformation}
                  search={props.search}
                  setSearch={props.setSearch}
                  toast={props.toast}
                  subjects={props.subjects}
                  setSubjects={props.setSubjects}
                  branch={props.openBranch}
                  branchName={props.branchName}
                  setLeftShow={props.setLeftShow}
                  setRightShow={props.setRightShow}
                  leftShow={props.leftShow}
                  rightShow={props.rightShow}
                  setCurrentSubject={props.setCurrentSubject}
                />
              }
            />
          )}
          {checkShow(props.userInformation, ["notebooks"], ["notebooksInBranch"], props.openBranch) && (
            <Route
              path="/notebooks"
              exact
              element={
                <Notebooks
                  userInformation={props.userInformation}
                  search={props.search}
                  setSearch={props.setSearch}
                  toast={props.toast}
                  notebooks={props.notebooks}
                  setNotebooks={props.setNotebooks}
                  branch={props.openBranch}
                  branchName={props.branchName}
                  setLeftShow={props.setLeftShow}
                  setRightShow={props.setRightShow}
                  leftShow={props.leftShow}
                  rightShow={props.rightShow}
                  setCurrentNotebook={props.setCurrentNotebook}
                />
              }
            />
          )}
          {checkShow(props.userInformation, ["rooms"], ["roomsInBranch"], props.openBranch) && (
            <Route
              path="/rooms"
              exact
              element={
                <Rooms userInformation={props.userInformation} search={props.search} setSearch={props.setSearch} toast={props.toast} rooms={props.rooms} setRooms={props.setRooms} branch={props.openBranch} branchName={props.branchName} setLeftShow={props.setLeftShow} setRightShow={props.setRightShow} leftShow={props.leftShow} rightShow={props.rightShow} setCurrentRoom={props.setCurrentRoom} />
              }
            />
          )}
          {checkShow(props.userInformation, ["discount"], ["discountInBranch"], props.openBranch) && (
            <Route
              path="/discounts"
              exact
              element={
                <Discounts
                  userInformation={props.userInformation}
                  search={props.search}
                  setSearch={props.setSearch}
                  toast={props.toast}
                  discounts={props.discounts}
                  setDiscounts={props.setDiscounts}
                  branch={props.openBranch}
                  branchName={props.branchName}
                  setLeftShow={props.setLeftShow}
                  setRightShow={props.setRightShow}
                  leftShow={props.leftShow}
                  rightShow={props.rightShow}
                  setCurrentDiscount={props.setCurrentDiscount}
                />
              }
            />
          )}
          {checkShow(props.userInformation, ["receipts"], ["receiptsInBranch"], props.openBranch) && (
            <Route
              path="/receipts"
              exact
              element={
                <Receipts
                  notebooks={props.notebooks}
                  courses={props.courses}
                  userInformation={props.userInformation}
                  search={props.search}
                  setSearch={props.setSearch}
                  toast={props.toast}
                  receipts={props.receipts}
                  setReceipts={props.setReceipts}
                  branch={props.openBranch}
                  branchName={props.branchName}
                  setLeftShow={props.setLeftShow}
                  setRightShow={props.setRightShow}
                  leftShow={props.leftShow}
                  rightShow={props.rightShow}
                  setCurrentReceipt={props.setCurrentReceipt}
                />
              }
            />
          )}
          {checkShow(props.userInformation, ["payments"], ["paymentsInBranch"], props.openBranch) && (
            <Route
              path="/payments"
              exact
              element={
                <Payments
                  notebooks={props.notebooks}
                  courses={props.courses}
                  userInformation={props.userInformation}
                  search={props.search}
                  setSearch={props.setSearch}
                  toast={props.toast}
                  payments={props.payments}
                  setPayments={props.setPayments}
                  branch={props.openBranch}
                  branchName={props.branchName}
                  setLeftShow={props.setLeftShow}
                  setRightShow={props.setRightShow}
                  leftShow={props.leftShow}
                  rightShow={props.rightShow}
                  setCurrentPayment={props.setCurrentPayment}
                />
              }
            />
          )}
          {checkShow(props.userInformation, ["students"], ["studentsInBranch"], props.openBranch) && (
            <Route
              path="/students"
              exact
              element={
                <Students
                  userInformation={props.userInformation}
                  search={props.search}
                  setSearch={props.setSearch}
                  toast={props.toast}
                  students={props.students}
                  setStudents={props.setStudents}
                  branch={props.openBranch}
                  branchName={props.branchName}
                  setLeftShow={props.setLeftShow}
                  setRightShow={props.setRightShow}
                  leftShow={props.leftShow}
                  rightShow={props.rightShow}
                  setCurrentStudent={props.setCurrentStudent}
                />
              }
            />
          )}
          {checkShow(props.userInformation, ["courses"], ["coursesInBranch"], props.openBranch) && (
            <Route
              path="/courses"
              exact
              element={
                <Courses
                  discounts={props.discounts}
                  schedule={props.schedule}
                  setInstitute={props.setInstitute}
                  teachers={props.teachers}
                  setTeachers={props.setTeachers}
                  students={props.students}
                  setStudents={props.setStudents}
                  institute={props.institute}
                  openBranch={props.openBranch}
                  subjects={props.subjects}
                  setSubjects={props.setSubjects}
                  userInformation={props.userInformation}
                  search={props.search}
                  setSearch={props.setSearch}
                  toast={props.toast}
                  courses={props.courses}
                  setCourses={props.setCourses}
                  branch={props.openBranch}
                  branchName={props.branchName}
                  setLeftShow={props.setLeftShow}
                  setRightShow={props.setRightShow}
                  leftShow={props.leftShow}
                  rightShow={props.rightShow}
                  setCurrentCourse={props.setCurrentCourse}
                />
              }
            />
          )}
        </Routes>
      </div>
    </>
  );
}

export default OpenBranch;
