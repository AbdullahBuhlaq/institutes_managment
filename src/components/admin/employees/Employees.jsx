import { motion } from "framer-motion";
import { useEffect, useState, Fragment } from "react";
import EmployeeItem from "./EmployeeItem";
import AddEmployeeForm from "./AddEmployeeForm";
import EditEmployeeForm from "./EditEmployeeForm";
import requestOptions from "../../../constants/requestOptions";
import searchOptions from "../../../constants/searchOptions";
import compare from "../../../functions/compare";
import checkPermissions from "../../../functions/checkPermissions";

function Employees(props) {
  const [currentEdit, setCurrentEdit] = useState(false);
  const [addNew, setAddNew] = useState(false);
  const [firstRender, setFirstRender] = useState(true);

  const [items, setItems] = useState([]);
  useEffect(() => {
    let index = 0;
    const populateArray = async () => {
      const newArr = await Promise.all(
        Object.keys(props.roles).map(async (roleitem, roleIndex) => {
          index += 1;
          return (
            <Fragment key={roleIndex}>
              <div className="main-header-line">
                <h1>{props.roles[roleitem].name}</h1>
              </div>
              <div className="branches">
                <div className="wrapper">
                  {checkPermissions(props.userInformation, ["admin.employee.add", "admin.employee.all"], [], -1) && (
                    <motion.li
                      className="add-box"
                      initial={firstRender ? { opacity: 0, scale: 0 } : false}
                      animate={{ opacity: 1, scale: 1, transition: { duration: 0.2 * index } }}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => {
                        setCurrentEdit(false);
                        setAddNew(true);
                      }}
                    >
                      <div className="icon">
                        <i className="uil uil-plus"></i>
                      </div>
                      <p>إضافة موظف</p>
                    </motion.li>
                  )}

                  {await Promise.all(
                    Object.keys(props.employees).map(async (employee, employeeIndex) => {
                      if (props.employees[employee].roleId == roleitem) {
                        const isTrue = await compare(searchOptions["employees"][props.search.field], props.search.operator, props.employees[employee][props.search.field], props.search.word);
                        if (isTrue) {
                          index += 1;
                          let curIndex = index;
                          return <EmployeeItem key={employeeIndex} firstRender={firstRender} colorIndex={employeeIndex + 1} index={curIndex - roleIndex - 2} employee={props.employees[employee]} deleteEmployee={deleteEmployee} showEdit={showEdit} setAddNew={setAddNew} setCurrentEmployee={props.setCurrentEmployee} userInformation={props.userInformation} />;
                        }
                      }
                    })
                  )}
                </div>
              </div>

              <br />
              <br />
            </Fragment>
          );
        })
      );
      setItems([...newArr]);
      setFirstRender(false);
    };

    populateArray();
  }, [props.search, props.employees]);

  async function deleteEmployee(id) {
    const response = await fetch(`http://localhost:3001/admin-site/emp/delete/${id}`, { ...requestOptions, headers: { ...requestOptions.headers, authorization: props.userInformation.token }, method: "delete" });
    const data = await response.json();
    if (data.success) {
      delete props.employees[id];
      props.setEmployees({ ...props.employees });
      props.toast.success("تم حذف الموظف", {
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
    console.log(id);
    setCurrentEdit(props.employees[id]);
    // show
  }

  return (
    <>
      <div className="main-header-line">
        <h1 className="top-title">الموظفين</h1>
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
          <h1>{currentEdit ? "تعديل معلومات الموظف " + currentEdit.name : "إضافة موظف جديد"}</h1>
          {currentEdit && <EditEmployeeForm toast={props.toast} employees={props.employees} setEmployees={props.setEmployees} currentEdit={currentEdit} setCurrentEdit={setCurrentEdit} roles={props.roles} userInformation={props.userInformation} />}
          {addNew && <AddEmployeeForm toast={props.toast} employees={props.employees} setEmployees={props.setEmployees} roles={props.roles} setAddNew={setAddNew} userInformation={props.userInformation} />}
        </div>
      </div>

      {items.map((item) => {
        return item;
      })}
    </>
  );
}

export default Employees;
