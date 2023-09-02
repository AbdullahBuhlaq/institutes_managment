import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import colorList from "../../../constants/colorList";
import textColorListTitle from "../../../constants/textColorListTitle";
import checkPermissions from "../../../functions/checkPermissions";

function EmployeeItem(props) {
  const [ShowSetting, setShowSetting] = useState(false);
  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (e.target.tagName != "I" || e.target != ref.current) {
        setShowSetting(false);
      }
    });
  }, []);
  const ref = useRef();
  return (
    <>
      <motion.li className={"note"} initial={props.firstRender ? { opacity: 0, scale: 0 } : false} animate={{ opacity: 1, scale: 1, transition: { duration: 0.2 * props.index } }} style={{ backgroundColor: colorList[props.colorIndex % colorList.length] }} whileHover={{ scale: 1.02, transition: { ease: "linear" } }}>
        <div
          className="details"
          onClick={() => {
            props.setCurrentEmployee(props.employee);
          }}
        >
          <p style={{ color: textColorListTitle[props.colorIndex % textColorListTitle.length] }}>{props.employee.name}</p>
          <span>{props.employee.email}</span>
        </div>
        <div className="bottom-content">
          <span>{new Date().toLocaleString("default", { month: "long", day: "numeric", year: "numeric" })}</span>

          <div className={"settings" + (ShowSetting ? " show" : "")}>
            <i
              onClick={(elem) => {
                setShowSetting(true);
              }}
              className="uil uil-ellipsis-h"
              ref={ref}
            ></i>
            {ShowSetting ? (
              <motion.ul className={"menu"} initial={{ scale: 0 }} animate={{ scale: 1, transition: { duration: 0.1 } }}>
                {checkPermissions(props.userInformation, ["admin.employee.update", "admin.employee.all"], [], -1) && (
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
                {checkPermissions(props.userInformation, ["admin.employee.delete", "admin.employee.all"], [], -1) && (
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
}

export default EmployeeItem;
