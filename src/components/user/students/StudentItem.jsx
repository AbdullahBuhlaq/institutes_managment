import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import colorList from "../../../constants/colorList";
import textColorListTitle from "../../../constants/textColorListTitle";
import textThirdColorList from "../../../constants/textThirdColorList";
import checkPermissions from "../../../functions/checkPermissions";
function StudentItem(props) {
  const [ShowSetting, setShowSetting] = useState(false);

  try {
    return (
      <>
        <motion.li className={"note"} initial={props.firstRender ? { opacity: 0, scale: 0 } : false} animate={{ opacity: 1, scale: 1, transition: { duration: 0.2 * props.index } }} style={{ height: "245px", backgroundColor: colorList[parseInt((props.colorIndex + 1) / props.cardsNumber) % colorList.length] }} whileHover={{ scale: 1.02, transition: { ease: "linear" } }}>
          <div
            className="details"
            onClick={() => {
              props.setCurrentStudent(props.student);
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p style={{ marginTop: "10px", textAlign: "center", color: textColorListTitle[parseInt((props.colorIndex + 1) / props.cardsNumber) % colorList.length] }}>{props.student.nameAr}</p>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <span className="title" style={{ color: textThirdColorList[parseInt((props.colorIndex + 1) / props.cardsNumber) % textThirdColorList.length] }}>
                    <i className="fa-solid fa-chart-simple" style={{ fontSize: "13px" }}></i>
                    {" الدورات"}
                  </span>
                  <span className="value">{props.student.countCourse}</span>
                  <span></span>
                  <span></span>
                  <span className="title" style={{ color: textThirdColorList[parseInt((props.colorIndex + 1) / props.cardsNumber) % textThirdColorList.length] }}>
                    <i className="fa-solid fa-graduation-cap" style={{ fontSize: "13px" }}></i>
                    {" المستوى"}
                  </span>
                  <span className="value">{props.student.level}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <span className="title" style={{ color: textThirdColorList[parseInt((props.colorIndex + 1) / props.cardsNumber) % textThirdColorList.length] }}>
                    <i className="fa-solid fa-phone" style={{ fontSize: "13px" }}></i>
                    {" موبايل"}
                  </span>
                  <span className="value">{props.student.phone}</span>
                  <span></span>
                  <span></span>
                  <span className="title" style={{ color: textThirdColorList[parseInt((props.colorIndex + 1) / props.cardsNumber) % textThirdColorList.length] }}>
                    <i className="fa-solid fa-venus-mars" style={{ fontSize: "13px" }}></i>
                    {" الجنس"}
                  </span>
                  <span className="value">{props.student.gender}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bottom-content">
            <span>{new Date(props.student.createdAt).toLocaleString("default", { month: "long", day: "numeric", year: "numeric" })}</span>

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
                  {checkPermissions(props.userInformation, ["admin_training.students.controller.update", "admin_training.students.controller.all"], ["admin_training.students.controller.updateInBranch", "admin_training.students.controller.allInBranch"], props.branch) && (
                    <li
                      onClick={() => {
                        setShowSetting(false);
                        props.showEdit(props.student.id);
                      }}
                    >
                      <i className="uil uil-pen"></i>
                      تعديل
                    </li>
                  )}
                  {checkPermissions(props.userInformation, ["admin_training.students.controller.delete", "admin_training.students.controller.all"], ["admin_training.students.controller.deleteInBranch", "admin_training.students.controller.allInBranch"], props.branch) && (
                    <li
                      onClick={() => {
                        setShowSetting(false);
                        props.deleteStudent(props.student.id);
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

export default StudentItem;
