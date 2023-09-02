import Joi from "joi";
import messages from "../../../constants/messages";
import handleSave from "../../../functions/handleSave";
import { useState } from "react";

function TeacherItemInCourseForm(props) {
  const [choosen, setChoosen] = useState(props.choosen);
  const [rate, setRate] = useState({
    value: props.rate,
  });

  const [rateError, setRateError] = useState({});
  const rateSchema = {
    value: Joi.number().required().messages(messages).label("نسبة الأجر"),
  };
  const joiRate = Joi.object(rateSchema);
  return (
    <>
      <div className="products-row" style={{ border: choosen ? "solid 1px green" : "" }}>
        <div className="teacher-container" style={{ position: "relative" }}>
          {!choosen ? (
            <div
              className="teacher-hover"
              style={{ backgroundColor: "rgba(50,150,50,.2)" }}
              onClick={async (e) => {
                await props.addTeacher(props.teacher.id, rate.value, e);
                setChoosen(true);
              }}
            >
              إضافة +
            </div>
          ) : (
            <div
              className="teacher-hover"
              style={{ backgroundColor: "rgba(150,50,50,.2)" }}
              onClick={async (e) => {
                await props.deleteTeacher(props.teacher.id, e);
                setChoosen(false);
              }}
            >
              إزالة -
            </div>
          )}
          <div className="product-cell " style={{ fontSize: "20px" }}>
            <span>{props.teacher.nameAr}</span>
            <span style={{ color: "green" }}>{choosen ? "✔" : ""}</span>
          </div>
          <div className="product-cell sales">
            <span className="cell-label">عدد دورات المادة:</span>
            {props.courseCount}
          </div>
          <div className="product-cell stock">
            <span className="cell-label">نسبة الحضور:</span>
            {props.studentsExistingRate}
          </div>
          <div className="product-cell price">
            <span className="cell-label">أعلى نسبة أجر:</span>
            {props.highestCostRate}
          </div>
          <div className="product-cell category">
            <span className="cell-label">موبايل:</span>
            {props.teacher.phone}
          </div>
          <div className="product-cell category">
            <span className="cell-label">الفرع:</span>
            {props.teacher.nameBranch}
          </div>
        </div>
        <h5>نسبة الأجر</h5>
        <input
          name="value"
          id="value"
          value={rate.value}
          type="number"
          placeholder="نسبة الأجر"
          style={{ height: "30px" }}
          disabled={!choosen}
          onChange={async (event) => {
            await handleSave(event, rate, setRate, rateError, setRateError, rateSchema);
            props.editTeacher(props.teacher.id, rate.value);
          }}
          spellCheck="false"
        />

        <div className="validating-error">{rateError["value"] && <div>{rateError["value"]}</div>}</div>
      </div>
      {/* <motion.li className="note" initial={props.firstRender ? { opacity: 0, scale: 0 } : false} animate={{ opacity: 1, scale: 1, transition: { duration: 0.2 * (props.index + 2) } }} whileHover={{ scale: 1.02 }} style={{ backgroundColor: colorList[props.index % colorList.length] }}>
        <div
          className="details"
          onClick={() => {
            props.setCurrentTeacher(props.teacher);
          }}
        >
          <p>{props.teacher.nameAr}</p>
          <span>{props.teacher.nameEn}</span>
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
              <motion.ul key={props.teacher.id} className={"menu"} initial={{ scale: 0 }} animate={{ scale: 1, transition: { duration: 0.1 } }} exit={{ scale: 0 }}>
                <li
                  onClick={() => {
                    setShowSetting(false);
                    props.showEdit(props.teacher.id);
                  }}
                >
                  <i className="uil uil-pen"></i>
                  تعديل
                </li>
                <li
                  onClick={() => {
                    props.deleteTeacher(props.teacher.id);
                  }}
                >
                  <i className="uil uil-trash"></i>حذف
                </li>
              </motion.ul>
            ) : null}
          </div>
        </div>
      </motion.li> */}
    </>
  );
}

export default TeacherItemInCourseForm;
