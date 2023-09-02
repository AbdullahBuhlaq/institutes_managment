import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function Branch(props) {
  const [ShowSetting, setShowSetting] = useState(false);
  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (e.target.tagName != "I" || e.target != ref.current) {
        setShowSetting(false);
      }
    });
  }, []);
  const ref = useRef();
  try {
    return (
      <>
        {/* style={{ backgroundColor: colorList[props.index] }} */}
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

              {/* <div className={"settings" + (ShowSetting ? " show" : "")}>
                <i
                  ref={ref}
                  onClick={(elem) => {
                    setShowSetting(true);
                  }}
                  className="uil uil-ellipsis-h"
                ></i>
                {ShowSetting ? (
                  <motion.ul className={"menu"} initial={{ scale: 0 }} animate={{ scale: 1, transition: { duration: 0.1 } }}>
                    <li
                      onClick={() => {
                        setShowSetting(false);
                        props.showEdit(props.branch.id);
                      }}
                    >
                      <i className="uil uil-pen"></i>
                      تعديل
                    </li>
                    <li
                      onClick={() => {
                        setShowSetting(false);
                        props.deleteBranch(props.branch.id);
                      }}
                    >
                      <i className="uil uil-trash"></i>حذف
                    </li>
                  </motion.ul>
                ) : null}
              </div> */}
            </div>
          </div>
        </motion.li>
      </>
    );
  } catch (error) {
    console.log(error);
  }
}

export default Branch;
