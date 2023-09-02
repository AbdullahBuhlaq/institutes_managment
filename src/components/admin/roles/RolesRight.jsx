import { motion } from "framer-motion";
import Search from "../../general/Search";
import CircleChart from "../../general/CircleChart";
import colorList from "../../../constants/colorList";

function RolesRight(props) {
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
        <Search search={props.search} setSearch={props.setSearch} page={"roles"} type={props.type} />
        {props.currentRole ? (
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
          <div className="app-right-section-header">{props.currentRole ? "" : "إحصائيات عامة "}</div>

          {props.currentRole ? (
            <>
              <motion.div key={props.currentRole.id} initial={{ height: "0px" }} animate={{ height: "max-content", transition: { duration: 0.5 } }} className="task-box" style={{ backgroundColor: colorList[props.currentRole.id % colorList.length] }}>
                {Object.keys(props.currentRole).map((key, index) => {
                  if (typeof props.currentRole[key] != "object")
                    return (
                      <div key={index} className="description-task">
                        <div className="time">{key}</div>
                        <div className="task-name">{props.currentRole[key]}</div>
                      </div>
                    );
                })}
              </motion.div>
            </>
          ) : (
            <>
              {props.type == ""}
              {Object.keys(props.roles).map((role, roleIndex) => {
                let counter = 0;

                Object.keys(props.employees).map((emp) => {
                  if (props.employees[emp].roleId == props.roles[role].id) {
                    counter++;
                  }
                });
                return (
                  <div key={roleIndex} className="chart-container-wrapper">
                    <div className="chart-container">
                      <div className="chart-info-wrapper chart-info-wrapper-right">
                        <h2>{props.roles[role].name}</h2>
                        <span>{counter}</span>
                      </div>
                      <CircleChart percentage={parseInt((100 * counter) / Object.keys(props.employees).length)} color={"blue"} />
                    </div>
                  </div>
                  // <span>
                  //   {props.roles[role].name} {counter}
                  // </span>
                );
              })}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default RolesRight;
