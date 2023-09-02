import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import checkPermissions from "../../../functions/checkPermissions";
import checkShow from "../../../functions/checkShow";

function MainInstituteBranch(props) {
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
      <motion.li className={props.index % 2 ? "timeline-inverted" : ""} initial={props.firstRender ? { opacity: 0, x: props.index % 2 ? "50%" : "-50%" } : false} animate={{ opacity: 1, x: 0, zIndex: props.index % 2 ? 10 : 9, transition: { duration: 0.2 * props.index } }} whileHover={{ x: props.index % 2 ? "-5px" : "5px" }}>
        <div className="timeline-badge">
          <a></a>
        </div>
        <div className="timeline-panel">
          <div
            className="timeline-body"
            onClick={() => {
              props.setCurrentBranch(props.branch);
            }}
          >
            <p>{props.branch.name}</p>
            <span>{props.branch.countClass}</span>
          </div>
          <div className="timeline-footer">
            <span>{new Date().toLocaleString("default", { month: "long", day: "numeric", year: "numeric" })}</span>

            <div className={"settings" + (ShowSetting ? " show" : "")}>
              <i
                ref={ref}
                onClick={() => {
                  setShowSetting(true);
                }}
                className="uil uil-ellipsis-h"
              ></i>
              {ShowSetting ? (
                <motion.ul className={"menu"} initial={{ scale: 0 }} animate={{ scale: 1, transition: { duration: 0.1 } }}>
                  <NavLink to={"/home/branches/" + props.branch.id}>
                    {checkShow(props.userInformation, ["branches"], [], props.branch.id) || props.branch.id == props.userInformation.branch}
                    <li
                      onClick={() => {
                        setShowSetting(false);
                        props.setOpenBranch(props.branch.id);
                      }}
                    >
                      <i className="fa-solid fa-book-open-reader"></i>
                      عرض الفرع
                    </li>
                  </NavLink>
                  {checkPermissions(props.userInformation, ["admin_training.branches.update", "admin_training.branches.all"], [], props.branch.id) && (
                    <li
                      onClick={() => {
                        setShowSetting(false);
                        props.showEdit(props.branch.id);
                      }}
                    >
                      <i className="uil uil-pen"></i>
                      تعديل
                    </li>
                  )}
                  {checkPermissions(props.userInformation, ["admin_training.branches.delete", "admin_training.branches.all"], [], props.branch.id) && (
                    <li
                      onClick={() => {
                        setShowSetting(false);
                        props.deleteBranch(props.branch.id);
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
    </>
  );
}

export default MainInstituteBranch;
