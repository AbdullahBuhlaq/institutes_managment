import { motion } from "framer-motion";
import { useState } from "react";
import colorList from "../../../constants/colorList";
import textColorListTitle from "../../../constants/textColorListTitle";
import CircleChartForDiscount from "./CircleChartForDiscount";
import circleColor from "../../../constants/circleColor";
import checkPermissions from "../../../functions/checkPermissions";
function DiscountItem(props) {
  const [ShowSetting, setShowSetting] = useState(false);
  try {
    return (
      <>
        <motion.li className={"note"} initial={props.firstRender ? { opacity: 0, scale: 0 } : false} animate={{ opacity: 1, scale: 1, transition: { duration: 0.2 * props.index } }} style={{ height: "210px", padding: "15px 20px 10px", backgroundColor: colorList[parseInt((props.colorIndex + 1) / props.cardsNumber) % colorList.length] }} whileHover={{ scale: 1.02, transition: { ease: "linear" } }}>
          <div
            className="details"
            onClick={() => {
              props.setCurrentDiscount(props.discount);
            }}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
              <div>
                <p style={{ margin: "10px 0 20px", color: textColorListTitle[parseInt((props.colorIndex + 1) / props.cardsNumber) % textColorListTitle.length] }}>{props.discount.reason}</p>
              </div>
              <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ alignSelf: "baseline" }}>
                  عدد المستفيدين :
                  <br />
                  <span style={{ fontSize: "20px", color: textColorListTitle[parseInt((props.colorIndex + 1) / props.cardsNumber) % textColorListTitle.length] }}>{props.discount.count}</span>
                </span>
                <CircleChartForDiscount percentage={props.discount.ratio} color={circleColor[parseInt((props.colorIndex + 1) / props.cardsNumber) % circleColor.length]} />
              </div>
            </div>
          </div>
          <div className="bottom-content" style={{ padding: "4px" }}>
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
                  {checkPermissions(props.userInformation, ["admin_training.discount.update", "admin_training.discount.all"], ["admin_training.discount.updateInBranch", "admin_training.discount.allInBranch"], props.branch) && (
                    <li
                      onClick={() => {
                        setShowSetting(false);
                        props.showEdit(props.discount.id);
                      }}
                    >
                      <i className="uil uil-pen"></i>
                      تعديل
                    </li>
                  )}
                  {checkPermissions(props.userInformation, ["admin_training.discount.delete", "admin_training.discount.all"], ["admin_training.discount.deleteInBranch", "admin_training.discount.allInBranch"], props.branch) && (
                    <li
                      onClick={() => {
                        setShowSetting(false);
                        props.deleteDiscount(props.discount.id);
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

export default DiscountItem;
