import BranchEmployeeItem from "./BranchEmployeeItem";
import AddBranchEmployeeForm from "./AddBranchEmployeeForm";
import EditBranchEmployeeForm from "./EditBranchEmployeeForm";
import { useEffect, useState, Fragment } from "react";
import requestOptions from "../../../constants/requestOptions";
import { motion } from "framer-motion";
import compare from "../../../functions/compare";
import searchOptions from "../../../constants/searchOptions";
import checkPermissions from "../../../functions/checkPermissions";

function BranchEmployees(props) {
  const [currentEdit, setCurrentEdit] = useState(false);
  const [addNew, setAddNew] = useState(false);
  const [firstRender, setFirstRender] = useState(true);

  const [items, setItems] = useState([]);
  useEffect(() => {
    const populateArray = async () => {
      const newArr = await Promise.all(
        Object.keys(props.roles).map(async (roleitem, roleIndex) => {
          let index = 1;
          return (
            <Fragment key={roleIndex}>
              <div className="main-header-line">
                <h1>{props.roles[roleitem].name}</h1>
              </div>
              <div className="branches">
                <div className="wrapper">
                  {checkPermissions(props.userInformation, ["admin_training.employee.add", "admin_training.employee.all"], ["admin_training.employee.addInBranch", "admin_training.employee.allInBranch"], props.branch) && (
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
                    Object.keys(props.employees[props.branch]).map(async (employee, employeeIndex) => {
                      if (props.employees[props.branch][employee].roleId == roleitem) {
                        const isTrue = await compare(searchOptions["employees"][props.search.field], props.search.operator, props.employees[props.branch][employee][props.search.field], props.search.word);
                        if (isTrue) {
                          index += 1;
                          let curIndex = index;
                          return <BranchEmployeeItem key={employeeIndex} firstRender={firstRender} userInformation={props.userInformation} branch={props.branch} colorIndex={curIndex - 2} index={curIndex} employee={props.employees[props.branch][employee]} deleteEmployee={deleteEmployee} showEdit={showEdit} setAddNew={setAddNew} setCurrentEmployee={props.setCurrentBranchEmployee} />;
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
    const response = await fetch(`http://localhost:3001/admin-training/emp/delete/${id}`, { ...requestOptions, headers: { ...requestOptions.headers, authorization: props.userInformation.token }, method: "delete" });
    const data = await response.json();
    if (data.success) {
      delete props.employees[props.branch][id];
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
    setCurrentEdit(props.employees[props.branch][id]);
    // show
  }

  return (
    <>
      <div className="main-header-line">
        <h1 className="top-title">الموظفين</h1>
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
          {currentEdit && <EditBranchEmployeeForm userInformation={props.userInformation} toast={props.toast} employees={props.employees} setEmployees={props.setEmployees} currentEdit={currentEdit} setCurrentEdit={setCurrentEdit} roles={props.roles} branchName={props.branchName} branch={props.branch} />}
          {addNew && <AddBranchEmployeeForm userInformation={props.userInformation} toast={props.toast} employees={props.employees} setEmployees={props.setEmployees} roles={props.roles} setAddNew={setAddNew} branchName={props.branchName} branch={props.branch} />}
        </div>
      </div>
      {items.map((item) => {
        return item;
      })}
    </>
  );
}

export default BranchEmployees;
