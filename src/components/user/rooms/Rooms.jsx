import RoomItem from "./RoomItem";
import AddRoom from "./AddRoom";
import EditRoom from "./EditRoom";
import { useEffect, useState, useRef } from "react";
import requestOptions from "../../../constants/requestOptions";
import { motion } from "framer-motion";
import searchOptions from "../../../constants/searchOptions";
import compare from "../../../functions/compare";
import colorList from "../../../constants/colorList";
import textColorListTitle from "../../../constants/textColorListTitle";
import checkPermissions from "../../../functions/checkPermissions";

function Rooms(props) {
  const [currentEdit, setCurrentEdit] = useState(false);
  const [addNew, setAddNew] = useState(false);
  const [firstRender, setFirstRender] = useState(true);
  const [cardsNumber, setCardsNumber] = useState(1);

  useEffect(() => {
    setFirstRender(false);
  }, [props.rooms]);

  const [items, setItems] = useState([]);
  useEffect(() => {
    let index = 1;
    const populateArray = async () => {
      const newArr = await Promise.all(
        Object.keys(props.rooms[props.branch]).map(async (room, roomIndex) => {
          const isTrue = await compare(searchOptions["rooms"][props.search.field], props.search.operator, props.rooms[props.branch][room][props.search.field], props.search.word);
          if (isTrue) {
            index += 1;
            let curIndex = index;
            return <RoomItem key={roomIndex} userInformation={props.userInformation} branch={props.branch} cardsNumber={cardsNumber} firstRender={firstRender} colorIndex={curIndex - 2} index={curIndex} room={props.rooms[props.branch][room]} deleteRoom={deleteRoom} showEdit={showEdit} setAddNew={setAddNew} setCurrentRoom={props.setCurrentRoom} />;
          }
        })
      );
      setItems([...newArr]);
      setFirstRender(false);
    };

    populateArray();
  }, [props.search, props.rooms, cardsNumber]);

  async function deleteRoom(id) {
    // const response = await fetch(`http://localhost:3001/admin-training/room/delete/${id}`, { ...requestOptions, method: "delete", headers: { ...requestOptions.headers, authorization: props.userInformation.token } });
    // const data = await response.json();
    const data = { success: true };
    if (data.success) {
      delete props.rooms[props.branch][id];
      props.setRooms({ ...props.rooms });
      props.toast.success("تم حذف القاعة", {
        position: props.toast.POSITION.TOP_CENTER,
      });
    } else {
      console.log(data.error);
      props.toast.error(data.error, {
        position: props.toast.POSITION.TOP_CENTER,
      });
    }
  }

  async function showEdit(id) {
    setAddNew(false);
    setCurrentEdit(props.rooms[props.branch][id]);
    // show
  }

  const ref = useRef();

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      if (ref.current) setCardsNumber(parseInt((ref.current.offsetWidth - 10) / 380));
    });

    resizeObserver.observe(document.getElementById("mainh"));
  }, []);

  return (
    <>
      <div className="main-header-line" id="mainh" ref={ref}>
        <h1 className="top-title">القاعات</h1>
      </div>
      <div className="branches">
        <div className={"popup-box" + (currentEdit || addNew ? " show" : "")}>
          <div className="new-form-container">
            <button className="close-form">
              <i
                className="uil uil-times"
                onClick={() => {
                  setAddNew(false);
                  setCurrentEdit(false);
                }}
              ></i>
            </button>
            <h1>{currentEdit ? "تعديل معلومات القاعة " + currentEdit.name : "إضافة قاعة جديد"}</h1>
            {currentEdit && <EditRoom toast={props.toast} rooms={props.rooms} setRooms={props.setRooms} currentEdit={currentEdit} setCurrentEdit={setCurrentEdit} branchName={props.branchName} branch={props.branch} userInformation={props.userInformation} />}
            {addNew && <AddRoom toast={props.toast} rooms={props.rooms} setRooms={props.setRooms} setAddNew={setAddNew} branchName={props.branchName} branch={props.branch} userInformation={props.userInformation} />}
          </div>
        </div>
        <div className="wrapper">
          {checkPermissions(props.userInformation, ["admin_training.room.add", "admin_training.room.all"], ["admin_training.room.addInBranch", "admin_training.room.allInBranch"], props.branch) ? (
            <motion.li
              className="add-box"
              initial={firstRender ? { opacity: 0, scale: 0 } : false}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.2 } }}
              whileHover={{ scale: 1.02 }}
              onClick={() => {
                setCurrentEdit(false);
                setAddNew(true);
              }}
              style={{ backgroundColor: colorList[0] }}
            >
              <div className="icon" style={{ borderColor: textColorListTitle[0] }}>
                <i className="uil uil-plus" style={{ color: textColorListTitle[0] }}></i>
              </div>
              <p style={{ color: textColorListTitle[0] }}>إضافة قاعة</p>
            </motion.li>
          ) : null}
          {items.map((item) => {
            return item;
          })}
        </div>
      </div>
    </>
  );
}

export default Rooms;
