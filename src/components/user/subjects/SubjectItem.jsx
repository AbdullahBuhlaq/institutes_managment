import { motion } from "framer-motion";
import { useState } from "react";
import colorList from "../../../constants/colorList";
import textColorListTitle from "../../../constants/textColorListTitle";
import checkPermissions from "../../../functions/checkPermissions";
function SubjectItem(props) {
  const [ShowSetting, setShowSetting] = useState(false);
  try {
    return (
      <>
        <div className="subject-container">
          <motion.li className={"note"} initial={props.firstRender ? { opacity: 0, scale: 0 } : false} animate={{ opacity: 1, scale: 1, transition: { duration: 0.2 * props.index } }} style={{ backgroundColor: colorList[parseInt((props.colorIndex + 1) / props.cardsNumber) % colorList.length] }} whileHover={{ scale: 1.02, transition: { ease: "linear" } }}>
            <div
              className="details"
              onClick={() => {
                props.setCurrentSubject(props.subject);
              }}
            >
              <p style={{ color: textColorListTitle[parseInt((props.colorIndex + 1) / props.cardsNumber) % textColorListTitle.length] }}>{props.subject.name}</p>
              <span>{props.subject.subjectType}</span>
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
                    {checkPermissions(props.userInformation, ["admin_training.subject.update", "admin_training.subject.all"], [], props.branch) && (
                      <li
                        onClick={() => {
                          setShowSetting(false);
                          props.showEdit(props.subject.id);
                        }}
                      >
                        <i className="uil uil-pen"></i>
                        تعديل
                      </li>
                    )}
                    {checkPermissions(props.userInformation, ["admin_training.subject.delete", "admin_training.subject.all"], [], props.branch) && (
                      <li
                        onClick={() => {
                          setShowSetting(false);
                          props.deleteSubject(props.subject.id);
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
          {/* <div className="courseItemsContainer" style={{ display: "flex", flexDirection: "column" }}>
            <div className="courseItem" style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
              <span className="coureseNumber" style={{ "::before": { backgroundColor: colorList[parseInt((props.colorIndex + 1) / props.cardsNumber) % colorList.length] } }}>
                5
              </span>
              <div className="courseName">kaza</div>
            </div>
            <div className="courseItem" style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
              <span className="coureseNumber">5</span>
              <div className="courseName">kaza</div>
            </div>
            <div className="courseItem" style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
              <span className="coureseNumber">5</span>
              <div className="courseName">kaza</div>
            </div>
            <div className="courseItem" style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
              <span className="coureseNumber">5</span>
              <div className="courseName">kaza</div>
            </div>
            <div className="courseItem" style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
              <span className="coureseNumber">5</span>
              <div className="courseName">kaza</div>
            </div>
            <div className="courseItem" style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
              <span className="coureseNumber">5</span>
              <div className="courseName">kaza</div>
            </div>
          </div> */}
        </div>
      </>
    );
  } catch (error) {
    console.log(error);
  }
}

export default SubjectItem;
