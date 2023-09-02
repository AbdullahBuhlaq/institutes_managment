import { motion } from "framer-motion";
import { useState } from "react";
import colorList from "../../../constants/colorList";
import textColorListTitle from "../../../constants/textColorListTitle";
import textThirdColorList from "../../../constants/textThirdColorList";
import checkPermissions from "../../../functions/checkPermissions";
function BranchEmployeeItem(props) {
  const [ShowSetting, setShowSetting] = useState(false);
  try {
    return (
      <>
        <motion.li className={"note"} initial={props.firstRender ? { opacity: 0, scale: 0 } : false} animate={{ opacity: 1, scale: 1, transition: { duration: 0.2 * props.index } }} style={{ backgroundColor: colorList[props.colorIndex % colorList.length] }}>
          <div
            className="details"
            onClick={() => {
              props.setCurrentEmployee(props.employee);
            }}
          >
            <p style={{ textAlign: "center", color: textColorListTitle[props.colorIndex % textColorListTitle.length] }}>{props.employee.name}</p>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <span className="title" style={{ color: textThirdColorList[props.colorIndex % textThirdColorList.length] }}>
                  موبايل
                </span>
                <span className="value" style={{ textAlign: "center" }}>
                  {props.employee.phoneNumber}
                </span>
              </div>
              <div>
                <span className="title" style={{ color: textThirdColorList[props.colorIndex % textThirdColorList.length] }}>
                  الجنس
                </span>
                <span className="value" style={{ textAlign: "center" }}>
                  {props.employee.gender}
                </span>
              </div>
              <div>
                <span className="title" style={{ color: textThirdColorList[props.colorIndex % textThirdColorList.length] }}>
                  الراتب
                </span>
                <span className="value" style={{ textAlign: "center" }}>
                  {props.employee.salary}
                </span>
              </div>
            </div>
          </div>
          <div className="bottom-content">
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
                  {checkPermissions(props.userInformation, ["admin_training.employee.update", "admin_training.employee.all"], ["admin_training.employee.updateInBranch", "admin_training.employee.allInBranch"], props.branch) && (
                    <li
                      onClick={() => {
                        setShowSetting(false);
                        props.showEdit(props.employee.id);
                      }}
                    >
                      <i className="uil uil-pen"></i>
                      تعديل
                    </li>
                  )}
                  {checkPermissions(props.userInformation, ["admin_training.employee.delete", "admin_training.employee.all"], ["admin_training.employee.deleteInBranch", "admin_training.employee.allInBranch"], props.branch) && (
                    <li
                      onClick={() => {
                        setShowSetting(false);
                        props.deleteEmployee(props.employee.id);
                      }}
                    >
                      <i className="uil uil-trash"></i>حذف
                    </li>
                  )}
                </motion.ul>
              ) : null}
            </div>
          </div>
        </motion.li>
      </>
    );
  } catch (error) {
    console.log(error);
  }
}

export default BranchEmployeeItem;
