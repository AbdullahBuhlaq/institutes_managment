import { useState } from "react";
import { motion } from "framer-motion";
import colorList from "../../../constants/colorList";
import textColorListTitle from "../../../constants/textColorListTitle";

function InstituteItem(props) {
  const [ShowSetting, setShowSetting] = useState(false);
  return (
    <>
      <motion.li className="note" initial={props.firstRender ? { opacity: 0, scale: 0 } : false} animate={{ opacity: 1, scale: 1, transition: { duration: 0.2 * (props.index + 2) } }} whileHover={{ scale: 1.02 }} style={{ backgroundColor: colorList[parseInt((props.index + 1) / props.cardsNumber) % colorList.length] }}>
        <div
          className="details"
          onClick={() => {
            props.setCurrentInstitute(props.institute);
          }}
        >
          <p style={{ color: textColorListTitle[parseInt((props.index + 1) / props.cardsNumber) % textColorListTitle.length] }}>{props.institute.name}</p>
          <span>{props.institute.fromHour}</span>
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
              <motion.ul key={props.institute.id} className={"menu"} initial={{ scale: 0 }} animate={{ scale: 1, transition: { duration: 0.1 } }} exit={{ scale: 0 }}>
                {/* {props.userInformation.show.includes("institutes") ? ( */}
                {true ? (
                  <li
                    onClick={() => {
                      props.setCurrentBranches(props.institute.id);
                      props.setCurrentRight("branches");
                    }}
                  >
                    <i className="uil uil-trash"></i>عرض الأفرع
                  </li>
                ) : null}

                <li
                  onClick={() => {
                    setShowSetting(false);
                    props.showEdit(props.institute.id);
                  }}
                >
                  <i className="uil uil-pen"></i>
                  تعديل
                </li>
                <li
                  onClick={() => {
                    props.deleteInstitute(props.institute.id);
                  }}
                >
                  <i className="uil uil-trash"></i>حذف
                </li>
              </motion.ul>
            ) : null}
          </div>
        </div>
      </motion.li>
    </>
  );
}

export default InstituteItem;
