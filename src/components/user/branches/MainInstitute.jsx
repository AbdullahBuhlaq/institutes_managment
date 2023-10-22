import MainInstituteBranch from "./MainInstituteBranch";
import MainAddBranchForm from "./MainAddBranchForm";
import MainEditBranchForm from "./MainEditBranchForm";
import { useEffect, useState } from "react";
import requestOptions from "../../../constants/requestOptions";
import { motion } from "framer-motion";
import OpenBranch from "../OpenBranch";
import EditInstituteForm from "./EditInstituteForm";
import countries from "../../../constants/countries";
import compare from "../../../functions/compare";
import searchOptions from "../../../constants/searchOptions";
import { Routes, Route, useParams } from "react-router-dom";
import checkPermissions from "../../../functions/checkPermissions";

function MainInstitute(props) {
  const params = useParams();
  const [currentEdit, setCurrentEdit] = useState(false);
  const [currentEditInstitute, setCurrentEditInstitute] = useState(false);
  const [addNew, setAddNew] = useState(false);
  const [firstRender, setFirstRender] = useState(true);
  const [ShowSetting, setShowSetting] = useState(false);
  const [itemsNumber, setItemsNumber] = useState(-1);

  const [items, setItems] = useState([]);
  useEffect(() => {
    if (params["*"]) props.setOpenBranch(parseInt(params["*"]));
    else {
      props.setOpenBranch(false);
      props.setCurrentRight("branches");
    }
  }, [params]);
  useEffect(() => {
    if (!props.openBranch && props.institute.branches) {
      let index = 0;

      const populateArray = async () => {
        const newArr = await Promise.all(
          Object.keys(props.institute?.branches)?.map(async (branch, branchIndex) => {
            const isTrue = await compare(searchOptions["branches"][props.search.field], props.search.operator, props.institute.branches[branch][props.search.field], props.search.word);
            if (isTrue) {
              index += 1;
              let curIndex = index;
              return <MainInstituteBranch key={branchIndex} firstRender={firstRender} index={curIndex} userInformation={props.userInformation} setOpenBranch={props.setOpenBranch} branch={props.institute.branches[branch]} setCurrentBranch={props.setCurrentBranch} deleteBranch={deleteBranch} showEdit={showEdit} countries={props.countries} />;
            }
          })
        );
        setItems([...newArr]);
        setItemsNumber(index);
      };

      populateArray();
    }
  }, [props.search, props.institute, props.openBranch]);

  async function deleteBranch(id) {
    const response = await fetch(`${import.meta.env.VITE_URL}/admin-training/branch/delete/${id}`, { ...requestOptions, headers: { ...requestOptions.headers, authorization: props.userInformation.token }, method: "delete" });
    const data = await response.json();
    // const data = { success: true };
    if (data.success) {
      delete props.institute.branches[id];
      delete props.employees[id];
      props.setInstitute({ ...props.institute });
      props.toast.success("تم حذف الفرع", {
        position: props.toast.POSITION.TOP_CENTER,
      });
    } else {
      console.log(data.error);
      props.toast.error(data.error, {
        position: props.toast.POSITION.TOP_CENTER,
      });
    }
  }

  async function deleteInstitute() {
    // const response = await fetch(`/admin-training/my-center/delete/`, requestOptions);
    // const data = await response.json();
    const data = { success: true };
    if (data.success) {
      // i dont know
      props.toast.success("تم حذف المعهد", {
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
    setCurrentEditInstitute(false);
    setCurrentEdit(props.institute.branches[id]);
    // show
  }

  async function showInstituteEdit() {
    setAddNew(false);
    setCurrentEdit(false);
    setCurrentEditInstitute(props.institute);
    // show
  }

  return (
    <>
      {!props.openBranch ? (
        <>
          <div className="main-header-line">
            <h1 className="top-title">أفرع المركز</h1>
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
          <motion.li
            className="first"
            initial={props.firstRender ? { opacity: 0, scale: 0 } : false}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.2 } }}
            onClick={() => {
              props.setCurrentBranch(false);
            }}
          >
            <div className="timeline-panel">
              <div className="timeline-heading">
                <h4>{props.institute.name}</h4>
              </div>
              <div className="timeline-body">
                <p>{props.institute.name}</p>
                <span>{props.institute.fromHour}</span>
              </div>
              <div className="timeline-footer">
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
                    <motion.ul className={"menu"} initial={{ scale: 0 }} animate={{ scale: 1, transition: { duration: 0.1 } }}>
                      {checkPermissions(props.userInformation, ["admin_training.my_training.update"], [], props.openBranch) && (
                        <li
                          onClick={() => {
                            setShowSetting(false);
                            showInstituteEdit();
                          }}
                        >
                          <i className="uil uil-pen"></i>
                          تعديل
                        </li>
                      )}
                      {checkPermissions(props.userInformation, ["admin_training.my_training.delete"], [], props.openBranch) && (
                        <li
                          onClick={() => {
                            setShowSetting(false);
                            deleteInstitute();
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
          </motion.li>

          <div className={"popup-box" + (currentEdit || addNew || currentEditInstitute ? " show" : "")}>
            <div className="new-form-container">
              <button className="close-form">
                <i
                  className="uil uil-times"
                  onClick={() => {
                    setAddNew(false);
                    setCurrentEdit(false);
                    setCurrentEditInstitute(false);
                  }}
                ></i>
              </button>
              <h1>{currentEdit ? "تعديل معلومات الفرع " + currentEdit.name : addNew ? "إضافة فرع جديد" : "تعديل معلومات المعهد"}</h1>

              {currentEditInstitute && <EditInstituteForm userInformation={props.userInformation} toast={props.toast} institute={props.institute} setInstitute={props.setInstitute} currentEdit={currentEditInstitute} type={"center"} setCurrentEdit={setCurrentEditInstitute} countries={countries} />}
              {currentEdit && <MainEditBranchForm userInformation={props.userInformation} toast={props.toast} institute={props.institute} setInstitute={props.setInstitute} currentEdit={currentEdit} setCurrentEdit={setCurrentEdit} employees={props.employees} setEmployees={props.setEmployees} countries={props.countries} />}
              {addNew && <MainAddBranchForm userInformation={props.userInformation} toast={props.toast} institute={props.institute} setInstitute={props.setInstitute} setAddNew={setAddNew} employees={props.employees} setEmployees={props.setEmployees} countries={props.countries} />}
            </div>
          </div>
          <ul className="timeline">
            {items.map((item) => {
              return item;
            })}
            {itemsNumber != -1 && checkPermissions(props.userInformation, ["admin_training.branches.add", "admin_training.branches.all"], [], props.openBranch) && (
              <>
                <motion.li
                  className={itemsNumber % 2 ? "" : "timeline-inverted"}
                  initial={firstRender ? { opacity: 0, x: itemsNumber % 2 ? "-50%" : "50%" } : false}
                  animate={{ opacity: 1, x: 0, transition: { duration: 0.2 * (itemsNumber + 1) } }}
                  whileHover={{ x: itemsNumber % 2 ? "5px" : "-5px" }}
                  onClick={() => {
                    setCurrentEdit(false);
                    setCurrentEditInstitute(false);
                    setAddNew(true);
                  }}
                  onLoad={() => setFirstRender(false)}
                >
                  <div className="timeline-badge">
                    <a></a>
                  </div>
                  <div className="timeline-panel">
                    <div className="timeline-heading">
                      <h4></h4>
                    </div>
                    <div className="timeline-body add-box">
                      <div className="icon">
                        <i className="uil uil-plus"></i>
                      </div>
                      <p>إضافة فرع</p>
                    </div>
                  </div>
                </motion.li>
              </>
            )}
            <li className="clearfix no-float"></li>
          </ul>
        </>
      ) : props.openBranch == -1 ? (
        "loading..."
      ) : props.institute.branches[props.openBranch] ? (
        <Routes>
          <Route
            path="/:openBranch/*"
            exact
            element={
              <OpenBranch
                rooms={props.rooms}
                setRooms={props.setRooms}
                setCurrentRoom={props.setCurrentRoom}
                notebooks={props.notebooks}
                setNotebooks={props.setNotebooks}
                setCurrentNotebook={props.setCurrentNotebook}
                discounts={props.discounts}
                setDiscounts={props.setDiscounts}
                setCurrentDiscount={props.setCurrentDiscount}
                receipts={props.receipts}
                setReceipts={props.setReceipts}
                setCurrentReceipt={props.setCurrentReceipt}
                payments={props.payments}
                setPayments={props.setPayments}
                setCurrentPayment={props.setCurrentPayment}
                schedule={props.institute.branches[props.openBranch].schedule}
                setInstitute={props.setInstitute}
                teachers={props.teachers}
                setTeachers={props.setTeachers}
                students={props.students}
                setStudents={props.setStudents}
                search={props.search}
                setSearch={props.setSearch}
                toast={props.toast}
                courses={props.courses}
                setCourses={props.setCourses}
                institute={props.institute}
                userInformation={props.userInformation}
                openBranch={props.openBranch}
                branchName={props.institute.branches[props.openBranch].name}
                setOpenBranch={props.setOpenBranch}
                employees={props.employees}
                setEmployees={props.setEmployees}
                subjects={props.subjects}
                setSubjects={props.setSubjects}
                rightShow={props.rightShow}
                setRightShow={props.setRightShow}
                leftShow={props.leftShow}
                setLeftShow={props.setLeftShow}
                setCurrentRight={props.setCurrentRight}
                roles={props.roles}
                setCurrentBranchEmployee={props.setCurrentBranchEmployee}
                setCurrentBranchStatistics={props.setCurrentBranchStatistics}
                setCurrentSubject={props.setCurrentSubject}
                setCurrentCourse={props.setCurrentCourse}
                setCurrentStudent={props.setCurrentStudent}
              />
            }
          />
        </Routes>
      ) : (
        "no such branch"
      )}
    </>
  );
}

export default MainInstitute;
