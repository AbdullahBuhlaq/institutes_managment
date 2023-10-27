import Tab from "./Tab";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
function AppLeft(props) {
  const [hover, setHover] = useState(false);
  const [screen, setScreen] = useState(false);
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => {
        setScreen(window.matchMedia("(max-width: 920px)").matches);
      },
      true
    );
  }, []);
  return (
    <motion.div
      className={"app-left" + (props.leftShow ? " show" : "")}
      whileHover={{ flexBasis: "200px", transition: { duration: 0.1 } }}
      onMouseEnter={(e) => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      <button
        className="close-menu"
        onClick={() => {
          props.setLeftShow(false);
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      <div className="app-logo">
        {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bar-chart-2">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />{" "}
        </svg> */}
        <i className="fa-solid fa-people-roof"></i>
        {hover || window.matchMedia("(max-width: 920px)").matches ? <span>Recruiter</span> : null}
      </div>
      <ul className="nav-list">
        <li className="nav-list-item active">
          <a className="nav-list-link" href="#">
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-columns">
              <path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18" />
            </svg> */}
            <i className="fa-solid fa-table-columns"></i>

            {hover || screen ? <span>Dashboard</span> : null}
          </a>
        </li>
        <button
          className="mode-switch"
          onClick={() => {
            document.documentElement.classList.toggle("dark");
          }}
        >
          <svg className="sun feather feather-sun" fill="none" stroke="#fbb046" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
            <defs />
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
          <svg className="moon feather feather-moon" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
            <defs />
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
          </svg>
        </button>
        {props.tabs.map((tab, tabIndex) => {
          // if (props.userInformation.show.includes(tab.show) || tab.show == "branches" || tab.show == "statistics") {
          if (true) {
            return <Tab hover={hover || screen} key={tabIndex} tabIndex={tabIndex} tab={tab} setCurrent={props.setCurrent} current={props.current} />;
          }
        })}
        <div
          onClick={() => {
            props.logout();
          }}
        >
          <li className={"nav-list-item"} style={{ color: "red" }}>
            <a className="nav-list-link" style={{ color: "red" }}>
              <i className="fa-solid fa-right-from-bracket"></i>
              {hover || screen ? <span>تسجيل الخروج</span> : null}
            </a>
          </li>
        </div>
      </ul>
    </motion.div>
  );
}

export default AppLeft;
