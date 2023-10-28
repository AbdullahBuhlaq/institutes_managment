import { useEffect, useRef, useState } from "react";
function ClassInCourseForm(props) {
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
      <div className="project-box-wrapper">
        <div
          className="project-box"
          onClick={() => {
            props.setCurrentClass(props.index + 1);
            props.setCurrentClassSession(props.index + 1);
          }}
          style={{ cursor: "pointer" }}
        >
          <div className="project-box-header">
            {/* <div className="more-wrapper">
              <div className={"settings" + (ShowSetting ? " show" : "")}>
                <i
                  className="project-btn-more fa-solid fa-ellipsis-vertical"
                  onClick={(elem) => {
                    setShowSetting(true);
                  }}
                  ref={ref}
                ></i>
                {ShowSetting ? (
                  <motion.ul className={"menu"} initial={{ scale: 0 }} animate={{ scale: 1, transition: { duration: 0.1 } }}>
                    <li
                      onClick={() => {
                        setShowSetting(false);
                        props.setCurrentClass(props.index + 1);
                        // props.showEdit(props.employee.id);
                      }}
                    >
                      <i className="uil uil-pen"></i>
                      عرض الدورات
                    </li>
                    <li
                      onClick={() => {
                        setShowSetting(false);
                        props.setCurrentClassSession(props.index + 1);

                        // props.deleteEmployee(props.employee.id);
                      }}
                    >
                      <i className="uil uil-trash"></i>
                      إضافة مواعيد الجلسات
                    </li>
                  </motion.ul>
                ) : null}
              </div>
            </div> */}
          </div>
          <div className="project-box-content-header">
            <p className="box-content-header">
              {"القاعة "}
              {props.index + 1}
            </p>
            <p className="box-content-subheader">إذا فيها معدات مخصصة</p>
          </div>

          <div className="box-progress-wrapper">
            <p className="box-progress-header">تعبئة وقت القاعة</p>
            <div className="box-progress-bar">
              <span className="box-progress" style={{ width: "40%" }}></span>
            </div>
            <p className="box-progress-percentage">40%</p>
          </div>

          <div className="project-box-footer">
            <div className="days-left">عدد الجلسات المتبقية</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClassInCourseForm;
