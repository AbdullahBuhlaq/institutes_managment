import colorList from "../../../constants/colorList";
import { motion } from "framer-motion";
import Search from "../../general/Search";
function StudentRight(props) {
  let count = 0;
  return (
    <>
      <button
        className={"close-right"}
        onClick={() => {
          props.setRightShow(false);
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      <div className="app-right-content">
        <Search search={props.search} setSearch={props.setSearch} page={"students"} />

        {props.currentStudent ? (
          <span
            onClick={() => {
              props.setCurrentItem(false);
            }}
            className={"back-to-general"}
          >
            {<i className="fa-solid fa-arrow-right"></i>} {"العودة إلى المعلومات العامة "}
          </span>
        ) : null}
        <div className="app-right-section">
          <div className="app-right-section-header">{props.currentStudent ? "" : "إحصائيات عامة "}</div>

          {props.currentStudent ? (
            <>
              <motion.div key={props.currentStudent.id} initial={{ height: "0px" }} animate={{ height: "max-content", transition: { duration: 0.5 } }} className="task-box" style={{ backgroundColor: colorList[props.currentStudent.id % colorList.length] }}>
                {Object.keys(props.currentStudent).map((key, index) => {
                  if (typeof props.currentStudent[key] != "object")
                    return (
                      <div key={index} className="description-task">
                        <div className="time">{key}</div>
                        <div className="task-name">{props.currentStudent[key]}</div>
                      </div>
                    );
                })}
              </motion.div>
            </>
          ) : (
            <>معلومات عامة</>
          )}
        </div>
      </div>
    </>
  );
}

export default StudentRight;
