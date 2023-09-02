import { motion } from "framer-motion";
import Search from "../../general/Search";
import colorList from "../../../constants/colorList";
function InstitutesRight(props) {
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
        <Search search={props.search} setSearch={props.setSearch} page={"institutes"} />

        {props.currentInstitute ? (
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
          <div className="app-right-section-header">{props.currentInstitute ? "" : "إحصائيات عامة "}</div>

          {props.currentInstitute ? (
            <>
              <motion.div key={props.currentInstitute.id} initial={{ height: "0px", opacity: 0.3 }} animate={{ height: "max-content", opacity: 1, transition: { duration: 0.4, ease: "linear" } }} className="task-box" style={{ backgroundColor: colorList[props.currentInstitute.id % colorList.length] }}>
                {Object.keys(props.currentInstitute).map((key, index) => {
                  if (typeof props.currentInstitute[key] != "object")
                    return (
                      <div key={index} className="description-task">
                        <div className="time">{key}</div>
                        <div className="task-name">{props.currentInstitute[key]}</div>
                      </div>
                    );
                })}
              </motion.div>
            </>
          ) : (
            "general branches"
          )}
        </div>
      </div>
    </>
  );
}

export default InstitutesRight;
