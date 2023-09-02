import { motion } from "framer-motion";
import { useState } from "react";
import colorList from "../../../constants/colorList";
import textColorListTitle from "../../../constants/textColorListTitle";
import checkPermissions from "../../../functions/checkPermissions";
function RoomItem(props) {
  const [ShowSetting, setShowSetting] = useState(false);
  try {
    return (
      <>
        <motion.li className={"note"} initial={props.firstRender ? { opacity: 0, scale: 0 } : false} animate={{ opacity: 1, scale: 1, transition: { duration: 0.2 * props.index } }} style={{ backgroundColor: colorList[parseInt((props.colorIndex + 1) / props.cardsNumber) % colorList.length] }} whileHover={{ scale: 1.02, transition: { ease: "linear" } }}>
          <div
            className="details"
            onClick={() => {
              props.setCurrentRoom(props.room);
            }}
          >
            <p style={{ color: textColorListTitle[parseInt((props.colorIndex + 1) / props.cardsNumber) % textColorListTitle.length] }}>{props.room.name}</p>
            <span>{props.room.count}</span>
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
                  {checkPermissions(props.userInformation, ["admin_training.room.update", "admin_training.room.all"], ["admin_training.room.updateInBranch", "admin_training.room.allInBranch"], props.branch) && (
                    <li
                      onClick={() => {
                        setShowSetting(false);
                        props.showEdit(props.room.id);
                      }}
                    >
                      <i className="uil uil-pen"></i>
                      تعديل
                    </li>
                  )}
                  {checkPermissions(props.userInformation, ["admin_training.room.delete", "admin_training.room.all"], ["admin_training.room.deleteInBranch", "admin_training.room.allInBranch"], props.branch) && (
                    <li
                      onClick={() => {
                        setShowSetting(false);
                        props.deleteRoom(props.room.id);
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

export default RoomItem;
